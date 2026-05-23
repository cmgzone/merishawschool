export const siteConfig = {
  name: "Merishaw School",
  tagline: "Home of the Boy Child",
  description:
    "Merishaw School is a state-of-the-art residential boys' high school in Isinya, Kajiado County, focused on transforming boys into men of integrity and purpose.",
  url: "https://merishawschools.sc.ke",
  logo: "/images/merishaw-logo.png",
  logoLandscape: "/images/merishaw-logo-landscape.png",
  contact: {
    address: "Isinya Namanga Road",
    postal: "P.O. Box 27646-00100 Nairobi",
    phonePrimary: "0721 303 303",
    phoneSecondary: "0731 303 350",
    email: "enquiries@merishawschools.sc.ke",
  },
  socials: {
    facebook: "https://web.facebook.com/MerishawSchool",
    instagram: "https://www.instagram.com/merishawschool/",
    x: "https://twitter.com/MerishawSchool",
    youtube: "https://www.youtube.com/channel/UC_Ev7T9BY_9GyxFFckLwz0Q",
  },
  partners: [
    { name: "Partner Logo 1", logo: "", href: "" },
    { name: "Partner Logo 2", logo: "", href: "" },
    { name: "Partner Logo 3", logo: "", href: "" },
    { name: "Partner Logo 4", logo: "", href: "" },
  ],
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.9763029979285!2d36.84367297467117!3d-1.7411036982428307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182fc78b1fbd4825%3A0xf088a04f4550b5c!2sMerishaw%20School!5e0!3m2!1sen!2ske!4v1671699607906!5m2!1sen!2ske",
  sources: [
    "https://merishawschools.sc.ke/",
    "https://merishawschools.sc.ke/about-us",
    "https://merishawschools.sc.ke/curriculum",
    "https://merishawschools.sc.ke/our-pillars",
    "https://merishawschools.sc.ke/facilities",
    "https://merishawschools.sc.ke/mission-vision-and-values",
    "https://merishawschools.sc.ke/contactus",
  ],
};

export const stats = [
  { value: "Grade 7-12", label: "Junior and Senior Secondary" },
  { value: "8.4.4 + CBE", label: "Curriculum pathways" },
  { value: "Residential", label: "Boys' high school experience" },
];

export const seoDefaults = {
  titleTemplate: "%s | Merishaw School",
  defaultTitle: "Merishaw School | Home of the Boy Child",
  description: siteConfig.description,
};
