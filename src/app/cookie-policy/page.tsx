import type { Metadata } from "next";

import { LegalDocumentPage } from "@/components/sections/LegalDocumentPage";
import { siteConfig } from "@/config/site";

const updatedAt = "August 21, 2026";

const sections = [
  {
    title: "What Cookies Are",
    body: [
      "Cookies are small files or similar technologies that a website may store on a browser or device. They can help a site remember preferences, understand usage, and keep features working reliably.",
      "NaadNova may use cookies directly or through trusted website tools, hosting services, analytics providers, form tools, or communication platforms."
    ]
  },
  {
    title: "How NaadNova Uses Cookies",
    body: [
      "Cookies may be used to support essential website functionality, remember preferences, improve page performance, protect forms from misuse, and understand which pages are useful to visitors.",
      "If analytics or marketing tools are enabled, cookies may help measure traffic, campaign performance, or visitor interactions so NaadNova can improve the learning experience."
    ]
  },
  {
    title: "Types of Cookies",
    body: [
      "Essential cookies support core site behavior such as navigation, security, forms, and session handling. Preference cookies may remember selected settings. Analytics cookies may help us understand visitor behavior in aggregate.",
      "The exact cookies may change as the website tools, forms, hosting, and analytics setup evolve."
    ]
  },
  {
    title: "Managing Cookies",
    body: [
      "Most browsers allow visitors to block, delete, or limit cookies. If cookies are disabled, some website features, forms, or preferences may not work as intended.",
      "Where a cookie banner or consent control is available, visitors should use that control to update their choices."
    ]
  },
  {
    title: "Updates and Contact",
    body: [
      "This Cookie Policy may be updated when NaadNova changes website tools, analytics, forms, or related services.",
      `For cookie-related questions, contact NaadNova through the contact page or at ${siteConfig.contact.email}.`
    ]
  }
];

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `Cookie practices for ${siteConfig.name}'s website, including essential, preference, and analytics cookies.`
};

export default function CookiePolicyPage() {
  return (
    <LegalDocumentPage
      eyebrow="Cookie Policy"
      title="Cookies that keep the rhythm steady."
      description="This page explains how NaadNova may use cookies and similar technologies to support site functionality, preferences, analytics, and visitor experience."
      updatedAt={updatedAt}
      highlights={[
        "Essential cookies help the website and forms work reliably.",
        "Analytics cookies may be used to understand and improve the visitor experience.",
        "Visitors can manage cookies through browser settings or available consent controls."
      ]}
      sections={sections}
    />
  );
}
