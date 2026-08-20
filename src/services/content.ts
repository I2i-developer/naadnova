import {
  faqs,
  featuredCourses,
  methodSteps,
  quickContact,
  showcaseItems,
  testimonials,
  trustItems,
  whyItems
} from "@/config/site";

export async function getHomepageContent() {
  return {
    courses: featuredCourses,
    trustItems,
    whyItems,
    methodSteps,
    showcaseItems,
    testimonials,
    faqs,
    quickContact
  };
}
