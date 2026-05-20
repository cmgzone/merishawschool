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
      { label: "Principal's Welcome Note", href: "/leadership" },
      { label: "Facilities", href: "/about" },
      { label: "Mission, Vision and Values", href: "/about" },
    ],
  },
  {
    label: "Academics",
    href: "/academics",
    children: [
      { label: "Curriculum", href: "/academics" },
      { label: "CBE Pathways", href: "/academics" },
      { label: "Six Pillars", href: "/academics" },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions",
    children: [
      { label: "Application Process", href: "/admissions" },
      { label: "Fees Structure", href: "/downloads" },
      { label: "Downloads", href: "/downloads" },
      { label: "Contact Admissions", href: "/contact" },
    ],
  },
  { label: "Leadership", href: "/leadership" },
  {
    label: "Gallery",
    href: "/gallery",
    children: [
      { label: "Pictures", href: "/gallery" },
      { label: "Videos", href: "/gallery" },
    ],
  },
  { label: "News", href: "/news" },
];

export const supportNavItem = {
  label: "Sponsor a Child",
  href: "/support-a-child",
};
