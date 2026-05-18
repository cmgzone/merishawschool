export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Academics", href: "/academics" },
  { label: "Admissions", href: "/admissions" },
  { label: "Leadership", href: "/leadership" },
  { label: "Gallery", href: "/gallery" },
  { label: "Downloads", href: "/downloads" },
  { label: "News", href: "/news" },
];

export const navigationGroups = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "About Merishaw", href: "/about" },
      { label: "A Word from Our Director", href: "/leadership" },
      { label: "Principal's Welcome Note", href: "/leadership" },
      { label: "Curriculum", href: "/academics" },
      { label: "Our Pillars", href: "/academics" },
      { label: "Facilities", href: "/about" },
      { label: "Mission, Vision and Values", href: "/about" },
      { label: "Educational Philosophy", href: "/educational-philosophy" },
      { label: "Governance", href: "/leadership" },
    ],
  },
  { label: "Academics", href: "/academics" },
  {
    label: "School Life",
    href: "/gallery",
    children: [
      { label: "School Calendar", href: "/school-calendar" },
      { label: "School News", href: "/news" },
      { label: "School Uniforms", href: "/school-uniforms" },
      { label: "Extra-curricular Activities", href: "/extra-curricular-activities" },
      { label: "Blog", href: "/news" },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions",
    children: [
      { label: "Application Process", href: "/admissions" },
      { label: "Application Form", href: "/admissions" },
      { label: "Fees Structure", href: "/downloads" },
      { label: "Scholarships", href: "/scholarships" },
      { label: "Downloads", href: "/downloads" },
    ],
  },
  {
    label: "Gallery",
    href: "/gallery",
    children: [
      { label: "Pictures", href: "/gallery" },
      { label: "Videos", href: "/gallery" },
    ],
  },
  {
    label: "Working at Merishaw",
    href: "/career-opportunities",
    children: [
      { label: "Staff Stories", href: "/staff-stories" },
      { label: "Christian Life", href: "/christian-life" },
      { label: "Career Opportunities", href: "/career-opportunities" },
    ],
  },
];

export const supportNavItem = {
  label: "Sponsor a Child",
  href: "/support-a-child",
};
