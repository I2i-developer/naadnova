import type { Metadata } from "next";

import { LegalDocumentPage } from "@/components/sections/LegalDocumentPage";
import { siteConfig } from "@/config/site";

const updatedAt = "August 21, 2026";

const sections = [
  {
    title: "Information We Collect",
    body: [
      "When you contact NaadNova, book a trial, subscribe to updates, or create an account, we may collect details such as your name, email address, phone number, preferred instrument, learning mode, age group, message, and scheduling preferences.",
      "If online lessons, forms, analytics, or account features are enabled, the website may also process basic technical information such as browser type, device information, pages visited, and interaction data needed to keep the site reliable and useful."
    ]
  },
  {
    title: "How We Use Information",
    body: [
      "We use submitted information to respond to enquiries, arrange trial classes, suggest suitable courses, manage student communication, improve the website experience, and share relevant updates when a visitor has chosen to receive them.",
      "We do not use personal information for unrelated purposes without a reasonable connection to NaadNova's music learning services or without asking for permission when appropriate."
    ]
  },
  {
    title: "Student and Guardian Details",
    body: [
      "NaadNova may work with children, teens, and adult learners. When a learner is a minor, contact, booking, and scheduling communication should be handled by a parent or guardian.",
      "Parents or guardians may contact NaadNova to review, correct, or request deletion of information submitted for a minor learner, subject to any records that must be retained for legitimate operational reasons."
    ]
  },
  {
    title: "Sharing and Service Providers",
    body: [
      "We may share limited information with trusted tools or service providers that help operate the website, forms, email communication, scheduling, analytics, hosting, or learning administration.",
      "We do not sell personal information. Information may be disclosed if required by law, to protect rights and safety, or to respond to valid legal or regulatory requests."
    ]
  },
  {
    title: "Cookies and Analytics",
    body: [
      "The website may use cookies or similar technologies to remember preferences, understand site performance, and improve visitor experience. Some features may not work as intended if cookies are disabled.",
      "Analytics, if enabled, should be configured to collect only the data reasonably needed to understand website usage and improve NaadNova's services."
    ]
  },
  {
    title: "Retention and Security",
    body: [
      "We keep personal information only as long as needed for enquiries, lessons, records, updates, dispute handling, or legitimate business purposes. When information is no longer needed, it should be deleted or anonymized where practical.",
      "We use reasonable safeguards to protect information, but no website, email, or internet-based service can guarantee complete security."
    ]
  },
  {
    title: "Your Choices",
    body: [
      "You may request access, correction, deletion, or updates to personal information submitted through the website. You may also unsubscribe from optional marketing communication when such communication is available.",
      `For privacy requests, contact NaadNova through the contact page or at ${siteConfig.contact.email}.`
    ]
  },
  {
    title: "Policy Updates",
    body: [
      "This Privacy Policy may be updated as NaadNova's website, services, tools, or legal requirements change. The updated date on this page will reflect the latest version.",
      "Continued use of the website after an update means the revised policy applies from the updated date."
    ]
  }
];

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy practices for ${siteConfig.name}, including enquiries, trial bookings, student communication, cookies, and data choices.`
};

export default function PrivacyPolicyPage() {
  return (
    <LegalDocumentPage
      eyebrow="Privacy Policy"
      title="Privacy with a clear rhythm."
      description="This page explains how NaadNova handles information shared through enquiries, trial bookings, account forms, updates, and music-learning communication."
      updatedAt={updatedAt}
      highlights={[
        "We collect only the details needed to respond, guide, and support learners.",
        "Student and guardian information should be handled with care and limited access.",
        "Visitors can contact NaadNova to request corrections or deletion where applicable."
      ]}
      sections={sections}
    />
  );
}
