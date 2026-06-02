export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Academics", href: "/academics" },
  { label: "Infrastructure", href: "/infrastructure" },
  { label: "Admissions", href: "/admissions" },
  { label: "Sports", href: "/sports" },
  { label: "Clubs", href: "/clubs" },
  { label: "Gallery", href: "/gallery" },
  { label: "Downloads", href: "/downloads" },
  { label: "News & Events", href: "/news" },
];

export const navigationGroups = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "About Merishaw", href: "/about" },
      { label: "Leadership", href: "/leadership" },
      { label: "Mission, Vision and Values", href: "/about" },
    ],
  },
  {
    label: "Academics",
    href: "/academics",
    children: [
      { label: "8-4-4 Curriculum", href: "/academics/844" },
      { label: "CBE Pathways", href: "/academics" },
      { label: "Six Pillars", href: "/academics" },
      { label: "Our Classrooms", href: "/our-classrooms" },
      { label: "Science Block", href: "/science-block" },
      { label: "Aviation", href: "/aviation" },
      { label: "Workshop", href: "/workshop" },
      { label: "Robotics", href: "/robotics" },
      { label: "Resource Centre", href: "/resource-centre" },
      { label: "Languages", href: "/languages" },
      { label: "Art Gallery", href: "/art-gallery" },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions",
    children: [
      { label: "Application Process", href: "/admissions" },
      { label: "School Calendar", href: "/school-calendar" },
      { label: "Fees Structure", href: "/downloads" },
      { label: "Downloads", href: "/downloads" },
      { label: "Contact Admissions", href: "/contact" },
    ],
  },
  {
    label: "Infrastructure",
    href: "/infrastructure",
    children: [
      { label: "Architectural Concept", href: "/infrastructure" },
      { label: "Admin Block", href: "/admin-block" },
      { label: "GMAX", href: "/gmax" },
      { label: "Movie Theatre", href: "/movie-theatre" },
    ],
  },
  {
    label: "Extra-curricular Activities",
    children: [
      { label: "Sports", href: "/sports" },
      { label: "Clubs", href: "/clubs" },
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
  { label: "News & Events", href: "/news" },
];

export const supportNavItem = {
  label: "Sponsor a Child",
  href: "/support-a-child",
};

export const csrNavItem = {
  label: "CSR",
  href: "/csr",
};
