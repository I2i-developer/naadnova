"use server";

import { z } from "zod";

import { siteConfig } from "@/config/site";

export type ContactFormState = {
  status: "idle" | "error" | "success";
  message: string;
  errors?: Record<string, string[]>;
};

const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(100),
  email: z.email("Enter a valid email address.").max(254),
  phone: z.string().trim().regex(/^\+?[\d\s()-]{7,25}$/, "Enter a valid phone number.")
    .refine((value) => { const digits = value.replace(/\D/g, "").length; return digits >= 7 && digits <= 15; }, "Enter a valid phone number."),
  instrument: z.enum(["Guitar", "Piano", "Keyboard", "Vocals"], { error: "Choose an instrument." }),
  mode: z.enum(["Online", "Offline", "Hybrid"], { error: "Choose a learning mode." }),
  message: z.string().trim().max(3000, "Keep your message under 3,000 characters.")
});

export async function submitContactForm(_previous: ContactFormState, formData: FormData): Promise<ContactFormState> {
  if (formData.get("website")) {
    return { status: "error", message: "Unable to submit this request. Please contact the academy directly." };
  }

  const parsed = contactSchema.safeParse(Object.fromEntries(
    ["name", "email", "phone", "instrument", "mode", "message"].map((key) => [key, String(formData.get(key) ?? "").trim()])
  ));

  if (!parsed.success) {
    return { status: "error", message: "Please check the highlighted details.", errors: z.flattenError(parsed.error).fieldErrors };
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_EMAIL_FROM?.trim();
  if (!apiKey || !from) {
    console.error("Contact email configuration is missing RESEND_API_KEY or CONTACT_EMAIL_FROM.");
    return { status: "error", message: "Your request could not be sent. Please call or email the academy directly." };
  }

  const details = parsed.data;
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [siteConfig.contact.email],
        reply_to: details.email,
        subject: `Naadnova trial enquiry: ${details.instrument}`,
        text: [
          "New contact / trial class request from the Naadnova Academy website",
          "",
          `Student name: ${details.name}`,
          `Email: ${details.email}`,
          `Phone: ${details.phone}`,
          `Instrument: ${details.instrument}`,
          `Learning mode: ${details.mode}`,
          "",
          "Message:",
          details.message || "No additional message provided."
        ].join("\n")
      }),
      signal: AbortSignal.timeout(15000)
    });

    if (!response.ok) {
      console.error("Contact email provider rejected the request:", response.status);
      return { status: "error", message: "Your request could not be sent. Please try again or contact the academy directly." };
    }

    return { status: "success", message: "Your request has been sent. The academy will contact you about your trial class." };
  } catch {
    console.error("Contact email request failed or timed out.");
    return { status: "error", message: "We could not confirm that your request was sent. Please try again or contact the academy directly." };
  }
}
