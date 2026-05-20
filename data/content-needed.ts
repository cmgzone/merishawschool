export const contentNeededPages = {
  "educational-philosophy": {
    title: "Educational Philosophy",
    eyebrow: "About Us",
    description:
      "A focused page for Merishaw's teaching philosophy, learner outcomes, and mentorship approach.",
    needed:
      "This page is being refreshed with the school's educational philosophy, teaching approach, learner outcomes, and approved language on mentorship or character formation.",
  },
  "school-calendar": {
    title: "School Calendar",
    eyebrow: "School Life",
    description:
      "A future home for term dates, events, parent meetings, and downloadable calendar files.",
    needed:
      "This page is being refreshed with term dates, opening and closing dates, exam weeks, events, parent meetings, and downloadable calendar files.",
  },
  "school-uniforms": {
    title: "School Uniforms",
    eyebrow: "School Life",
    description:
      "A future guide for uniform requirements, supplier details, and approved school dress standards.",
    needed:
      "This page is being refreshed with uniform lists, supplier details, dress code guidelines, and approved images.",
  },
  "extra-curricular-activities": {
    title: "Extra-curricular Activities",
    eyebrow: "School Life",
    description:
      "A future overview of clubs, societies, sports, arts, competitions, trips, and student-life activities.",
    needed:
      "This page is being refreshed with clubs, societies, sports, arts, trips, competitions, and student-life activities.",
  },
  scholarships: {
    title: "Scholarships",
    eyebrow: "Admissions",
    description:
      "A future admissions page for scholarship opportunities, eligibility, deadlines, and application guidance.",
    needed:
      "This page is being refreshed with scholarship availability, eligibility criteria, application process, deadlines, and required documents.",
  },
  "staff-stories": {
    title: "Staff Stories",
    eyebrow: "Working at Merishaw",
    description:
      "A future space for staff profiles, quotes, photos, departments, and approved testimonials.",
    needed:
      "This page is being refreshed with staff profiles, quotes, photos, departments, and approved testimonials.",
  },
  "christian-life": {
    title: "Christian Life",
    eyebrow: "Working at Merishaw",
    description:
      "A future overview of chapel, discipleship, pastoral care, service, and the school's Christian foundation.",
    needed:
      "This page is being refreshed with approved copy about chapel, discipleship, pastoral care, service, and the school's Christian foundation.",
  },
  "career-opportunities": {
    title: "Career Opportunities",
    eyebrow: "Working at Merishaw",
    description:
      "A future page for current vacancies, application instructions, HR contact, and hiring information.",
    needed:
      "This page is being refreshed with current vacancies, application instructions, HR contact, and hiring information.",
  },
} as const;

export type ContentNeededSlug = keyof typeof contentNeededPages;
