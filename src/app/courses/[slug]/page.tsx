import { notFound } from "next/navigation";

import { PlaceholderPage } from "@/components/sections/PlaceholderPage";
import { featuredCourses } from "@/config/site";

type CourseDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return featuredCourses.map((course) => ({ slug: course.slug }));
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { slug } = await params;
  const course = featuredCourses.find((item) => item.slug === slug);

  if (!course) {
    notFound();
  }

  return (
    <PlaceholderPage
      eyebrow="Course detail"
      title={`${course.title} classes`}
      description={`${course.description} Full outcomes, curriculum, class structure, student work, pricing, and FAQs still need verified client content.`}
    />
  );
}
