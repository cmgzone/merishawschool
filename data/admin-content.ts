import { unstable_noStore as noStore } from "next/cache";
import { promises as fs } from "node:fs";
import path from "node:path";
import {
  academicPrograms,
  academicExperiencePages,
  cbeCompetencies,
  cbeOverview,
  cbePathways,
  cbeStages,
  curriculumTransition,
  facilities,
  legacy844Principles,
  pillars,
  values,
} from "@/data/academics";
import { contentNeededPages } from "@/data/content-needed";
import { downloads } from "@/data/downloads";
import { galleryImages, heroSlides, showcaseSlides } from "@/data/gallery";
import {
  admissionsProcess,
  whoWeAreHighlights,
  whyChooseMerishaw,
} from "@/data/home";
import {
  architecturalInspirations,
  conceptIntro,
  infrastructureHero,
  infrastructureStats,
  maasaiContext,
  masterPlanLayers,
  siteLocation,
  sustainabilityStrategies,
} from "@/data/infrastructure";
import {
  boardMembers,
  principal,
  seniorManagement,
  studentCouncil,
  studentLeaders,
} from "@/data/leadership";
import { newsItems, type NewsArticle } from "@/data/news";
import { siteConfig, stats } from "@/data/site";
import { csrInitiatives, supportContent } from "@/data/support";

export type EditableContact = {
  address: string;
  postal: string;
  phonePrimary: string;
  phoneSecondary: string;
  email: string;
};

export type EditableSocials = {
  facebook: string;
  instagram: string;
  x: string;
  youtube: string;
};

export type EditablePartner = {
  name: string;
  logo: string;
  href: string;
};

export type EditableButtonAction = {
  href: string;
  label: string;
};

export type EditableSite = {
  name: string;
  tagline: string;
  description: string;
  url: string;
  logo: string;
  logoLandscape: string;
  contact: EditableContact;
  socials: EditableSocials;
  partners: EditablePartner[];
  mapEmbed: string;
  tawkEmbedUrl: string;
  tawkPropertyId: string;
  tawkWidgetId: string;
};

export type EditableStat = {
  value: string;
  label: string;
};

export type EditableTextCard = {
  title: string;
  description: string;
};

export type EditableImageCard = EditableTextCard & {
  image: string;
  imageAlt: string;
};

export type EditableImageItem = {
  src: string;
  alt: string;
  className?: string;
};

export type EditableTitledImageItem = EditableImageItem & {
  title: string;
};

export type EditableSlide = {
  eyebrow?: string;
  eyebrowStyle?: "featured" | "label";
  title: string;
  description: string;
  image: string;
  alt: string;
  imagePosition?: string;
};

export type EditableGalleryImage = {
  src: string;
  alt: string;
  category: string;
};

export type EditableAcademicProgram = {
  title: string;
  eyebrow: string;
  description: string;
};

export type EditablePillar = {
  title: string;
  image: string;
  imageAlt: string;
  description: string;
};

export type EditableValue = {
  letter: string;
  label: string;
};

export type EditableNewsItem = {
  slug?: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  category: string;
  article?: NewsArticle;
};

export type EditableLeadershipPerson = {
  name: string;
  role: string;
  image: string;
  description: string;
};

export type EditableLeader = EditableLeadershipPerson;

export type EditableStudentCouncilMember = {
  role: string;
  quote: string;
};

export type EditablePageHeader = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imagePosition?: string;
};

export type EditableSectionIntro = {
  eyebrow: string;
  title: string;
  description: string;
};

export type EditableMediaSection = EditableSectionIntro & {
  image: string;
  imageAlt: string;
  imagePosition?: string;
  primaryAction?: EditableButtonAction;
  secondaryAction?: EditableButtonAction;
};

export type EditableParagraphSection = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  primaryAction?: EditableButtonAction;
  secondaryAction?: EditableButtonAction;
};

export type EditableCTA = {
  eyebrow: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
};

export type EditableAdmissionsStep = {
  step: string;
  title: string;
  description: string;
  note: string;
};

export type EditableDownloadItem = {
  title: string;
  description: string;
  href: string;
  type: string;
  isLocal?: boolean;
  needsClientApproval?: boolean;
};

export type EditableComingSoonPage = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  needed: string;
  image: string;
};

export type EditableSupportContent = {
  title: string;
  description: string;
  note: string;
};

export type EditableAcademicExperiencePage = {
  title: string;
  eyebrow: string;
  description: string;
  heroImage?: string;
  introEyebrow: string;
  introTitle: string;
  introDescription: string;
  introPrimaryAction: EditableButtonAction;
  introSecondaryAction: EditableButtonAction;
  highlightsIntro: EditableSectionIntro;
  highlights: EditableTextCard[];
  galleryIntro: EditableSectionIntro;
  photos: EditableImageItem[];
  cta: EditableCTA;
};

export type EditableContent = {
  version: number;
  updatedAt: string | null;
  site: EditableSite;
  home: {
    heroSlides: EditableSlide[];
    stats: EditableStat[];
    highlights: EditableStat[];
    whyChoose: EditableTextCard[];
  };
  pages: {
    home: EditablePageHeader;
    about: EditablePageHeader;
    academics: EditablePageHeader;
    legacy844: EditablePageHeader;
    admissions: EditablePageHeader;
    aviation: EditablePageHeader;
    clubs: EditablePageHeader;
    csr: EditablePageHeader;
    infrastructure: EditablePageHeader;
    leadership: EditablePageHeader;
    gallery: EditablePageHeader;
    downloads: EditablePageHeader;
    foundersVision: EditablePageHeader;
    news: EditablePageHeader;
    sports: EditablePageHeader;
    contact: EditablePageHeader;
    support: EditablePageHeader;
    comingSoon: EditableComingSoonPage[];
  };
  about: {
    overview: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      image: string;
      imageAlt: string;
    };
    vision: string;
    mission: string;
    values: EditableValue[];
    valuesIntro: EditableSectionIntro;
    developmentPillarsIntro: EditableSectionIntro;
    developmentPillars: EditableTextCard[];
    architecture: {
      eyebrow: string;
      title: string;
      description: string;
      image: string;
      imageAlt: string;
    };
  };
  academics: {
    cbeIntro: EditableSectionIntro;
    learningInAction: (EditableImageCard & { className?: string })[];
    cbeOverview: {
      eyebrow: string;
      title: string;
      description: string;
      noteEyebrow: string;
      note: string;
      primaryAction: EditableButtonAction;
      secondaryAction: EditableButtonAction;
    };
    cbeStages: EditableTextCard[];
    pathwaysIntro: EditableSectionIntro;
    competenciesIntro: EditableSectionIntro;
    programs: EditableAcademicProgram[];
    cbePathways: string[];
    cbeCompetencies: string[];
    pillars: EditablePillar[];
    facilities: string[];
  };
  academicExperiences: Record<string, EditableAcademicExperiencePage>;
  admissions: {
    applicationIntro: EditableSectionIntro;
    applicationFields: string[];
    processIntro: EditableSectionIntro;
    processPrepTitle: string;
    processPrepDescription: string;
    process: EditableAdmissionsStep[];
    feesEyebrow: string;
    feesTitle: string;
    feesPrimaryAction: EditableButtonAction;
    feesSecondaryAction: EditableButtonAction;
    cta: EditableCTA;
  };
  aviation: {
    intro: EditableMediaSection;
    highlightsIntro: EditableSectionIntro;
    highlights: EditableTextCard[];
    galleryIntro: EditableSectionIntro;
    gallery: EditableImageItem[];
    cta: EditableCTA;
  };
  clubs: {
    intro: EditableMediaSection;
    highlightsIntro: EditableSectionIntro;
    highlights: EditableTextCard[];
    featured: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      callout: string;
      themeEyebrow: string;
      themeTitle: string;
      progressionEyebrow: string;
      progressionDescription: string;
      note: string;
      image: string;
      imageAlt: string;
    };
    signatureIntro: EditableSectionIntro;
    signatureClubs: EditableTextCard[];
    additionalClubs: {
      eyebrow: string;
      title: string;
      groups: EditableTextCard[];
    };
    galleryIntro: EditableSectionIntro;
    gallery: EditableImageItem[];
    cta: EditableCTA;
  };
  csr: {
    body: {
      title: string;
      paragraphs: string[];
    };
    initiativesIntro: EditableSectionIntro;
    initiatives: EditableTextCard[];
    cta: EditableCTA;
  };
  downloads: {
    sectionIntro: EditableSectionIntro;
    items: EditableDownloadItem[];
    note: string;
  };
  infrastructure: {
    concept: EditableParagraphSection;
    stats: EditableStat[];
    siteLocation: EditableParagraphSection;
    architecturalIntro: EditableSectionIntro;
    architecturalInspirations: EditableTextCard[];
    sustainabilityIntro: EditableSectionIntro;
    sustainabilityStrategies: string[];
    maasai: EditableParagraphSection;
    masterPlanIntro: EditableSectionIntro;
    masterPlanLayers: EditableTextCard[];
    visitCta: EditableCTA;
  };
  legacy844: {
    transition: EditableSectionIntro & {
      primaryAction: EditableButtonAction;
      secondaryAction: EditableButtonAction;
    };
    highlights: string[];
    principlesIntro: EditableSectionIntro;
    principles: EditableTextCard[];
    cta: EditableCTA;
  };
  sports: {
    intro: EditableMediaSection;
    programmeIntro: EditableSectionIntro;
    programmes: EditableImageCard[];
    coaching: EditableMediaSection;
    coachingValues: string[];
    galleryIntro: EditableSectionIntro;
    gallery: EditableImageItem[];
    cta: EditableCTA;
  };
  contact: {
    sectionIntro: EditableSectionIntro;
  };
  gallery: {
    images: EditableGalleryImage[];
    showcaseSlides: EditableSlide[];
  };
  news: {
    items: EditableNewsItem[];
  };
  leadership: {
    boardMembers: EditableLeadershipPerson[];
    principal: EditableLeadershipPerson;
    seniorManagement: EditableLeadershipPerson[];
    studentCouncil: EditableLeadershipPerson[];
    studentLeaders: EditableLeadershipPerson[];
  };
  support: {
    content: EditableSupportContent;
    sectionPrimaryAction: EditableButtonAction;
    sectionSecondaryAction: EditableButtonAction;
    sponsorshipIntro: EditableSectionIntro;
    sponsorshipAreas: string[];
    initiativesIntro: EditableSectionIntro;
    initiatives: string[];
    cta: EditableCTA;
  };
  foundersVision: {
    intro: EditableSectionIntro & {
      quote: string;
      primaryAction: EditableButtonAction;
      secondaryAction: EditableButtonAction;
    };
    paragraphs: string[];
  };
  homeVideo: {
    eyebrow: string;
    title: string;
    description: string;
    embedUrl: string;
    videoTitle: string;
    primaryAction: EditableButtonAction;
    secondaryAction: EditableButtonAction;
  };
};

const contentFile = path.join(process.cwd(), "data", "admin-content.json");

const aboutDevelopmentPillars = [
  {
    title: "Spiritual Well-Being",
    description:
      "Promotes godly character, respect for diversity, and a strong sense of faith to guide boys away from societal ills.",
  },
  {
    title: "Digital Literacy",
    description:
      "Embeds critical 21st-century technological skills into the curriculum, preparing students for the demands of the digital age.",
  },
  {
    title: "Sports and Talents",
    description:
      "Cultivates extracurricular capabilities through diverse offerings, ranging from traditional sports such as soccer and basketball to unconventional activities such as fencing and golf.",
  },
  {
    title: "Social and Collaboration",
    description:
      "Focuses on community outreach, corporate social responsibility, and exchange programs such as AFS Kenya.",
  },
  {
    title: "STEM & Expanded Curriculum",
    description:
      "Fosters cross-disciplinary learning by integrating science, technology, engineering, and mathematics alongside vocational and technical skills.",
  },
];

const learningInActionDefaults = [
  {
    title: "Robotics and coding",
    description:
      "Students build, test, troubleshoot, and refine ideas through practical technology projects.",
    image: "/images/academics-robotics-soldering.jpeg",
    imageAlt:
      "Merishaw School student soldering a robotics component during a hands-on technology session",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Agriculture",
    description:
      "The school garden turns science, enterprise, and care for the environment into lived experience.",
    image: "/images/academics-agriculture.jpeg",
    imageAlt:
      "Merishaw School students learning practical agriculture skills in the school garden",
    className: "",
  },
  {
    title: "Science laboratory",
    description:
      "Laboratory sessions create space for observation, experimentation, and confident inquiry.",
    image: "/images/academics-science-lab.jpeg",
    imageAlt:
      "Merishaw School students conducting a practical experiment in the science laboratory",
    className: "",
  },
  {
    title: "Engineering workshop",
    description:
      "Practical workshop exposure develops care, problem-solving, and respect for skilled work.",
    image: "/images/academics-engineering-workshop.jpeg",
    imageAlt:
      "Merishaw School student wearing protective equipment during an engineering workshop activity",
    className: "",
  },
  {
    title: "Focused learning",
    description:
      "Structured classroom routines support concentration, participation, and academic progress.",
    image: "/images/academics-engaged-classroom.jpeg",
    imageAlt:
      "Merishaw School student raising his hand during a classroom lesson",
    className: "",
  },
];

const sportsProgrammes = [
  {
    title: "Soccer Academy",
    description:
      "Training and competitive play develop technique, fitness, decision-making, teamwork, and composure under pressure.",
    image: "/images/sports-soccer-match.jpeg",
    imageAlt: "Merishaw Soccer Academy students competing for the ball",
  },
  {
    title: "Swimming",
    description:
      "Pool sessions help students build endurance, water confidence, stroke technique, discipline, and personal resilience.",
    image: "/images/sports-swimming-butterfly.jpeg",
    imageAlt: "Merishaw School swimmer practising butterfly stroke",
  },
  {
    title: "Lacrosse",
    description:
      "Lacrosse introduces students to pace, coordination, tactical awareness, and a team sport with growing international reach.",
    image: "/images/sports-lacrosse-match.jpeg",
    imageAlt: "Merishaw School students playing lacrosse on the field",
  },
];

const sportsGallery = [
  {
    src: "/images/sports-soccer-match.jpeg",
    alt: "Merishaw Soccer Academy students competing for the ball",
  },
  {
    src: "/images/gallery-soccer-academy.jpeg",
    alt: "Merishaw Soccer Academy student driving forward with the ball",
  },
  {
    src: "/images/sports-lacrosse-passing.jpeg",
    alt: "Merishaw School lacrosse students preparing a pass",
  },
  {
    src: "/images/sports-lacrosse-match.jpeg",
    alt: "Merishaw School students playing lacrosse on the field",
  },
  {
    src: "/images/sports-swimming-butterfly.jpeg",
    alt: "Merishaw School swimmer practising butterfly stroke",
  },
  {
    src: "/images/sports-swimming-breaststroke.jpeg",
    alt: "Merishaw School swimmer practising breaststroke",
  },
  {
    src: "/images/sports-swimming-training.jpeg",
    alt: "Merishaw School swimmer training in a pool lane",
  },
  {
    src: "/images/sports-swimming-freestyle.jpeg",
    alt: "Merishaw School swimmer practising freestyle in a pool lane",
  },
];

const clubHighlights = [
  {
    title: "Chess Club",
    description:
      "Chess gives students a structured space for concentration, patience, strategy, foresight, and thoughtful decision-making.",
  },
  {
    title: "Table Tennis",
    description:
      "Fast-paced rallies encourage coordination, reflexes, focus, and friendly competition in the indoor activity space.",
  },
  {
    title: "Badminton",
    description:
      "Badminton develops movement, agility, consistency, and confidence through regular practice and match play.",
  },
  {
    title: "Student Interests",
    description:
      "Clubs help boys explore interests, practise leadership, and build friendships beyond the classroom timetable.",
  },
  {
    title: "World Scholar's Cup",
    description:
      "Academic competitions and conferences celebrate the joy of learning while encouraging students to discover new strengths.",
  },
];

const clubPhotos = [
  {
    src: "/images/academics-robotics-circuit.jpeg",
    alt: "Merishaw School student testing a robotics circuit during a practical STEM activity",
    className: "sm:col-span-2",
  },
  {
    src: "/images/academics-agriculture.jpeg",
    alt: "Merishaw School students learning practical agriculture skills in the school garden",
    className: "",
  },
  {
    src: "/images/clubs-music-drums.jpeg",
    alt: "Drum kit ready for Merishaw School music and talent development activities",
    className: "",
  },
  {
    src: "/images/clubs-table-tennis.jpeg",
    alt: "Merishaw School students playing table tennis",
    className: "sm:col-span-2",
  },
  {
    src: "/images/clubs-badminton-court.jpeg",
    alt: "Merishaw School student playing badminton on the indoor court",
    className: "",
  },
  {
    src: "/images/clubs-badminton-serve.jpeg",
    alt: "Merishaw School student preparing a badminton serve",
    className: "",
  },
];

const signatureClubs = [
  {
    title: "The Omanyala Sprint Club",
    description:
      "Launched in partnership with Africa's fastest man, Ferdinand Omanyala, to nurture grassroots sprint talent.",
  },
  {
    title: "Merishaw Drift Club",
    description:
      "A first-of-its-kind school motorsport and drift club in the country, providing practical exposure through garages and driving experts.",
  },
  {
    title: "STEM Club",
    description:
      "Science, technology, engineering, and mathematics come alive through hands-on competitions and projects.",
  },
];

const clubDirectories = [
  {
    title: "Academic and creative",
    description: "Art Club, Wildlife Club, Journalism Club, and Languages Club",
  },
  {
    title: "Service and leadership",
    description: "Scouts Club, St. John, and Red Cross",
  },
  {
    title: "Faith societies",
    description: "Christian Union (CU) and Young Christian Society (YCS)",
  },
];

const aviationHighlights = [
  {
    title: "Aircraft familiarization",
    description:
      "Students encounter aircraft systems, cockpit instruments, and the practical language of aviation in a guided setting.",
  },
  {
    title: "Career awareness",
    description:
      "Exposure to aviation helps boys connect classroom curiosity with future pathways in flight, engineering, and related fields.",
  },
  {
    title: "Technical curiosity",
    description:
      "Close-up learning moments encourage questions, observation, and a deeper interest in how aircraft operate.",
  },
  {
    title: "Confidence and teamwork",
    description:
      "Shared experiences give students room to learn together, listen carefully, and imagine ambitious futures.",
  },
];

const aviationPhotos = [
  {
    src: "/images/aviation-group-briefing.jpeg",
    alt: "Merishaw School aviation students receiving a briefing beside an aircraft",
    className: "sm:col-span-2 lg:col-span-2",
  },
  {
    src: "/images/aviation-student-controls.jpeg",
    alt: "Merishaw School aviation student learning at the aircraft controls",
    className: "",
  },
  {
    src: "/images/aviation-aircraft-propeller.jpeg",
    alt: "Merishaw School aviation students examining an aircraft propeller",
    className: "",
  },
  {
    src: "/images/aviation-technical-briefing.jpeg",
    alt: "Merishaw School aviation students listening to a technical briefing",
    className: "sm:col-span-2",
  },
  {
    src: "/images/aviation-cockpit-selfie.jpeg",
    alt: "A Merishaw School student and aviation mentor inside an aircraft",
    className: "",
  },
  {
    src: "/images/aviation-cockpit-introduction.jpeg",
    alt: "Merishaw School aviation student exploring an aircraft cockpit",
    className: "",
  },
  {
    src: "/images/aviation-student-flight.jpeg",
    alt: "Merishaw School aviation student observing the cockpit instruments",
    className: "",
  },
];

const csrInitiativeCards = [
  {
    title: "Outreach Programs",
    description:
      "Students and the Merishaw community regularly volunteer at local centers, spreading joy and donations to organizations such as the Kajiado Children's Home.",
  },
  {
    title: "Values & Integrity",
    description:
      "The school's spiritual and counseling teams guide the boys to cultivate a spirit of empathy, humility, and compassion through community service.",
  },
  {
    title: "Life Skills",
    description:
      "The Community Service Learning program, featured in the Competency-Based Curriculum, equips learners with practical life skills, including citizenship, entrepreneurship, and civic responsibility.",
  },
];

const sponsorshipAreas = [
  "Tuition and learning support",
  "Boarding and student-life needs",
  "Uniforms, books, and essential supplies",
  "Mentorship, wellness, and holistic development",
];

const foundersVisionParagraphs = [
  "I am a proud son of teachers, and I believe the seed for Merishaw School was nurtured in me from an early age. The journey I embarked on has been driven by deep conviction and passionate commitment to bridge the growing gap in academic performance, welfare, and the leadership role of the boy child. The journey has not been devoid of curve balls and challenges, but keeping my eyes on the prize has kept my team motivated and committed to achieving a vision that will outlast us and many generations to come.",
  "My vision is to develop a critical mass of young men, Morans, equipped with the skills, character, and knowledge to create a sustained and continuously escalating spin-off effect that changes society and the world as a whole through the boy child.",
  "Our success in gaining milestones has inspired me to transform retrospective pride into a strategic compass, turning yesterday's victories into the creative fuel and momentum needed for tomorrow's boldest goals.",
  "It has elevated my understanding of success by embracing a mindful, forward-looking practice that goes beyond the surface, valuing moments when we must pivot direction and be prepared for uncharted challenges.",
];

const academicExperienceDefaults = Object.fromEntries(
  Object.entries(academicExperiencePages).map(([slug, page]) => [
    slug,
    {
      title: page.title,
      eyebrow: page.eyebrow,
      description: page.description,
      heroImage: "heroImage" in page ? page.heroImage : "",
      introEyebrow: "Learning experience",
      introTitle: page.introTitle,
      introDescription: page.introDescription,
      introPrimaryAction: {
        href: "/academics",
        label: "Explore Academics",
      },
      introSecondaryAction: {
        href: "/contact",
        label: "Plan a Visit",
      },
      highlightsIntro: {
        eyebrow: "What students develop",
        title: "Practical experiences that strengthen learning habits.",
        description:
          "Each experience gives boys another way to build confidence, responsibility, curiosity, and a sense of purpose.",
      },
      highlights: page.highlights.map((highlight) => ({ ...highlight })),
      galleryIntro: {
        eyebrow: "Inside the experience",
        title: "Spaces and moments that make learning visible.",
        description:
          "A closer look at the environment supporting student curiosity, skill, and steady growth.",
      },
      photos: page.photos.map((photo) => ({ ...photo })),
      cta: {
        eyebrow: "Admissions",
        title: "Explore a learning environment built for the whole boy.",
        description:
          "Speak with the school team about academics, student opportunities, curriculum pathways, and planning a visit.",
        primaryHref: "/admissions",
        primaryLabel: "Start Admissions",
        secondaryHref: "/contact",
        secondaryLabel: "Contact School",
      },
    },
  ]),
) as Record<string, EditableAcademicExperiencePage>;

export const defaultAdminContent: EditableContent = {
  version: 1,
  updatedAt: null,
  site: {
    name: siteConfig.name,
    tagline: siteConfig.tagline,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: siteConfig.logo,
    logoLandscape: siteConfig.logoLandscape,
    contact: { ...siteConfig.contact },
    socials: { ...siteConfig.socials },
    partners: siteConfig.partners.map((partner) => ({ ...partner })),
    mapEmbed: siteConfig.mapEmbed,
    tawkEmbedUrl: "",
    tawkPropertyId: "",
    tawkWidgetId: "",
  },
  home: {
    heroSlides: heroSlides.map((slide) => ({ ...slide })),
    stats: stats.map((stat) => ({ ...stat })),
    highlights: whoWeAreHighlights.map((highlight) => ({ ...highlight })),
    whyChoose: whyChooseMerishaw.map((item) => ({ ...item })),
  },
  pages: {
    home: {
      eyebrow: "Merishaw School",
      title: "A campus built for ambition, discipline, and purpose.",
      description:
        "A premium residential boys' school experience in Isinya, shaped by academics, mentorship, faith, sports, creativity, and leadership.",
      image: "/images/hero-tuition-block.png",
    },
    about: {
      eyebrow: "About Us",
      title: "Transforming boys into men of purpose.",
      description:
        "Merishaw School is the Home of the Boy Child, a Maasai-homestead-inspired residential school nurturing boys into confident, principled Morans.",
      image: "/images/resource-centre.jpeg",
    },
    academics: {
      eyebrow: "Academics",
      title: "Learning pathways that prepare boys for national and global success.",
      description:
        "Merishaw strengthens Competency-Based Education with facilities, resources, and infrastructure optimized for CBE.",
      image: "/images/hero-tuition-block.png",
    },
    legacy844: {
      eyebrow: "8-4-4 Curriculum",
      title: "Focused support for Form 3 and Form 4 cohorts.",
      description:
        "A dedicated page for Merishaw learners completing the final 8-4-4 pathway with confidence, care, and preparation for the next step.",
      image: "/images/hero-tuition-block.png",
    },
    admissions: {
      eyebrow: "Admissions",
      title: "Begin your son's Merishaw journey.",
      description:
        "A clear starting point for parents exploring curriculum options, grade placement, fees, and school visits.",
      image: "/images/gallery-parade-grounds.png",
    },
    aviation: {
      eyebrow: "Academics / Aviation",
      title: "Aviation exposure that turns curiosity into possibility.",
      description:
        "Students step closer to the world of flight through guided aircraft visits, cockpit familiarization, technical conversations, and career awareness.",
      image: "/images/aviation-group-briefing.jpeg",
      imagePosition: "center 48%",
    },
    clubs: {
      eyebrow: "Extra-curricular Activities",
      title: "Clubs that create room for strategy, skill, and friendship.",
      description:
        "The World Scholar's Cup, chess, table tennis, badminton, and wider student interests give boys more ways to grow beyond the classroom.",
      image: "/images/world-scholars-conference-attendance.jpeg",
      imagePosition: "center 42%",
    },
    csr: {
      eyebrow: "Community Impact",
      title: "CSR",
      description: "Corporate Social Responsibility at Merishaw School.",
      image: "/images/gallery-unicaf-partnership.jpeg",
    },
    infrastructure: {
      eyebrow: infrastructureHero.eyebrow,
      title: infrastructureHero.title,
      description: infrastructureHero.description,
      image: infrastructureHero.image,
    },
    leadership: {
      eyebrow: "Leadership",
      title: "Leadership rooted in mentorship, growth, and accountability.",
      description:
        "Meet the leadership voice shaping the culture, mentorship, and student formation at Merishaw.",
      image: "/images/principal-mr-aringo.jpeg",
    },
    gallery: {
      eyebrow: "Gallery",
      title: "Campus, facilities, and student life at Merishaw.",
      description:
        "Explore a cleaner visual tour of the learning spaces, boarding environment, sports grounds, and student-life moments.",
      image: "/images/gallery-aerial-campus.jpg",
    },
    downloads: {
      eyebrow: "Downloads",
      title: "Fees structure and school downloads.",
      description: "Key parent documents organized in one clear place.",
      image: "/images/merishaw-bg.jpeg",
    },
    foundersVision: {
      eyebrow: "About Us",
      title: "Our Founder's Vision",
      description:
        "A visionary journey turning boys into men of purpose and integrity.",
      image: "/images/campus-life.jpg",
    },
    news: {
      eyebrow: "News & Events",
      title: "Merishaw School news and events.",
      description:
        "Highlights from academics, sport, student life, events, and school community moments.",
      image: "/images/news-stem.jpg",
    },
    sports: {
      eyebrow: "Extra-curricular Activities",
      title: "Sport that develops discipline, teamwork, and a winning mentality.",
      description:
        "Merishaw gives boys room to compete, train, and grow through soccer, swimming, lacrosse, and a wider culture of active participation.",
      image: "/images/sports-soccer-match.jpeg",
      imagePosition: "center 54%",
    },
    contact: {
      eyebrow: "Contact",
      title: "Contact Merishaw School.",
      description:
        "Reach the school for admissions, visits, downloads, support enquiries, or general questions.",
      image: "/images/resource-centre.jpeg",
    },
    support: {
      eyebrow: "CSR / Support",
      title: "Support a deserving boy's education journey.",
      description:
        "A professional sponsorship pathway for partners who want to help a learner access Merishaw's values-led residential education.",
      image: "/images/campus-life.jpg",
    },
    comingSoon: Object.entries(contentNeededPages).map(([slug, page]) => ({
      slug,
      title: page.title,
      eyebrow: page.eyebrow,
      description: page.description,
      needed: page.needed,
      image:
        slug === "gmax"
          ? "/images/gmax-facility.jpeg"
          : "/images/resource-centre.jpeg",
    })),
  },
  about: {
    overview: {
      eyebrow: "About Merishaw",
      title: "A home where the seed of greatness is protected and nurtured.",
      paragraphs: [
        "The dream of every parent is that their son becomes a pillar of society. At Merishaw School, we believe that the circumstances in which one is born do not determine their future. We believe that in every child there is a God-given seed of greatness.",
        "However, this seed can be placed at risk at any stage of growth through negative influence and harmful environmental exposure.",
        "The Vision Bearer of Merishaw School identified the expanding gap in access to quality education for the boy child, alongside deteriorating performance and increasing dropout rates.",
        "To address this problem, he invested heavily in the establishment of Merishaw School. The school was conceptualized and designed around the Maasai homestead, bringing to life a nexus of home and school: the Home of the Boy Child.",
        "The name Merishaw was adapted from the rite of passage process implemented by the Maasai community for boys aged between 9 and 15 years, called il-mirisho, which means Conqueror.",
        "In the spirit of this meaning, Merishaw School identifies itself as the place where boys are nurtured and transformed into Morans, standing tall in society and proud of self.",
        "At the core of our mission is an environment that builds men of confidence, moulds boys into men of integrity, develops talents and sports as diverse career pathways, develops global leaders and inspired entrepreneurs, and prepares young men to harness new technologies for the good of humanity.",
        "Our singular vision is transforming boys into men of purpose. Welcome to Merishaw, Home of the Boy Child.",
      ],
      image: "/images/campus-life.jpg",
      imageAlt: "Merishaw School campus life",
    },
    vision:
      "An extraordinary journey developing men of valor who are well-rounded, confident, and socially responsible, who succeed in a rapidly changing world and impact society in a transformative way.",
    mission:
      "Provide our students with the best internationally recognized competency-based curriculum education, preparing them for world-class universities of their choice. Apply critical pedagogy in a collaborative learning environment that inspires self-confidence and encourages hands-on experience, independent study, and research projects, while developing students' creativity and critical thinking skills.",
    values: values.map((value) => ({ ...value })),
    valuesIntro: {
      eyebrow: "Core Values",
      title: "The MERISHAW acronym.",
      description: "",
    },
    developmentPillarsIntro: {
      eyebrow: "Values in Practice",
      title: "Core educational and development pillars.",
      description:
        "These values are integrated into Merishaw's core educational and development pillars.",
    },
    developmentPillars: aboutDevelopmentPillars.map((pillar) => ({
      ...pillar,
    })),
    architecture: {
      eyebrow: "Architectural concept",
      title: "Designed around the Maasai homestead.",
      description:
        "Merishaw was conceptualized as a nexus of home and school, a campus that gives boys belonging, structure, protection, and the confidence to grow as Morans.",
      image: "/images/gallery-aerial-campus.jpg",
      imageAlt: "Aerial view of Merishaw School",
    },
  },
  academics: {
    cbeIntro: {
      eyebrow: "CBE learning",
      title: "A competency-based academic foundation.",
      description:
        "The academic model strengthens practical skills, core values, continuous assessment, mentorship, and preparation for future-ready pathways.",
    },
    learningInAction: learningInActionDefaults.map((item) => ({ ...item })),
    cbeOverview: {
      eyebrow: "CBE / CBC",
      title: cbeOverview.title,
      description: cbeOverview.description,
      noteEyebrow: "CBE-ready facilities",
      note: cbeOverview.facilitiesNote,
      primaryAction: {
        href: "/admissions",
        label: "Admissions Enquiry",
      },
      secondaryAction: {
        href: "/infrastructure",
        label: "View Infrastructure",
      },
    },
    cbeStages: cbeStages.map((stage) => ({ ...stage })),
    pathwaysIntro: {
      eyebrow: "Senior school pathways",
      title: "Room for strengths, talents, and aspirations.",
      description:
        "At Senior School, learners specialize based on their abilities and interests across three primary pathways.",
    },
    competenciesIntro: {
      eyebrow: "Core competencies",
      title: "Competencies that support lifelong learning.",
      description:
        "These competencies support critical thinking, collaboration, creativity, and confident lifelong learning.",
    },
    programs: academicPrograms.map((program) => ({ ...program })),
    cbePathways: [...cbePathways],
    cbeCompetencies: [...cbeCompetencies],
    pillars: pillars.map((pillar) => ({ ...pillar })),
    facilities: [...facilities],
  },
  academicExperiences: academicExperienceDefaults,
  admissions: {
    applicationIntro: {
      eyebrow: "Application enquiry",
      title: "Start with the information admissions needs most.",
      description:
        "Parents can prepare contact details, student details, curriculum preference, and the intended grade or form before speaking with the school.",
    },
    applicationFields: [
      "Parent's full name",
      "Student's full name",
      "Parent's phone number",
      "Parent's email",
      "Curriculum preference: 8.4.4 or CBE",
      "8.4.4 options: Form 3 or Form 4",
      "CBE options: Grade 8, Grade 9, or Grade 10",
    ],
    processIntro: {
      eyebrow: "Admissions Process",
      title: "A calm, clear path from enquiry to joining.",
      description:
        "Parents get a simple journey: enquire, share student details, review requirements, then plan the next step with the school.",
    },
    processPrepTitle: "What to prepare",
    processPrepDescription:
      "Have parent contact details, student information, preferred curriculum, intended grade or form, and any recent academic records ready for the admissions conversation.",
    process: admissionsProcess.map((step) => ({ ...step })),
    feesEyebrow: "Fees and forms",
    feesTitle: "Review the current fee structure.",
    feesPrimaryAction: {
      href: "/downloads",
      label: "Downloads",
    },
    feesSecondaryAction: {
      href: "/contact",
      label: "Ask a Question",
    },
    cta: {
      eyebrow: "Visit or enquire",
      title: "Admissions conversations are handled directly by the school.",
      description:
        "Use the contact page to reach Merishaw School by phone, email, or enquiry form.",
      primaryHref: "/contact",
      primaryLabel: "Contact Admissions",
      secondaryHref: "/academics",
      secondaryLabel: "View Academics",
    },
  },
  aviation: {
    intro: {
      eyebrow: "Learning beyond the classroom",
      title: "Give ambition a real-world point of reference.",
      description:
        "Merishaw's aviation exposure introduces learners to aircraft, technical environments, and the people who work within them. These practical encounters help boys ask better questions, build confidence, and see how academic effort can connect to future possibilities.",
      image: "/images/aviation-student-controls.jpeg",
      imageAlt: "Merishaw School aviation student learning at the aircraft controls",
    },
    highlightsIntro: {
      eyebrow: "Aviation experience",
      title:
        "Practical exposure shaped around curiosity, confidence, and future pathways.",
      description:
        "The experience gives learners a closer view of aviation while reinforcing the habits that support wider academic and personal growth.",
    },
    highlights: aviationHighlights.map((highlight) => ({ ...highlight })),
    galleryIntro: {
      eyebrow: "Aviation gallery",
      title: "A closer look at the learning experience.",
      description:
        "Students explore aircraft, cockpit environments, and guided technical conversations during aviation exposure activities.",
    },
    gallery: aviationPhotos.map((photo) => ({ ...photo })),
    cta: {
      eyebrow: "Admissions",
      title: "Discover the wider Merishaw learning experience.",
      description:
        "Speak with the school team about admissions, curriculum pathways, student opportunities, and planning a school visit.",
      primaryHref: "/admissions",
      primaryLabel: "Start Admissions",
      secondaryHref: "/contact",
      secondaryLabel: "Contact School",
    },
  },
  clubs: {
    intro: {
      eyebrow: "Student interests",
      title: "Strong school life includes time to think, practise, and connect.",
      description:
        "Club activities give students a healthy balance alongside academics, boarding routines, and sport. The World Scholar's Cup adds an academic competition and conference experience, chess introduces strategic thinking, and indoor activities create space for regular practice and friendly competition.",
      image: "/images/clubs-badminton-court.jpeg",
      imageAlt: "Merishaw School student playing badminton on the indoor court",
      primaryAction: {
        href: "/sports",
        label: "Explore Sports",
      },
      secondaryAction: {
        href: "/contact",
        label: "Contact School",
      },
    },
    highlightsIntro: {
      eyebrow: "Clubs and activities",
      title: "Different interests. Valuable habits.",
      description:
        "Clubs give boys space to focus, collaborate, discover new strengths, and enjoy purposeful time together.",
    },
    highlights: clubHighlights.map((highlight) => ({ ...highlight })),
    featured: {
      eyebrow: "Featured club",
      title: "World Scholar's Cup",
      paragraphs: [
        "Merishaw School is a proud host and participant in the World Scholar's Cup. The school regularly hosts the Rift Valley Regional Rounds and sends strong delegations of scholars to international events.",
        "The experience celebrates the joy of learning while motivating students not only to demonstrate their existing strengths, but also to discover new ones.",
      ],
      callout:
        "World Scholar's creates a unique academic competition and conference experience: a celebration of learning, teamwork, and the confidence to try something new.",
      themeEyebrow: "2026 theme",
      themeTitle: "Are We There Yet?",
      progressionEyebrow: "Global progression",
      progressionDescription:
        "Qualifying teams can progress through 2026 Global Rounds, including Bangkok, Prague, and Dubai, and earn invitations to the Tournament of Champions at Yale University.",
      note:
        "Learning, teamwork, confidence, and discovery matter at every stage of the experience.",
      image: "/images/world-scholars-competition-writing.jpeg",
      imageAlt:
        "Merishaw School students participating in a World Scholar's Cup academic competition",
    },
    signatureIntro: {
      eyebrow: "Signature clubs",
      title:
        "Distinctive programs that turn interests into real-world growth.",
      description:
        "Merishaw gives boys practical opportunities to explore sport, engineering, innovation, leadership, creativity, and service.",
    },
    signatureClubs: signatureClubs.map((club) => ({ ...club })),
    additionalClubs: {
      eyebrow: "Additional clubs and societies",
      title: "More ways to discover a strength, serve others, and belong.",
      groups: clubDirectories.map((group) => ({ ...group })),
    },
    galleryIntro: {
      eyebrow: "Activity gallery",
      title: "Clubs, talents, and practical interests in motion.",
      description:
        "Students explore technology, agriculture, music, movement, focus, and friendly competition beyond the classroom timetable.",
    },
    gallery: clubPhotos.map((photo) => ({ ...photo })),
    cta: {
      eyebrow: "School life",
      title: "Explore a school environment built for the whole boy.",
      description:
        "Speak with the school team about academics, boarding, clubs, sport, and the admissions pathway.",
      primaryHref: "/admissions",
      primaryLabel: "Start Admissions",
      secondaryHref: "/contact",
      secondaryLabel: "Contact School",
    },
  },
  csr: {
    body: {
      title: "CSR",
      paragraphs: [
        "Merishaw School CSR is focused on implementing community programs in areas that surround the school and are faced with limited access to quality education, health services and access to water and nutrition.",
        "We work with partner organizations to implement programs in collaboration with stakeholders.",
        "All our CSR programs and activities are guided by the commitment to make lasting change in community defined in the Sustainable Development Goals.",
        "Our CSR program is structured to provide an objectively measured impact.",
        "We engage local and national government as necessary throughout the strategy development process as an enabler of systems-level change.",
        "We are a visionary organization that is designed and committed to advance boy child education and to support young men in the region to be holistically equipped to access dignified and fulfilling work.",
      ],
    },
    initiativesIntro: {
      eyebrow: "Community Service Learning",
      title: "Core Community Service Initiatives",
      description:
        "Merishaw gives boys practical opportunities to serve, reflect, and grow into responsible citizens.",
    },
    initiatives: csrInitiativeCards.map((initiative) => ({ ...initiative })),
    cta: {
      eyebrow: "Get Involved",
      title: "Partner with Merishaw School.",
      description:
        "Speak with our team to learn how you can support our community programs.",
      primaryHref: "/contact",
      primaryLabel: "Contact the School",
      secondaryHref: `mailto:${siteConfig.contact.email}`,
      secondaryLabel: "Email Enquiries",
    },
  },
  downloads: {
    sectionIntro: {
      eyebrow: "Documents",
      title: "Important school files.",
      description:
        "Download fee information, brochure material, and available school circulars.",
    },
    items: downloads.map((download) => ({ ...download })),
    note:
      "For the latest fee guidance or a document that is not listed here, contact the school directly.",
  },
  infrastructure: {
    concept: {
      eyebrow: "Campus concept",
      title: "A community designed to form conquerors.",
      paragraphs: [...conceptIntro],
      primaryAction: {
        href: "/gallery",
        label: "View Campus Gallery",
      },
      secondaryAction: {
        href: "/contact",
        label: "Plan a Visit",
      },
    },
    stats: infrastructureStats.map((stat) => ({ ...stat })),
    siteLocation: {
      eyebrow: "Site location",
      title: "Isinya's open savannah becomes part of the school experience.",
      paragraphs: [...siteLocation],
      image: "/images/gallery-campus-view.jpg",
      imageAlt: "Merishaw School campus in its Kajiado setting",
    },
    architecturalIntro: {
      eyebrow: "Architectural inspirations",
      title:
        "The campus draws from physical openness, sustainable systems, and Maasai social structure.",
      description:
        "Each design choice connects the school to its environment while supporting safety, creativity, movement, and whole-boy formation.",
    },
    architecturalInspirations: architecturalInspirations.map((item) => ({
      ...item,
    })),
    sustainabilityIntro: {
      eyebrow: "Sustainability",
      title:
        "Designed to reduce waste, harvest natural resources, and regulate microclimate.",
      description:
        "Passive design strategies and campus systems work together to reduce energy demand and support daily comfort.",
    },
    sustainabilityStrategies: [...sustainabilityStrategies],
    maasai: {
      eyebrow: "Social setting",
      title: "A master plan inspired by the Maasai Emanyatta.",
      paragraphs: [...maasaiContext],
      image: "/images/gallery-aerial-campus.jpg",
      imageAlt: "Aerial view of Merishaw School campus master plan",
    },
    masterPlanIntro: {
      eyebrow: "Movement, zoning and master planning",
      title: "A clear axis organizes daily student life from gate to boarding community.",
      description:
        "The school master plan follows the logical flow of student activities, with courtyards, buffers, and layers of care shaping the campus.",
    },
    masterPlanLayers: masterPlanLayers.map((layer) => ({ ...layer })),
    visitCta: {
      eyebrow: "Experience the campus",
      title: "See how the architectural concept supports daily life.",
      description:
        "Visit Merishaw to see the arrival boulevard, courtyards, learning spaces, boarding community, sports grounds, and the wider campus environment.",
      primaryHref: "/contact",
      primaryLabel: "Book a Visit",
      secondaryHref: "/gallery",
      secondaryLabel: "View Gallery",
    },
  },
  legacy844: {
    transition: {
      eyebrow: "Current cohorts",
      title: curriculumTransition.title,
      description: curriculumTransition.description,
      primaryAction: {
        href: "/admissions",
        label: "Admissions Enquiry",
      },
      secondaryAction: {
        href: "/academics",
        label: "View CBE Academics",
      },
    },
    highlights: [...curriculumTransition.highlights],
    principlesIntro: {
      eyebrow: "Core design principles",
      title: "The structure behind the 8-4-4 pathway.",
      description:
        "This page keeps the 8-4-4 information separate from the CBE academics page so parents can review the legacy pathway clearly.",
    },
    principles: legacy844Principles.map((principle) => ({ ...principle })),
    cta: {
      eyebrow: "Next step",
      title: "Speak with admissions about Form 3 and Form 4.",
      description:
        "Admissions can guide parents on the current 8-4-4 cohorts, placement, and the information needed for a complete enquiry.",
      primaryHref: "/admissions",
      primaryLabel: "Admissions",
      secondaryHref: "/contact",
      secondaryLabel: "Contact Us",
    },
  },
  sports: {
    intro: {
      eyebrow: "Sports and talents",
      title: "Train the body. Strengthen the character.",
      description:
        "Sporting life at Merishaw sits alongside academic focus and character formation. Boys learn how to prepare, respond to challenge, play for the team, and pursue steady improvement.",
      image: "/images/sports-lacrosse-passing.jpeg",
      imageAlt: "Merishaw School lacrosse students preparing a pass",
      primaryAction: {
        href: "/clubs",
        label: "Explore Clubs",
      },
      secondaryAction: {
        href: "/contact",
        label: "Contact School",
      },
    },
    programmeIntro: {
      eyebrow: "Sports programme",
      title: "Different sporting pathways. Shared habits of excellence.",
      description:
        "Each programme creates opportunities for fitness, resilience, teamwork, and confident participation.",
    },
    programmes: sportsProgrammes.map((programme) => ({ ...programme })),
    coaching: {
      eyebrow: "Coaching culture",
      title: "Purposeful guidance behind every training session.",
      description:
        "Merishaw's sporting environment encourages discipline, sportsmanship, courage, and a healthy competitive mindset.",
      image: "/images/sports-coach.jpeg",
      imageAlt: "Merishaw School sports coach speaking beside the school field",
    },
    coachingValues: ["Teamwork", "Resilience", "Technique", "Confidence"],
    galleryIntro: {
      eyebrow: "Sports gallery",
      title: "A closer look at active school life.",
      description:
        "From the field to the pool, students have room to train, participate, and develop their talents.",
    },
    gallery: sportsGallery.map((photo) => ({ ...photo })),
    cta: {
      eyebrow: "Admissions",
      title: "Find the right environment for your son's growth.",
      description:
        "Speak with the school team about academics, boarding, sports, clubs, and planning your visit to Merishaw.",
      primaryHref: "/admissions",
      primaryLabel: "Start Admissions",
      secondaryHref: "/contact",
      secondaryLabel: "Contact School",
    },
  },
  contact: {
    sectionIntro: {
      eyebrow: "Contact",
      title: "Speak with Merishaw School",
      description:
        "Reach the school for admissions, downloads, visits, sponsorship discussions, and general enquiries.",
    },
  },
  gallery: {
    images: galleryImages.map((image) => ({ ...image })),
    showcaseSlides: showcaseSlides.map((slide) => ({ ...slide })),
  },
  news: {
    items: newsItems.map((item) => ({ ...item })),
  },
  leadership: {
    boardMembers: boardMembers.map((member) => ({ ...member })),
    principal: { ...principal },
    seniorManagement: seniorManagement.map((member) => ({ ...member })),
    studentCouncil: studentCouncil.map((member) => ({ ...member })),
    studentLeaders: studentLeaders.map((member) => ({ ...member })),
  },
  support: {
    content: { ...supportContent },
    sectionPrimaryAction: {
      href: "/support-a-child",
      label: "Explore Sponsorship",
    },
    sectionSecondaryAction: {
      href: "/contact",
      label: "Talk to Admissions",
    },
    sponsorshipIntro: {
      eyebrow: "Sponsorship pathway",
      title: "A clear sponsorship conversation, handled directly by the school.",
      description: supportContent.description,
    },
    sponsorshipAreas: [...sponsorshipAreas],
    initiativesIntro: {
      eyebrow: "CSR foundation",
      title: "Social responsibility in action.",
      description:
        "The sponsorship pathway connects with Merishaw's wider culture of service, outreach, wellness, and community responsibility.",
    },
    initiatives: [...csrInitiatives],
    cta: {
      eyebrow: "Contact CTA",
      title: "Discuss sponsorship directly with Merishaw School.",
      description:
        "No payment gateway is included in this phase. The next step is a direct conversation with the school so sponsorship details can be handled properly.",
      primaryHref: "/contact",
      primaryLabel: "Contact the School",
      secondaryHref: `mailto:${siteConfig.contact.email}`,
      secondaryLabel: "Email Enquiries",
    },
  },
  foundersVision: {
    intro: {
      eyebrow: "Founder's Vision",
      title:
        "A visionary journey: turning boys into men of purpose and integrity.",
      description: "",
      quote: "Success is not a destination; it's a journey.",
      primaryAction: {
        href: "/about",
        label: "Mission and Values",
      },
      secondaryAction: {
        href: "/leadership",
        label: "Leadership",
      },
    },
    paragraphs: [...foundersVisionParagraphs],
  },
  homeVideo: {
    eyebrow: "Welcome video",
    title: "Welcome to Merishaw School.",
    description:
      "Watch the Merishaw School welcome video and experience the campus, values, and learning environment behind the Home of the Boy Child.",
    embedUrl: "https://www.youtube.com/embed/RIQKNGVncwg",
    videoTitle: "Merishaw School welcome video",
    primaryAction: {
      href: "/admissions",
      label: "Start Admissions",
    },
    secondaryAction: {
      href: "/gallery",
      label: "View Gallery",
    },
  },
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function mergeWithDefaults<T>(defaults: T, override: unknown): T {
  if (Array.isArray(defaults)) {
    return Array.isArray(override) ? (override as T) : defaults;
  }

  if (isRecord(defaults)) {
    if (!isRecord(override)) {
      return defaults;
    }

    return Object.fromEntries(
      Object.entries(defaults).map(([key, defaultValue]) => [
        key,
        mergeWithDefaults(defaultValue, override[key]),
      ]),
    ) as T;
  }

  return typeof override === typeof defaults ? (override as T) : defaults;
}

function isLeadershipPerson(value: unknown): value is EditableLeadershipPerson {
  return (
    isRecord(value) &&
    typeof value.name === "string" &&
    typeof value.role === "string" &&
    typeof value.image === "string" &&
    typeof value.description === "string"
  );
}

function isLegacyStudentCouncilMember(
  value: unknown,
): value is EditableStudentCouncilMember {
  return (
    isRecord(value) &&
    typeof value.role === "string" &&
    typeof value.quote === "string"
  );
}

function migrateLeadershipContent(value: unknown): unknown {
  if (!isRecord(value) || !isRecord(value.leadership)) {
    return value;
  }

  const legacyLeaders = Array.isArray(value.leadership.leaders)
    ? value.leadership.leaders.filter(isLeadershipPerson)
    : [];
  const legacyCouncil = Array.isArray(value.leadership.studentCouncil)
    ? value.leadership.studentCouncil
    : [];

  const nextLeadership: Record<string, unknown> = { ...value.leadership };

  if (!("principal" in nextLeadership) && legacyLeaders[0]) {
    nextLeadership.principal = legacyLeaders[0];
  }

  if (
    Array.isArray(nextLeadership.studentCouncil) &&
    nextLeadership.studentCouncil.every(isLegacyStudentCouncilMember)
  ) {
    nextLeadership.studentCouncil = legacyCouncil
      .filter(isLegacyStudentCouncilMember)
      .map((member) => ({
        name: member.role,
        role: "Student Council",
        image: "/images/gallery-student-life-2.jpg",
        description: member.quote,
      }));
  }

  return { ...value, leadership: nextLeadership };
}

export function normalizeEditableContent(value: unknown): EditableContent {
  return mergeWithDefaults(defaultAdminContent, migrateLeadershipContent(value));
}

export async function getEditableContent(): Promise<EditableContent> {
  noStore();

  try {
    const file = await fs.readFile(contentFile, "utf8");
    return normalizeEditableContent(JSON.parse(file));
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      (error as NodeJS.ErrnoException).code === "ENOENT"
    ) {
      return defaultAdminContent;
    }

    throw error;
  }
}

export async function writeEditableContent(
  content: EditableContent,
): Promise<EditableContent> {
  const nextContent = normalizeEditableContent({
    ...content,
    updatedAt: new Date().toISOString(),
  });

  await fs.mkdir(path.dirname(contentFile), { recursive: true });
  await fs.writeFile(contentFile, `${JSON.stringify(nextContent, null, 2)}\n`);

  return nextContent;
}
