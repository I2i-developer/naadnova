import type { LucideIcon } from "lucide-react";
import {
  CalendarCheck,
  CheckCircle2,
  Flame,
  Gauge,
  Guitar,
  Headphones,
  HeartHandshake,
  KeyboardMusic,
  MapPin,
  MicVocal,
  Music2,
  Piano,
  Play,
  Sparkles,
  Star,
  Users
} from "lucide-react";

import { env } from "@/lib/env";

export const siteConfig = {
  name: "Naadnova Academy",
  tagline: "come learn & Create.",
  instructorName: "[Instructor Name]",
  url: env.siteUrl,
  description:
    "Premier academy for Guitar, Piano/Keyboard, Vocals, Dance, and Art & Craft with online and offline performance-oriented training.",
  primaryCta: "Book a Free Trial Class",
  secondaryCta: "Explore Programs",
  contact: {
    phone: "[Phone Number]",
    email: "[Email Address]",
    whatsapp: "[WhatsApp Number]",
    location: "[Studio Location]",
    hours: "[Teaching Hours]"
  },
  social: {
    instagram: "#",
    youtube: "#",
    facebook: "#"
  },
  links: {
    googleForm: "#",
    whatsapp: "#",
    googleBusinessProfile: "#"
  }
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Instruments", href: "/instruments" },
  { label: "Courses", href: "/courses" },
  { label: "Contact", href: "/contact" }
];

export const authItems: NavItem[] = [
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/signup" }
];

export type Course = {
  title: string;
  slug: string;
  description: string;
  level: string;
  age: string;
  accent: "rose" | "gold" | "teal" | "blue";
  Icon: LucideIcon;
};

export const featuredCourses: Course[] = [
  {
    title: "Guitar",
    slug: "guitar",
    description: "[Course Description] Chords, rhythm, songs, technique, and expressive playing.",
    level: "Beginner to intermediate",
    age: "Children, teens, adults",
    accent: "gold",
    Icon: Guitar
  },
  {
    title: "Piano",
    slug: "piano",
    description: "[Course Description] Foundations, musical reading, touch, practice habits, and repertoire.",
    level: "Beginner friendly",
    age: "Children and adults",
    accent: "blue",
    Icon: Piano
  },
  {
    title: "Keyboard",
    slug: "keyboard",
    description: "[Course Description] Modern keyboard skills, melody, accompaniment, and performance confidence.",
    level: "All levels",
    age: "Teens and adults",
    accent: "teal",
    Icon: KeyboardMusic
  },
  {
    title: "Vocals",
    slug: "vocals",
    description: "[Course Description] Breath, pitch, tone, expression, and stage-ready song preparation.",
    level: "Beginner to advanced",
    age: "Teens and adults",
    accent: "rose",
    Icon: MicVocal
  }
];

export const trustItems = [
  { label: "Years teaching", value: "[Years]", helper: "Replace with verified experience" },
  { label: "Students trained", value: "[Students]", helper: "Replace with verified count" },
  { label: "Learning modes", value: "Online / Offline", helper: "Confirm actual availability" },
  { label: "Courses offered", value: "[Courses]", helper: "Replace with final course list" }
];

export const whyItems = [
  {
    title: "Personalized instruction",
    description: "Lessons adapt to the student, their pace, and their musical goals.",
    Icon: HeartHandshake
  },
  {
    title: "Structured progress",
    description: "A clear learning path keeps practice focused without making music feel mechanical.",
    Icon: Gauge
  },
  {
    title: "Performance mindset",
    description: "Students learn technique, confidence, listening, and expression together.",
    Icon: Flame
  },
  {
    title: "Beginner warmth",
    description: "A calm first-step experience for children, parents, and adult beginners.",
    Icon: Sparkles
  }
];

export const methodSteps = [
  { title: "Discover", description: "Understand the student's ear, rhythm, goals, and comfort.", Icon: Headphones },
  { title: "Learn", description: "Build fundamentals through small, clear musical wins.", Icon: Music2 },
  { title: "Practice", description: "Turn lessons into repeatable routines between classes.", Icon: CheckCircle2 },
  { title: "Perform", description: "Shape confidence through songs, recordings, and showcases.", Icon: Play }
];

export const showcaseItems = [
  {
    title: "[Student Performance Title]",
    instrument: "Guitar",
    description: "[Student Showcase Description]",
    Icon: Play
  },
  {
    title: "[Recital / Class Moment]",
    instrument: "Piano",
    description: "[Student Showcase Description]",
    Icon: Users
  },
  {
    title: "[Practice Milestone]",
    instrument: "Vocals",
    description: "[Student Showcase Description]",
    Icon: Star
  }
];

export const testimonials = [
  {
    quote: "[Student Testimonial - PLACEHOLDER]",
    name: "[Student / Parent Name]",
    role: "[Relationship / Instrument]",
    rating: 5
  },
  {
    quote: "[Student Testimonial - PLACEHOLDER]",
    name: "[Student / Parent Name]",
    role: "[Relationship / Instrument]",
    rating: 5
  }
];

export const faqs = [
  {
    question: "Do you offer a trial class?",
    answer: "Yes. Visitors can request a trial class and the instructor can confirm availability after reviewing the enquiry."
  },
  {
    question: "Are classes suitable for complete beginners?",
    answer: "Yes. The site is prepared for children, teens, and adult beginners. Final age and course suitability should be confirmed by the instructor."
  },
  {
    question: "Do you teach online and offline?",
    answer: "The architecture supports online, offline, or hybrid lessons. Replace this with the instructor's actual availability."
  },
  {
    question: "Where is the studio located?",
    answer: "The location is currently a placeholder: [Studio Location]. Local SEO content should be updated once the exact area is supplied."
  }
];

export const quickContact = [
  { label: "Location", value: siteConfig.contact.location, Icon: MapPin },
  { label: "Trial classes", value: "Request availability", Icon: CalendarCheck },
  { label: "Phone", value: siteConfig.contact.phone, Icon: Music2 }
];
