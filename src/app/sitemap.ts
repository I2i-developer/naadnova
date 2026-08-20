import type { MetadataRoute } from "next";

import { featuredCourses, siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const staticRoutes = [
    "",
    "/instruments",
    "/about",
    "/courses",
    "/contact",
    "/login",
    "/signup",
    "/privacy-policy",
    "/cookie-policy",
    "/terms"
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.7
    })),
    ...featuredCourses.map((course) => ({
      url: `${baseUrl}/courses/${course.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8
    }))
  ];
}
