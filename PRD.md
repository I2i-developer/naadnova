# PRODUCT REQUIREMENTS DOCUMENT

## Music Instructor / Music Academy Website

**Document Version:** 1.1  
**Technology Stack:** Next.js + TypeScript + Supabase  
**Design Approach:** Custom design created from scratch during development  
**Primary Development Tool:** OpenAI Codex  
**Project Type:** Marketing Website + Lead Generation + Class Enquiry + Content Management  
**Architecture Goal:** Production-ready, scalable, SEO-friendly, fast, secure, visually premium, and easy to maintain.

---

# 1. PRODUCT OVERVIEW

The objective is to develop a premium, modern website for a professional music instructor who teaches one or multiple musical instruments.

The website should establish the instructor's credibility, showcase teaching expertise, demonstrate student outcomes, explain available courses, and convert visitors into prospective students.

The website should not function merely as an informational brochure.

It should act as a:

- Brand-building platform
- Lead-generation platform
- Course discovery platform
- Trial-class booking platform
- Student success showcase
- Content and SEO platform
- Communication channel
- Foundation for future student-management functionality

The website design will be created from scratch as part of the development process.

Codex should establish a complete design system before or during implementation and maintain visual consistency throughout all pages.

The visual experience should feel:

- Artistic
- Musical
- Premium
- Modern
- Personal
- Warm
- Creative
- Professional
- Mobile-first
- Highly polished

The website should visually reflect the personality of music education without becoming overly decorative or compromising usability.

---

# 2. PRODUCT VISION

Create a high-quality digital presence that allows a visitor to quickly understand:

**Who teaches?**

**What instruments are taught?**

**Who are the classes for?**

**Why should someone learn from this instructor?**

**How are the lessons conducted?**

**What results have students achieved?**

**How much do classes cost?**

**How can someone book a trial class or contact the instructor?**

Every major page should ultimately move a visitor toward one of the primary conversion actions.

---

# 3. PRIMARY CONVERSION GOALS

The primary conversion should be:

### Book a Trial Class

Secondary conversions:

- Enquire About Classes
- WhatsApp the Instructor
- Call the Instructor
- Submit Contact Form
- View Courses
- View Student Performances
- Follow Social Media
- Subscribe for updates

CTA terminology must remain consistent throughout the website.

Recommended primary CTA:

**Book a Trial Class**

Recommended secondary CTA:

**Explore Courses**

---

# 4. TARGET AUDIENCE

The website may serve multiple customer segments.

## 4.1 Parents

Parents searching for music lessons for children.

Primary concerns:

- Teacher credibility
- Teaching methodology
- Child-friendly environment
- Safety
- Progress tracking
- Structured curriculum
- Class timings
- Pricing
- Student results

---

## 4.2 Children / Teenagers

Students interested in learning an instrument.

They are influenced by:

- Music
- Performances
- Student videos
- Instruments
- Social proof
- Modern visual experience

---

## 4.3 Adult Beginners

Adults who always wanted to learn music but never started.

Important messaging:

- No previous experience required
- Flexible schedules
- Beginner-friendly
- Learn at your own pace

---

## 4.4 Intermediate / Advanced Students

Students looking to improve technique or prepare for:

- Performances
- Music examinations
- Competitions
- Auditions
- Certifications

---

## 4.5 Online Students

Students outside the instructor's physical location who want remote lessons.

---

# 5. PRODUCT PRINCIPLES

The product should follow these principles.

### 5.1 Conversion First

Beautiful design must not compromise usability.

Every important page should have a clear next action.

---

### 5.2 Visual Storytelling

Music is highly experiential.

The site should use:

- Professional photography
- Student performance imagery
- Instruments
- Short videos
- Instructor imagery
- Testimonials
- Performance clips

where appropriate.

---

### 5.3 Mobile First

A significant portion of enquiries may originate from mobile devices and social-media referrals.

All functionality must work exceptionally well on:

- Mobile
- Tablet
- Laptop
- Desktop

---

### 5.4 Performance First

Animations and media should not significantly degrade performance.

Videos should generally use thumbnails and lazy loading rather than loading heavy media immediately.

---

### 5.5 Content Should Be Editable

Important website content should eventually be manageable without editing source code.

Supabase should therefore function as the content/database layer where appropriate.

---

### 5.6 Design Consistency

Since no external design exists, the development process must establish a unified design system before individual pages diverge visually.

Every page should share:

- Typography
- Colors
- Spacing
- Buttons
- Cards
- Border radius
- Shadows
- Form styling
- Section patterns
- Animation philosophy
- Navigation behavior

Do not design each page independently.

---

# 6. WEBSITE INFORMATION ARCHITECTURE

Recommended primary navigation:

1. Home
2. About
3. Courses
4. Student Showcase
5. Testimonials
6. Gallery
7. Blog / Resources
8. Contact

Primary navigation CTA:

**Book a Trial Class**

Possible additional pages:

- Course detail pages
- FAQ
- Pricing
- Privacy Policy
- Terms & Conditions
- Cancellation Policy
- Thank You
- 404
- Admin

---

# 7. ROUTE STRUCTURE

Recommended route architecture:

```text
/
├── /about
├── /courses
│   ├── /[slug]
├── /students
├── /performances
├── /testimonials
├── /gallery
├── /blog
│   ├── /[slug]
├── /faq
├── /contact
├── /book-trial
├── /privacy-policy
├── /terms
├── /thank-you
└── /admin
```

Course examples:

```text
/courses/guitar
/courses/piano
/courses/keyboard
/courses/drums
/courses/violin
/courses/vocals
```

Actual instruments should be dynamically managed rather than permanently hard-coded wherever practical.

---

# 8. HOMEPAGE

The homepage must be designed and implemented from scratch.

It should establish the complete visual language of the website and serve as the reference design for all future pages.

Before implementation, Codex should determine:

- Overall visual theme
- Typography pairing
- Brand color palette
- Section rhythm
- Card design
- Button hierarchy
- Image treatment
- Hero composition
- Navigation style
- Animation philosophy
- Mobile behavior

Recommended homepage content architecture:

## 8.1 Hero

Include:

- Strong headline
- Supporting statement
- Primary CTA
- Secondary CTA
- Instructor / instrument imagery
- Optional subtle motion effects

Example objective:

Communicate what is taught and why the visitor should care within approximately 5 seconds.

The hero should immediately feel connected to music without looking generic.

Possible visual treatments may include:

- Large instructor photography
- Instrument close-ups
- Layered musical imagery
- Subtle note/waveform motifs
- Soft motion
- Performance photography
- Editorial layouts

Avoid gimmicky visual effects.

---

## 8.2 Trust / Statistics

Possible metrics:

- Years Teaching
- Students Trained
- Instruments / Courses
- Performances
- Certifications

Statistics must come from actual business information.

Do not fabricate statistics.

---

## 8.3 Instructor Introduction

Short introduction.

Include:

- Photo
- Teaching experience
- Philosophy
- Credentials

CTA:

**Meet Your Instructor**

---

## 8.4 Instruments / Courses

Visual cards showing available courses.

Each course card:

- Instrument image/icon
- Course name
- Short description
- Level
- Age suitability
- Learn More CTA

Data should preferably originate from Supabase.

Course cards should have a distinctive visual identity rather than appearing as generic SaaS cards.

---

## 8.5 Why Learn Here

Possible differentiators:

- Personalized lessons
- Structured curriculum
- Performance opportunities
- Flexible schedules
- Beginner-friendly approach
- Online/offline options
- Individual attention

---

## 8.6 Teaching Methodology

Simple 3–4 stage representation:

```text
Discover
↓
Learn
↓
Practice
↓
Perform
```

This section may use a visually engaging progression or timeline.

---

## 8.7 Student Showcase

Show:

- Videos
- Student photos
- Recitals
- Achievements

CTA:

**See Student Performances**

---

## 8.8 Testimonials

Student and parent testimonials.

Potential content:

- Name
- Photo
- Testimonial
- Instrument learned
- Student/parent designation

---

## 8.9 Trial Class CTA

Prominent conversion section.

Headline example concept:

**Ready to Start Your Musical Journey?**

CTA:

**Book Your Trial Class**

---

## 8.10 FAQ Preview

Display approximately 4–6 common questions.

CTA:

**View All FAQs**

---

## 8.11 Contact / Location

If offline classes are offered:

- Area
- Map
- Phone
- WhatsApp
- Email
- Teaching hours

---

# 9. ABOUT PAGE

Purpose:

Build emotional connection and instructor credibility.

Recommended sections:

### Hero

Instructor image and positioning statement.

### Story

Explain:

- Musical journey
- Why they teach
- Years of experience
- Professional journey

### Teaching Philosophy

Explain how learning is approached.

### Qualifications

Examples:

- Certifications
- Degrees
- Performances
- Awards
- Teaching certifications

### Experience Timeline

Optional interactive timeline.

### Philosophy / Values

Examples:

- Patience
- Creativity
- Discipline
- Confidence
- Performance
- Individual learning

### Personal Message

Humanize the instructor.

### CTA

**Start Learning With Me**

---

# 10. COURSES PAGE

Purpose:

Allow visitors to discover all available instruments/classes.

Course cards should contain:

- Course image
- Course name
- Short description
- Suitable age
- Level
- Learning format
- Duration
- CTA

Filters can eventually support:

```text
Instrument
Level
Age Group
Online / Offline
```

Filters are optional for the first release if there are relatively few courses.

---

# 11. COURSE DETAIL PAGE

Dynamic URL:

```text
/courses/[slug]
```

Example:

```text
/courses/guitar
```

Every course should contain:

### Hero

- Course name
- Short value proposition
- Image
- Book Trial CTA

### Overview

What students will learn.

### Who Is This For?

Examples:

- Children
- Teenagers
- Adults
- Beginners
- Intermediate learners

### Curriculum

Example:

```text
Module 1 — Fundamentals
Module 2 — Technique
Module 3 — Songs
Module 4 — Theory
Module 5 — Performance
```

Curriculum must differ depending on instrument.

### Skills Developed

### Class Structure

Example:

```text
Class Duration
45–60 minutes

Frequency
1–2 sessions/week

Format
Online / Offline / Both
```

### Instructor

### Student Work

Videos related to that particular instrument.

### FAQs

Course-specific questions.

### CTA

**Book a Trial Class**

---

# 12. TRIAL CLASS BOOKING

Route:

```text
/book-trial
```

This is one of the most important website flows.

Form fields:

### Required

- Student Name
- Email
- Phone
- Instrument
- Age Group
- Preferred Learning Mode

### Optional

- Experience Level
- Preferred Date
- Preferred Time
- Message

Learning mode:

```text
Online
Offline
Either
```

Experience level:

```text
Complete Beginner
Beginner
Intermediate
Advanced
```

Age groups:

```text
Under 8
8–12
13–17
18–25
26+
```

After submission:

1. Validate request.
2. Save enquiry in Supabase.
3. Display success state.
4. Redirect to `/thank-you`.
5. Optionally trigger email notification.
6. Optionally trigger WhatsApp conversation.

---

# 13. CONTACT PAGE

Include:

- Name
- Phone
- Email
- Subject
- Message

Additional information:

- Phone
- WhatsApp
- Email
- Studio location
- Teaching hours
- Social media

Optional Google Maps embed.

---

# 14. STUDENT SHOWCASE

A major credibility component.

Possible filters:

```text
All
Guitar
Piano
Keyboard
Drums
Violin
Vocals
```

Each student card could contain:

- Student
- Instrument
- Thumbnail
- Video
- Achievement / description

Videos may be hosted through:

- YouTube
- Vimeo
- Supabase Storage

YouTube/Vimeo embedding is preferred for large videos.

---

# 15. TESTIMONIALS

Allow testimonials from:

- Students
- Parents
- Adult learners

Properties:

```text
Name
Photo
Relationship / role
Instrument
Rating
Testimonial
Featured
```

Homepage should show only featured testimonials.

Testimonials page can display the entire collection.

---

# 16. GALLERY

Gallery categories may include:

- Classes
- Performances
- Events
- Students
- Studio
- Workshops

Features:

- Responsive masonry/grid
- Lazy-loaded images
- Lightbox
- Captions
- Optimized thumbnails

---

# 17. BLOG / RESOURCES

Recommended for long-term SEO.

Potential categories:

- Learning Tips
- Guitar
- Piano
- Music Theory
- Parenting & Music
- Beginner Guides
- Practice Techniques
- Student Stories

Routes:

```text
/blog
/blog/[slug]
```

Blog data should be dynamic.

Article fields:

```text
Title
Slug
Excerpt
Content
Featured Image
Author
Category
SEO Title
SEO Description
Published At
Updated At
Status
```

Statuses:

```text
draft
published
archived
```

---

# 18. FAQ PAGE

FAQ categories:

- Classes
- Pricing
- Age
- Instruments
- Online Classes
- Offline Classes
- Trial Classes
- Scheduling
- Practice
- Payments

FAQ data should preferably come from Supabase.

---

# 19. ADMIN DASHBOARD

Recommended route:

```text
/admin
```

Admin should be protected through Supabase authentication.

Initial admin functionality:

### Dashboard

Show:

- New enquiries
- Trial class requests
- Recent contacts
- Published courses
- Published testimonials
- Recent blog articles

### Manage Courses

CRUD:

```text
Create
Read
Update
Delete
Publish / Unpublish
```

### Manage Enquiries

Statuses:

```text
New
Contacted
Trial Scheduled
Converted
Not Interested
Closed
```

### Manage Testimonials

### Manage Gallery

### Manage Student Showcase

### Manage FAQs

### Manage Blog

Admin interface does not need to use the public website's elaborate animations.

Prioritize functionality and clarity.

---

# 20. USER ROLES

Initial system roles:

```text
Visitor
Admin
```

Future:

```text
Student
Parent
Instructor
Staff
```

---

# 21. SUPABASE ARCHITECTURE

Supabase should provide:

- PostgreSQL database
- Authentication
- Storage
- Row Level Security
- Realtime only where necessary

Avoid unnecessary realtime functionality.

---

# 22. DATABASE SCHEMA

Recommended initial schema.

## profiles

```text
id UUID PK
full_name TEXT
email TEXT
role TEXT
avatar_url TEXT
created_at TIMESTAMPTZ
updated_at TIMESTAMPTZ
```

---

## courses

```text
id UUID PK
title TEXT
slug TEXT UNIQUE
short_description TEXT
description TEXT
instrument TEXT
age_group TEXT
level TEXT
class_duration TEXT
frequency TEXT
mode TEXT
featured_image TEXT
price NUMERIC nullable
is_featured BOOLEAN
is_published BOOLEAN
sort_order INTEGER
created_at TIMESTAMPTZ
updated_at TIMESTAMPTZ
```

---

## course_curriculum

```text
id UUID PK
course_id UUID FK
title TEXT
description TEXT
position INTEGER
created_at TIMESTAMPTZ
```

---

## enquiries

```text
id UUID PK
name TEXT
email TEXT
phone TEXT
type TEXT
instrument TEXT
age_group TEXT
experience_level TEXT
learning_mode TEXT
preferred_date DATE
preferred_time TEXT
message TEXT
source TEXT
status TEXT
created_at TIMESTAMPTZ
updated_at TIMESTAMPTZ
```

Possible `type` values:

```text
trial
contact
general
```

---

## testimonials

```text
id UUID PK
name TEXT
relationship TEXT
instrument TEXT
testimonial TEXT
rating INTEGER
image_url TEXT
is_featured BOOLEAN
is_published BOOLEAN
sort_order INTEGER
created_at TIMESTAMPTZ
```

---

## student_showcase

```text
id UUID PK
student_name TEXT
instrument TEXT
title TEXT
description TEXT
thumbnail_url TEXT
video_url TEXT
achievement TEXT
is_featured BOOLEAN
is_published BOOLEAN
sort_order INTEGER
created_at TIMESTAMPTZ
```

---

## gallery

```text
id UUID PK
title TEXT
description TEXT
image_url TEXT
category TEXT
alt_text TEXT
sort_order INTEGER
is_published BOOLEAN
created_at TIMESTAMPTZ
```

---

## faqs

```text
id UUID PK
question TEXT
answer TEXT
category TEXT
sort_order INTEGER
is_published BOOLEAN
created_at TIMESTAMPTZ
updated_at TIMESTAMPTZ
```

---

## blog_posts

```text
id UUID PK
title TEXT
slug TEXT UNIQUE
excerpt TEXT
content TEXT
featured_image TEXT
category TEXT
author_id UUID
seo_title TEXT
seo_description TEXT
status TEXT
published_at TIMESTAMPTZ
created_at TIMESTAMPTZ
updated_at TIMESTAMPTZ
```

---

## site_settings

```text
id UUID PK
key TEXT UNIQUE
value JSONB
updated_at TIMESTAMPTZ
```

Possible settings:

```text
phone
email
whatsapp
address
instagram
youtube
facebook
studio_hours
trial_cta_text
```

---

# 23. DATABASE RULES

All tables should contain:

- Stable primary identifiers
- Created timestamps where appropriate
- Updated timestamps where appropriate

Use database constraints where possible.

Avoid using free-form text when data should have controlled values.

Use foreign keys.

Create database indexes for frequently queried:

- Slugs
- Publication status
- Course relationships
- Categories
- Created dates

---

# 24. ROW LEVEL SECURITY

Supabase RLS must be enabled where appropriate.

General model:

### Public

Can:

- Read published courses
- Read published testimonials
- Read published FAQs
- Read published blog articles
- Read published gallery
- Submit enquiry

Cannot:

- Read enquiry database
- Modify content
- Access administration information

### Admin

Can:

- Create
- Read
- Update
- Delete content
- Read and update enquiries

Never rely solely on frontend checks for authorization.

---

# 25. NEXT.JS ARCHITECTURE

Use:

- Next.js
- App Router
- TypeScript
- React Server Components where appropriate

Recommended structure:

```text
src/
│
├── app/
│   ├── (marketing)/
│   ├── admin/
│   ├── api/
│   ├── layout.tsx
│   ├── sitemap.ts
│   └── robots.ts
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── sections/
│   ├── forms/
│   ├── cards/
│   └── media/
│
├── lib/
│   ├── supabase/
│   ├── validations/
│   ├── analytics/
│   └── utils/
│
├── services/
│
├── types/
│
├── hooks/
│
├── config/
│
└── styles/
```

Keep business logic outside presentation components where possible.

---

# 26. COMPONENT ARCHITECTURE

Create reusable components.

Examples:

```text
Button
Container
Section
SectionHeader
Navbar
MobileMenu
Footer
CourseCard
TestimonialCard
StudentCard
BlogCard
VideoCard
GalleryCard
CTASection
FAQAccordion
ContactForm
TrialForm
SocialLinks
Breadcrumb
Pagination
EmptyState
LoadingState
ErrorState
```

Avoid creating unnecessarily large page components.

---

# 27. DESIGN SYSTEM

Since no pre-existing design exists, a complete design system must be created before or alongside homepage development.

The homepage should establish the reference visual language for the entire website.

The design system should define:

- Color palette
- Typography
- Border radius
- Shadows
- Spacing
- Buttons
- Cards
- Container width
- Section spacing
- Image treatments
- Form styles
- Iconography
- Motion style
- Navigation
- Footer
- Responsive behaviors

These should become reusable design tokens.

Example semantic colors:

```text
Primary
Secondary
Accent
Background
Surface
Foreground
Muted
Border
Error
Success
```

Do not introduce arbitrary colors on different pages.

---

## 27.1 VISUAL DIRECTION

The overall aesthetic should combine:

**Music + premium education + artistic personality**

Avoid making the website look like:

- A generic SaaS website
- A corporate financial website
- A generic Bootstrap template
- A children's cartoon website
- A nightclub/event website

Recommended style direction:

- Strong editorial typography
- Large immersive imagery
- Generous whitespace
- Expressive but controlled accent colors
- Subtle musical motifs
- Rounded or editorial image treatments
- Premium cards
- Clean forms
- Modern navigation
- Elegant interaction

---

## 27.2 COLOR DIRECTION

Codex should create an accessible, premium palette.

Potential direction:

- Deep neutral background or warm light background
- Strong primary brand color
- Musical accent color
- Soft supporting neutrals

Avoid using too many highly saturated colors.

Color contrast must remain accessible.

---

## 27.3 TYPOGRAPHY DIRECTION

Typography should feel creative yet highly readable.

Use a maximum of approximately two main font families unless there is a strong reason otherwise.

Potential structure:

```text
Display / Heading Font
+
Body / UI Font
```

Typography should create clear hierarchy between:

- Hero
- H1
- H2
- H3
- Body
- Small text
- Labels
- CTA

---

# 28. RESPONSIVE DESIGN

Primary breakpoints should accommodate:

```text
Mobile
Tablet
Laptop
Desktop
Large Desktop
```

Do not simply scale desktop UI down.

Consider mobile-specific behavior for:

- Navigation
- Cards
- Videos
- Galleries
- Forms
- Hero layouts
- Sticky CTAs

The design process should begin from mobile usability rather than treating mobile as an afterthought.

---

# 29. MOTION & MICROINTERACTIONS

Animation should enhance rather than distract.

Possible effects:

- Fade-on-scroll
- Subtle stagger
- Hover transitions
- Instrument-card movement
- Button feedback
- Image reveal
- Text reveal
- Subtle floating elements
- Lightweight parallax where appropriate

Respect:

```text
prefers-reduced-motion
```

Do not introduce animation that negatively affects:

- Accessibility
- CLS
- Loading speed
- Usability

---

# 30. FORM VALIDATION

Use a schema validation library such as Zod.

Validation should exist at both:

- Client boundary
- Server boundary

Example phone requirements:

- Remove accidental spaces
- Validate reasonable length
- Store normalized format where practical

Never trust browser validation alone.

---

# 31. SPAM PROTECTION

Forms must include protection against automated submissions.

Potential strategies:

- Honeypot
- Rate limiting
- CAPTCHA/Turnstile if necessary

Start with low-friction techniques before introducing intrusive CAPTCHA.

---

# 32. ERROR HANDLING

Every async operation should account for:

```text
Loading
Success
Empty
Failure
```

Never expose raw internal/database errors to users.

User-facing errors should be friendly.

Technical errors should be available for debugging.

---

# 33. IMAGE STRATEGY

Use Next.js image optimization where appropriate.

Requirements:

- Responsive sizes
- Width and height
- Lazy load below fold
- Correct formats
- Meaningful alt text
- Avoid layout shift

Supabase Storage may contain:

- Course images
- Testimonials
- Gallery images
- Student thumbnails

The design should support professional photography prominently.

---

# 34. VIDEO STRATEGY

Avoid loading multiple heavy videos immediately.

Recommended:

Thumbnail

↓

User clicks play

↓

Load video player

Support external providers where practical.

This is particularly important for student showcase pages.

---

# 35. SEO REQUIREMENTS

SEO must be built into the architecture rather than added later.

Each page should have:

- Unique title
- Meta description
- Canonical metadata
- Open Graph metadata
- Social image
- Correct heading hierarchy

Dynamic pages should generate metadata dynamically.

---

# 36. LOCAL SEO

If offline classes are available, optimize strongly for local searches.

Potential keyword structures:

```text
Guitar classes in [Location]
Piano teacher in [Location]
Music classes near [Location]
Keyboard classes in [Location]
Music teacher for kids in [Location]
```

Do not keyword-stuff pages.

Content should remain natural and useful.

---

# 37. STRUCTURED DATA

Where applicable, implement structured data for entities such as:

- Local business
- Person
- Course
- FAQ
- Article
- Breadcrumb

Only provide structured data that accurately represents visible content.

---

# 38. SITEMAP

Automatically generate sitemap.

Include:

- Static pages
- Published courses
- Published articles

Exclude:

- Admin
- Drafts
- Internal pages
- Thank-you pages where appropriate

---

# 39. ROBOTS

Configure robots rules.

Search engines should not index:

```text
/admin
/private routes
/internal APIs
```

---

# 40. CONTENT SEO STRATEGY

Blog topics should target useful search intent.

Examples:

- Best age to start learning guitar
- Guitar vs keyboard for beginners
- How long does it take to learn piano?
- How much should children practice music?
- Online vs offline music lessons
- Beginner guitar practice routine
- Music lessons for adults
- Benefits of learning music for children

This can become an important long-term organic acquisition channel.

---

# 41. AI SEARCH VISIBILITY

Structure content so it can be understood easily by both search engines and AI systems.

Use:

- Clear semantic headings
- Strong factual content
- Instructor credentials
- Course information
- FAQ sections
- Structured data
- Clear author/entity identity
- Consistent business information
- Descriptive content
- Good internal linking

Avoid hiding important information exclusively inside animations or images.

---

# 42. ACCESSIBILITY

Aim for WCAG AA-quality implementation.

Important considerations:

- Keyboard navigation
- Visible focus states
- Semantic HTML
- Proper labels
- Alt text
- Appropriate contrast
- Accessible mobile menu
- Accessible modal/lightbox
- Reduced-motion support

Do not use clickable `<div>` elements when proper semantic elements exist.

---

# 43. PERFORMANCE TARGETS

The website should aim for excellent Core Web Vitals.

Target Lighthouse categories:

```text
Performance: 90+
Accessibility: 95+
Best Practices: 95+
SEO: 95+
```

These are targets rather than guaranteed scores.

Prioritize:

- LCP
- CLS
- INP
- Image optimization
- Font loading
- JS bundle size
- Third-party scripts

---

# 44. ANALYTICS

Implement privacy-conscious analytics.

Recommended events:

```text
page_view
trial_cta_click
trial_form_started
trial_form_submitted
contact_form_submitted
whatsapp_clicked
phone_clicked
course_viewed
video_played
testimonial_viewed
instagram_clicked
youtube_clicked
```

This allows the business to identify where leads originate.

---

# 45. CONVERSION TRACKING

Track:

```text
Visitor
↓
Course View
↓
Trial CTA
↓
Form Start
↓
Form Submission
↓
Trial Scheduled
↓
Student Converted
```

Eventually the admin dashboard can calculate:

```text
Lead → Trial Conversion

Trial → Student Conversion
```

---

# 46. WHATSAPP INTEGRATION

WhatsApp should be highly visible, particularly on mobile.

Potential implementations:

- Header button
- Floating button
- Contact page
- Trial success page

Prepopulate messages.

Example concept:

```text
Hi, I am interested in learning [instrument] and would like to know more about the classes.
```

---

# 47. SOCIAL MEDIA

Potential platforms:

- Instagram
- YouTube
- Facebook

Social links should be configurable through site settings rather than scattered throughout source files.

---

# 48. SECURITY

Security requirements include:

- Environment variables
- Supabase RLS
- Server-side authorization
- Input validation
- Sanitization
- Rate limiting
- Safe redirect handling
- Secure authentication
- Dependency maintenance

Never expose:

```text
SUPABASE_SERVICE_ROLE_KEY
```

to client-side code.

Only public Supabase credentials intended for browser use may be exposed.

---

# 49. ENVIRONMENT VARIABLES

Example structure:

```text
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=

NEXT_PUBLIC_GOOGLE_MAPS_URL=

NEXT_PUBLIC_INSTAGRAM_URL=
NEXT_PUBLIC_YOUTUBE_URL=
NEXT_PUBLIC_FACEBOOK_URL=
NEXT_PUBLIC_WHATSAPP_NUMBER=
```

The `.env.local` file must never be committed.

Provide `.env.example`.

---

# 50. ADMIN AUTHENTICATION

Admin authentication should use Supabase Auth.

Requirements:

- Login
- Logout
- Protected routes
- Server-side role verification

Optional:

- Password recovery
- Magic link
- MFA later

Do not implement public registration unless required.

---

# 51. CMS STRATEGY

Initial admin CMS should support editing:

- Courses
- Testimonials
- Student showcase
- Gallery
- FAQs
- Blog
- Contact details
- Social links

Avoid building a fully generalized page builder in the first version.

Structured content is easier to maintain and safer.

---

# 52. EMPTY STATES

Every dynamic section must have graceful behavior when content doesn't exist.

Examples:

No testimonials:

Hide section rather than showing broken cards.

No student videos:

Show suitable fallback.

No blog posts:

Show useful empty state.

---

# 53. 404 PAGE

Custom 404 matching musical brand identity.

Possible message concept:

**Looks like this note went off-key.**

CTA:

**Back to Home**

---

# 54. THANK-YOU PAGE

After enquiry submission:

```text
/thank-you
```

Include:

- Confirmation
- Expected next step
- WhatsApp shortcut
- Course link
- Social links

This page should also serve as a conversion-tracking event.

---

# 55. LOADING EXPERIENCE

Use lightweight loading states where useful.

Avoid excessive full-screen loaders.

Prefer:

- Skeletons
- Placeholder cards
- Progressive image loading

---

# 56. DEVELOPMENT QUALITY REQUIREMENTS

Code should be:

- Type-safe
- Modular
- Reusable
- Readable
- Documented where necessary
- Consistently formatted

Avoid:

- `any`
- Duplicate components
- Hardcoded business data
- Giant page components
- Dead code
- Excessive dependencies

---

# 57. TYPESCRIPT REQUIREMENTS

Use strict TypeScript.

Avoid suppressing type errors.

Database types should ideally be generated from Supabase.

Centralize important models.

Example:

```text
Course
Testimonial
Enquiry
StudentShowcase
GalleryItem
BlogPost
FAQ
```

---

# 58. DATA ACCESS ARCHITECTURE

Do not scatter Supabase queries throughout UI components.

Preferred structure:

```text
UI
↓
Service / Query Layer
↓
Supabase Client
↓
Database
```

This makes future migration and testing significantly easier.

---

# 59. SERVER VS CLIENT COMPONENTS

Use Server Components by default.

Use Client Components only when required for:

- User interaction
- Browser APIs
- Local state
- Animation
- Certain form interactions

Avoid `"use client"` at page-level unnecessarily.

---

# 60. CACHING STRATEGY

Mostly static content such as:

- Courses
- FAQs
- Testimonials
- Blog

should take advantage of Next.js caching/revalidation where appropriate.

Content updates should not require a complete redevelopment of the website.

---

# 61. TESTING

Implement testing at multiple levels.

## Unit Tests

Examples:

- Validation
- Formatting
- Utility logic

## Component Tests

Examples:

- Forms
- Course cards
- FAQ accordion

## Integration Tests

Examples:

- Enquiry submission
- Supabase interaction

## E2E Tests

Critical journeys:

```text
Homepage
→ Course
→ Book Trial
→ Submit
→ Thank You
```

Also test:

```text
Admin Login
→ Add Course
→ Publish
→ Course Appears Publicly
```

---

# 62. BROWSER TESTING

Verify:

- Chrome
- Safari
- Firefox
- Edge

And common mobile browsers.

---

# 63. DEVICE QA

Test at minimum:

```text
320px
375px
390px
430px
768px
1024px
1280px
1440px
1920px
```

Check actual layouts rather than relying exclusively on responsive simulation.

---

# 64. DEPLOYMENT

Recommended deployment:

**Vercel**

Backend/database:

**Supabase**

Potential infrastructure:

```text
GitHub
   ↓
Vercel
   ↓
Next.js

Next.js
   ↓
Supabase
```

Use:

```text
Development
Preview
Production
```

environments where possible.

---

# 65. GIT STRATEGY

Recommended branches:

```text
main
development
feature/*
fix/*
```

Example:

```text
feature/course-page
feature/trial-booking
feature/admin-dashboard
```

Commit messages should clearly describe changes.

---

# 66. ERROR MONITORING

Recommended future addition:

Error tracking platform such as Sentry.

Capture:

- Runtime errors
- API failures
- Form failures

Do not log sensitive user information unnecessarily.

---

# 67. PHASE 1 — MVP

Build first:

- Design system
- Homepage
- About
- Courses
- Course detail
- Student showcase
- Testimonials
- Gallery
- FAQ
- Contact
- Trial booking
- Supabase enquiry storage
- WhatsApp integration
- SEO foundation
- Analytics
- Responsive implementation

---

# 68. PHASE 2 — CONTENT MANAGEMENT

Add:

- Admin authentication
- Course CMS
- Testimonial CMS
- Gallery CMS
- FAQ CMS
- Student showcase CMS
- Blog CMS

---

# 69. PHASE 3 — GROWTH

Potential features:

- Blog
- Newsletter
- Lead tracking
- CRM integration
- Automated emails
- Conversion dashboard
- Advanced analytics

---

# 70. PHASE 4 — STUDENT PORTAL

If the business grows, potentially introduce:

```text
Student Accounts
Class Schedule
Attendance
Practice Assignments
Progress Tracking
Lesson Notes
Resources
Videos
Payments
Certificates
```

This functionality should not complicate the initial marketing website.

Architecture should merely avoid blocking such expansion.

---

# 71. POSSIBLE FUTURE BOOKING SYSTEM

Future booking flow:

```text
Student
↓
Select Instrument
↓
Select Instructor
↓
Select Date
↓
Select Slot
↓
Pay
↓
Booking Confirmed
```

Potential future tables:

```text
instructors
availability
time_slots
bookings
payments
students
lessons
```

Do not build these until required.

---

# 72. POTENTIAL FUTURE PAYMENT SYSTEM

Possible future support:

- Trial-class payments
- Monthly fees
- Course packages

Payment provider could be integrated later.

Payment details should never be stored directly in Supabase.

---

# 73. LEAD MANAGEMENT

Admin enquiries should eventually show:

```text
Name
Phone
Email
Instrument
Source
Status
Created
Last Contact
Notes
```

This enables the website to work as a lightweight CRM.

---

# 74. LEAD SOURCE TRACKING

Store campaign information where available:

```text
utm_source
utm_medium
utm_campaign
utm_content
utm_term
landing_page
referrer
```

This allows measurement of marketing effectiveness.

---

# 75. PAGE DESIGN REQUIREMENTS

Since there is no pre-existing design, all pages must follow the design system established during homepage development.

Before implementing any additional page, Codex should identify and reuse:

```text
Typography
Colors
Spacing
Containers
Cards
Buttons
Borders
Shadows
Radius
Image ratios
Navigation
Section patterns
Motion patterns
Forms
Responsive behavior
```

Reuse existing components before creating new ones.

The implementation should not become a collection of unrelated page designs.

Any new visual pattern should first be evaluated for whether it can become a reusable component or design token.

---

# 76. DESIGN-TO-CODE REQUIREMENT

Since the design will be developed directly through the implementation process, Codex should follow a deliberate design workflow rather than immediately coding isolated sections.

Before implementing major pages, Codex should:

1. Analyze the business and target audience.
2. Review the current design system.
3. Identify reusable page patterns.
4. Determine visual hierarchy.
5. Plan responsive behavior.
6. Define required sections.
7. Reuse existing components.
8. Implement incrementally.
9. Optimize assets.
10. Ensure accessibility.
11. Test multiple viewport widths.
12. Refine spacing and visual rhythm.

Do not create pages by combining random component-library sections without a coherent visual system.

---

# 77. CONTENT MANAGEMENT PRINCIPLE

Separate:

```text
Content
from
Presentation
```

Avoid hardcoding:

```text
Phone numbers
Emails
Course data
Testimonials
FAQs
Social URLs
Business address
```

when the data is expected to change.

---

# 78. CONTENT PLACEHOLDERS

If actual client information has not yet been supplied:

Use clearly marked placeholder content.

Example:

```text
[Instructor Name]
[Studio Location]
[Phone Number]
```

Never fabricate:

- Awards
- Experience
- Qualifications
- Student counts
- Certifications
- Testimonials

---

# 79. SEO URL RULES

URLs should be:

```text
lowercase
short
descriptive
hyphenated
```

Good:

```text
/courses/acoustic-guitar
```

Avoid:

```text
/course?id=28372
```

for public-facing course discovery.

---

# 80. INTERNAL LINKING

Create logical links between:

```text
Homepage → Courses
Course → Trial
Course → Student Showcase
Blog → Course
Blog → Trial
About → Trial
Student Performance → Course
```

This supports both usability and SEO.

---

# 81. FOOTER

Footer should include:

### Navigation

- Home
- About
- Courses
- Gallery
- Blog
- Contact

### Courses

Selected instruments.

### Contact

- Phone
- Email
- Location
- WhatsApp

### Social

- Instagram
- YouTube
- Facebook

### Legal

- Privacy
- Terms

### Copyright

Dynamic current year.

---

# 82. NAVIGATION REQUIREMENTS

Desktop:

```text
Logo
Navigation
Book Trial CTA
```

Mobile:

```text
Logo
Menu
```

Mobile menu should contain:

- Navigation
- CTA
- Contact
- Social links where appropriate

Header may become sticky after scroll if it improves usability and supports the selected visual direction.

---

# 83. CTA STRATEGY

Avoid using too many different CTA labels.

Recommended vocabulary:

Primary:

**Book a Trial Class**

Secondary:

**Explore Courses**

Other contextual CTAs:

**View Performance**

**Learn More**

**Contact Us**

---

# 84. SEO CONTENT REQUIREMENT FOR COURSE PAGES

Each course needs unique content.

Avoid creating identical pages where only the instrument name changes.

Each page should explain:

- Instrument
- Learning outcomes
- Curriculum
- Student suitability
- Teaching approach
- FAQs

---

# 85. LEGAL REQUIREMENTS

Provide:

- Privacy Policy
- Terms
- Form consent text where required

If analytics/cookies requiring consent are introduced, implement an appropriate consent mechanism based on applicable requirements.

---

# 86. PRIVACY PRINCIPLE

Only collect data necessary for contacting and serving the prospective student.

Do not unnecessarily collect:

- Sensitive personal information
- Identity documents
- Detailed child information

If children use the site, contact and enrolment workflows should appropriately involve parents/guardians.

---

# 87. DEFINITION OF DONE

A feature is complete only when:

- UI follows the approved design system
- Responsive
- Accessible
- TypeScript passes
- Lint passes
- Build passes
- Forms validated
- Error states handled
- Loading states handled
- Data integrated
- Security considered
- SEO metadata implemented
- Tested
- No console errors
- No broken links

---

# 88. MVP ACCEPTANCE CRITERIA

The production website must allow a visitor to:

- Understand who the instructor is
- Understand what instruments/classes are offered
- View individual course information
- View testimonials
- View student results/performances
- Browse images
- Read FAQs
- Contact the instructor
- Book/request a trial class
- Use the website comfortably on mobile
- Find relevant information through search engines

The administrator must be able to receive and access submitted enquiries.

---

# 89. NON-FUNCTIONAL REQUIREMENTS

The system should be:

```text
Fast
Secure
Responsive
Accessible
SEO-friendly
Maintainable
Scalable
Type-safe
Resilient
Easy to update
```

---

# 90. CODEX DEVELOPMENT RULES

Codex must follow these rules throughout development.

### Rule 1

Do not change working functionality unnecessarily.

### Rule 2

Inspect the existing architecture before creating new components.

### Rule 3

Reuse components before duplicating UI.

### Rule 4

Use strict TypeScript.

### Rule 5

Do not use `any` without a legitimate unavoidable reason.

### Rule 6

Do not expose secrets.

### Rule 7

Do not hard-code frequently changing content.

### Rule 8

Use semantic HTML.

### Rule 9

Preserve responsive behavior.

### Rule 10

Do not sacrifice performance for decorative animation.

### Rule 11

Run:

```text
lint
typecheck
build
tests
```

before considering substantial work complete.

### Rule 12

Fix root causes rather than suppressing warnings.

### Rule 13

Do not install unnecessary dependencies.

### Rule 14

Keep all public UI consistent with the established design system.

### Rule 15

Do not introduce visually unrelated styles between pages.

### Rule 16

Any new design pattern should either reuse or intentionally extend the existing design system.

---

# 91. RECOMMENDED DEVELOPMENT SEQUENCE

Codex should implement the project in this order.

### Stage 1 — Product & Design Foundation

```text
Next.js architecture
TypeScript
Design direction
Brand palette
Typography
Design tokens
Spacing system
Buttons
Cards
Forms
Navigation
Footer
Global styles
Environment
Supabase clients
```

### Stage 2 — Homepage

Design and implement the homepage first.

The homepage should establish:

```text
Visual identity
Typography hierarchy
Section rhythm
CTA hierarchy
Cards
Media treatment
Motion language
Mobile behavior
```

Once established, these patterns should become the reference for every other page.

### Stage 3 — Public Pages

```text
About
Courses
Course Detail
Testimonials
Student Showcase
Gallery
FAQ
Contact
```

### Stage 4 — Conversion

```text
Trial booking
Contact forms
Validation
Supabase storage
Thank-you flow
WhatsApp
```

### Stage 5 — SEO

```text
Metadata
Sitemap
Robots
Structured data
Open Graph
Internal linking
```

### Stage 6 — Admin

```text
Authentication
Enquiries
Course CMS
Testimonials
Gallery
FAQ
Student showcase
```

### Stage 7 — Blog

```text
Blog CMS
Listing
Article
SEO
Categories
```

### Stage 8 — QA

```text
Responsive
Accessibility
Performance
Security
Browser testing
Build verification
```

### Stage 9 — Production

```text
Vercel
Domain
Environment variables
Supabase production
Analytics
Monitoring
```

---

# 92. SUCCESS METRICS

After launch, monitor:

### Acquisition

- Organic traffic
- Direct traffic
- Social traffic
- Local search traffic

### Engagement

- Course page views
- Student video plays
- Time on site
- Blog engagement

### Conversion

- Trial enquiries
- WhatsApp clicks
- Contact submissions
- Phone clicks
- Enquiry conversion rate

### Business

Eventually:

- Trial classes scheduled
- Trial-to-paid conversion
- Student acquisition source
- Customer acquisition cost

---

# 93. PRIMARY PRODUCT KPI

The principal website KPI should be:

**Qualified Trial-Class Enquiries**

Traffic alone should not define website success.

---

# 94. FINAL PRODUCT EXPERIENCE

The final experience should make a visitor feel:

> “This instructor looks professional, trustworthy, passionate about music, has genuine student results, and makes it easy for me or my child to begin learning.”

Design, content, performance and conversion flows should all reinforce this outcome.

---

# 95. PROJECT NORTH STAR

Every technical and design decision should ultimately improve one or more of:

```text
Trust
Discoverability
User Experience
Conversion
Performance
Maintainability
Scalability
```

If functionality adds complexity without meaningfully improving one of these areas, reconsider whether it belongs in the initial release.

---

# 96. CODEX MASTER EXECUTION PRINCIPLE

Before implementing any feature, Codex should:

```text
1. Inspect the existing codebase.
2. Review the existing design system.
3. Understand the page's business purpose.
4. Identify reusable components.
5. Identify required database/data changes.
6. Plan visual hierarchy and responsive behavior.
7. Plan implementation.
8. Implement incrementally.
9. Test responsive behavior.
10. Verify accessibility.
11. Run lint/typecheck/build.
12. Review for security and performance.
13. Review visual consistency.
14. Summarize modifications made.
```

Codex should treat this PRD as the source of truth for:

- Product architecture
- Functional requirements
- Technical architecture
- Design philosophy
- Content structure
- SEO strategy
- Security standards
- Performance standards
- Development quality

The design system created during the homepage implementation should become the source of truth for visual presentation across the remainder of the website.

---

# 97. DESIGN CREATION WORKFLOW FOR CODEX

Because no design exists beforehand, Codex must avoid jumping directly into implementation without first establishing design direction.

For the homepage and other visually important pages, follow:

```text
Business Understanding
↓
Audience Understanding
↓
Visual Direction
↓
Design System
↓
Wireframe / Section Structure
↓
Reusable Components
↓
Responsive UI
↓
Animation / Interaction
↓
Performance Optimization
↓
QA
```

---

# 98. HOMEPAGE DESIGN CREATION PROCESS

Before coding the final homepage, Codex should define:

### Brand Personality

Examples:

```text
Creative
Professional
Warm
Passionate
Premium
Approachable
Inspirational
```

### Hero Concept

Determine:

- Main visual
- Headline treatment
- CTA positioning
- Instructor/instrument imagery
- Motion

### Section Rhythm

Avoid making every section visually identical.

Create variation using:

- Full-width sections
- Split layouts
- Editorial grids
- Feature cards
- Image-led sections
- Dark/light contrast sections
- Large CTA areas

while maintaining consistency.

---

# 99. DESIGN QUALITY BAR

The website should feel intentionally designed rather than generated from a component template.

Avoid repetitive patterns such as:

```text
Heading
Text
3 cards

Heading
Text
3 cards

Heading
Text
3 cards
```

Use visual hierarchy and composition to create a more premium experience.

---

# 100. VISUAL CONTENT PRIORITY

For a music instructor website, visual media should play a significant role.

Priority order:

```text
Real instructor photography
Real student performances
Real studio/classroom imagery
Instrument photography
Testimonials
Supporting graphics
Decorative graphics
```

Real content should generally be prioritized over generic stock graphics whenever available.

---

# 101. BRAND ASSET REQUIREMENTS

Before production launch, request or obtain where available:

```text
Logo
Instructor photographs
Professional headshot
Classroom/studio photographs
Instrument photographs
Student performance images
Student videos
Testimonials
Certifications
Awards
Social media links
Contact information
Location
Course list
Pricing if public
```

Placeholder content may be used during development.

---

# 102. CONTENT FALLBACK STRATEGY

Development should not stop if final content is unavailable.

Use clearly marked structured placeholder content.

Examples:

```text
[Instructor Name]
[10+ Years Experience — REPLACE WITH REAL VALUE]
[Student Testimonial — PLACEHOLDER]
[Course Description]
```

Before production, perform a placeholder audit.

No placeholder or invented business claims may remain at launch.

---

# 103. UI COMPONENT QUALITY

Components should support variants rather than duplication.

Example:

```text
<Button variant="primary" />
<Button variant="secondary" />
<Button variant="ghost" />
```

Similarly:

```text
Section
CourseCard
MediaCard
CTASection
TestimonialCard
```

should accommodate controlled variations.

Avoid copy-pasting components just to make slight visual differences.

---

# 104. DESIGN TOKEN REQUIREMENT

Create centralized tokens for:

```text
Colors
Typography
Spacing
Radius
Shadows
Container sizes
Breakpoints
Transitions
Z-index
```

Avoid arbitrary values throughout the project where reusable tokens are appropriate.

---

# 105. HOMEPAGE APPROVAL PRINCIPLE

The homepage establishes the brand system.

Before substantially building every internal page, ensure the homepage has successfully defined:

- Overall aesthetic
- Color system
- Typography
- Buttons
- Cards
- Forms
- Image styles
- Motion
- Header
- Footer
- Mobile navigation

Then reuse these patterns throughout the website.

---

# 106. FINAL TECHNICAL PRINCIPLE

The goal is not simply to create a visually impressive website.

The goal is to build a production-grade digital platform where:

```text
Design
+
Performance
+
SEO
+
Content
+
Conversion
+
Maintainability
+
Security
```

work together.

No single area should be optimized at the expense of the entire product.

---

# 107. FINAL INSTRUCTION TO CODEX

Treat this PRD as a persistent project specification.

When a new task is requested:

1. Read the relevant existing code.
2. Review this PRD.
3. Check existing design tokens/components.
4. Determine whether an existing component can be reused.
5. Preserve visual consistency.
6. Preserve database conventions.
7. Preserve SEO architecture.
8. Preserve accessibility.
9. Preserve performance.
10. Implement the smallest maintainable solution that satisfies the requirement.
11. Run appropriate verification.
12. Do not make unrelated changes.

When requirements conflict, prioritize in this order:

```text
Explicit latest user instruction
↓
PRD functional requirement
↓
Security
↓
Accessibility
↓
Data integrity
↓
Performance
↓
Established design system
↓
Implementation convenience
```

The resulting website must be sufficiently structured and maintainable that another experienced Next.js engineer can enter the repository, understand the architecture, and continue development without requiring a rewrite.