import type { Metadata } from "next";

import { LegalDocumentPage } from "@/components/sections/LegalDocumentPage";
import { siteConfig } from "@/config/site";

const updatedAt = "August 21, 2026";

const sections = [
  {
    title: "Acceptance of Terms",
    body: [
      "By using the NaadNova website, submitting an enquiry, booking a trial, creating an account, or participating in a class, you agree to these Terms of Service.",
      "If you are booking for a minor learner, you confirm that you are a parent, guardian, or authorized adult responsible for the learner's participation."
    ]
  },
  {
    title: "Classes and Learning Services",
    body: [
      "NaadNova offers music-learning experiences that may include trial classes, regular lessons, practice guidance, course recommendations, performance preparation, and online or offline learning support.",
      "Course availability, instructor availability, lesson format, class duration, batch size, and curriculum details may vary and should be confirmed before enrollment."
    ]
  },
  {
    title: "Bookings, Scheduling, and Attendance",
    body: [
      "Trial class and lesson requests submitted through the website are enquiries until confirmed by NaadNova. A booking is considered confirmed only after NaadNova shares confirmation through an accepted communication channel.",
      "Students are expected to attend on time, carry required materials or instruments where applicable, and follow the practice and class guidance shared by the instructor."
    ]
  },
  {
    title: "Payments, Cancellations, and Rescheduling",
    body: [
      "Fees, payment timelines, refunds, cancellations, make-up classes, and rescheduling rules should be confirmed in writing before enrollment or payment.",
      "NaadNova may update fee structures, course packages, and class policies from time to time. Any changes affecting an enrolled learner should be communicated through the appropriate contact channel."
    ]
  },
  {
    title: "Student Conduct and Safety",
    body: [
      "Students, parents, guardians, and visitors should communicate respectfully with instructors, staff, and other learners. Harassment, abuse, disruption, or unsafe behavior may result in refusal or discontinuation of service.",
      "For offline classes, learners and guardians should follow studio safety, arrival, departure, and supervision guidelines shared by NaadNova."
    ]
  },
  {
    title: "Website Use",
    body: [
      "You agree not to misuse the website, attempt unauthorized access, interfere with website security, submit false information, copy content for unauthorized commercial use, or use the site in a way that harms NaadNova or other visitors.",
      "NaadNova may update, pause, modify, or remove website features, pages, forms, or content when needed for maintenance, improvement, or business reasons."
    ]
  },
  {
    title: "Content and Intellectual Property",
    body: [
      "Website text, design, branding, images, learning materials, course descriptions, and creative content belong to NaadNova or their respective owners unless stated otherwise.",
      "Students may use learning materials shared with them for personal learning only. Reproduction, resale, public distribution, or unauthorized recording may require written permission."
    ]
  },
  {
    title: "Limitations and Contact",
    body: [
      "NaadNova aims to provide thoughtful music education, but individual progress depends on attendance, practice, learner readiness, and personal goals. Specific outcomes, exam results, or performance milestones are not guaranteed unless expressly agreed in writing.",
      `For questions about these terms, contact NaadNova through the contact page or at ${siteConfig.contact.email}.`
    ]
  }
];

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms for using ${siteConfig.name}'s website, booking trial classes, attending lessons, and accessing music-learning services.`
};

export default function TermsPage() {
  return (
    <LegalDocumentPage
      eyebrow="Terms of Service"
      title="Simple terms for a focused learning journey."
      description="These terms explain how visitors, students, parents, and guardians should use the NaadNova website and participate in music-learning services."
      updatedAt={updatedAt}
      highlights={[
        "Trial and lesson requests become confirmed only after NaadNova confirms availability.",
        "Final fees, cancellation rules, and rescheduling policies should be confirmed before enrollment.",
        "Learning progress depends on consistency, practice, attendance, and personal goals."
      ]}
      sections={sections}
    />
  );
}
