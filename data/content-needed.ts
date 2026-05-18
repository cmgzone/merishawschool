export const contentNeededPages = {
  "educational-philosophy": {
    title: "Educational Philosophy",
    eyebrow: "About Us",
    description:
      "The old website includes this page in navigation, but no substantial content was available during the audit.",
    needed:
      "Client should provide the school's educational philosophy, teaching approach, learner outcomes, and any approved language on mentorship or character formation.",
  },
  "school-calendar": {
    title: "School Calendar",
    eyebrow: "School Life",
    description:
      "The old website includes a School Calendar page, but the audited page did not expose current calendar details.",
    needed:
      "Client should provide term dates, opening and closing dates, exam weeks, events, parent meetings, and downloadable calendar files.",
  },
  "school-uniforms": {
    title: "School Uniforms",
    eyebrow: "School Life",
    description:
      "The old website includes a School Uniforms page, but the audited page did not include uniform requirements.",
    needed:
      "Client should provide uniform lists, supplier details, dress code guidelines, and approved images.",
  },
  "extra-curricular-activities": {
    title: "Extra-curricular Activities",
    eyebrow: "School Life",
    description:
      "The old website includes this page, while the strongest available activity content currently lives under the Merishaw pillars.",
    needed:
      "Client should provide clubs, societies, sports, arts, trips, competitions, and student-life activities.",
  },
  scholarships: {
    title: "Scholarships",
    eyebrow: "Admissions",
    description:
      "The old website includes a Scholarships page, but no scholarship policy was available during the audit.",
    needed:
      "Client should confirm whether scholarships are active, eligibility criteria, application process, deadlines, and required documents.",
  },
  "staff-stories": {
    title: "Staff Stories",
    eyebrow: "Working at Merishaw",
    description:
      "The old website includes a Staff Stories page, but no staff story content was available during the audit.",
    needed:
      "Client should provide staff profiles, quotes, photos, departments, and approved testimonials.",
  },
  "christian-life": {
    title: "Christian Life",
    eyebrow: "Working at Merishaw",
    description:
      "The old website includes a Christian Life page, but no detailed content was available during the audit.",
    needed:
      "Client should provide approved copy about chapel, discipleship, pastoral care, service, and the school's Christian foundation.",
  },
  "career-opportunities": {
    title: "Career Opportunities",
    eyebrow: "Working at Merishaw",
    description:
      "The old website includes a Career Opportunities page, but no current vacancies were available during the audit.",
    needed:
      "Client should provide current vacancies, application instructions, HR contact, and hiring policy.",
  },
} as const;

export type ContentNeededSlug = keyof typeof contentNeededPages;

