import { unstable_noStore as noStore } from "next/cache";
import { promises as fs } from "node:fs";
import path from "node:path";
import {
  academicPrograms,
  cbeCompetencies,
  cbePathways,
  facilities,
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
import { leaders, studentCouncil } from "@/data/leadership";
import { newsItems } from "@/data/news";
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

export type EditableSite = {
  name: string;
  tagline: string;
  description: string;
  url: string;
  logo: string;
  logoLandscape: string;
  contact: EditableContact;
  socials: EditableSocials;
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

export type EditableSlide = {
  eyebrow?: string;
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
  title: string;
  date: string;
  image: string;
  excerpt: string;
  category: string;
};

export type EditableLeader = {
  name: string;
  role: string;
  image: string;
  description: string;
};

export type EditableStudentCouncilMember = {
  role: string;
  quote: string;
};

export type EditablePageHeader = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
};

export type EditableSectionIntro = {
  eyebrow: string;
  title: string;
  description: string;
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
    admissions: EditablePageHeader;
    leadership: EditablePageHeader;
    gallery: EditablePageHeader;
    downloads: EditablePageHeader;
    news: EditablePageHeader;
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
    architecture: {
      eyebrow: string;
      title: string;
      description: string;
      image: string;
      imageAlt: string;
    };
  };
  academics: {
    programs: EditableAcademicProgram[];
    cbePathways: string[];
    cbeCompetencies: string[];
    pillars: EditablePillar[];
    facilities: string[];
  };
  admissions: {
    applicationIntro: EditableSectionIntro;
    applicationFields: string[];
    processIntro: EditableSectionIntro;
    processPrepTitle: string;
    processPrepDescription: string;
    process: EditableAdmissionsStep[];
    feesEyebrow: string;
    feesTitle: string;
  };
  downloads: {
    sectionIntro: EditableSectionIntro;
    items: EditableDownloadItem[];
    note: string;
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
    leaders: EditableLeader[];
    studentCouncil: EditableStudentCouncilMember[];
  };
  support: {
    content: EditableSupportContent;
    initiatives: string[];
  };
};

const contentFile = path.join(process.cwd(), "data", "admin-content.json");

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
      eyebrow: "About",
      title: "A home where boys are mentored into men of integrity.",
      description:
        "Merishaw School combines a serene boarding environment, strong academics, outstanding facilities, and a Christian foundation for whole-person growth.",
      image: "/images/resource-centre.jpeg",
    },
    academics: {
      eyebrow: "Academics",
      title: "Learning pathways that prepare boys for national and global success.",
      description:
        "Merishaw combines 8.4.4, Competency-Based Education, practical skills, mentorship, and holistic pillars for future-ready learning.",
      image: "/images/hero-tuition-block.png",
    },
    admissions: {
      eyebrow: "Admissions",
      title: "Begin your son's Merishaw journey.",
      description:
        "A clear starting point for parents exploring curriculum options, grade placement, fees, and school visits.",
      image: "/images/gallery-parade-grounds.png",
    },
    leadership: {
      eyebrow: "Leadership",
      title: "Leadership rooted in mentorship, growth, and accountability.",
      description:
        "Meet the leadership voice shaping the culture, mentorship, and student formation at Merishaw.",
      image: "/images/principal-david-kariuki.png",
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
    news: {
      eyebrow: "News",
      title: "Merishaw School news and updates.",
      description:
        "Highlights from academics, sport, student life, and school community moments.",
      image: "/images/news-stem.jpg",
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
      image: "/images/resource-centre.jpeg",
    })),
  },
  about: {
    overview: {
      eyebrow: "School overview",
      title: "State-of-the-art residential education for the boy child.",
      paragraphs: [
        "Merishaw School is a residential boys' high school offering the National Curriculum under 8.4.4 and Competency-Based Education at Junior and Senior Secondary School.",
        "The school develops unique programs to bring up wholesome young men who can meet the needs of society and provide leadership in their families, workplaces, the country, and the global stage.",
        "The approach emphasizes mentorship, empowerment, academic excellence, character formation, and the restoration of focus on the boy child.",
      ],
      image: "/images/campus-life.jpg",
      imageAlt: "Merishaw School campus life",
    },
    vision: "To develop purpose driven global leaders empowered for success.",
    mission:
      "Merishaw aims to provide a world class education that equips learners with skills to become critical thinkers, effective communicators, God fearing, and compassionate leaders with integrity through the pursuit of academic excellence.",
    values: values.map((value) => ({ ...value })),
    architecture: {
      eyebrow: "Architectural concept",
      title: "Built as a home away from home.",
      description:
        "Merishaw's campus is designed to feel calm, ordered, and inspiring, with the facilities and environment learners need to fully enjoy school life.",
      image: "/images/gallery-aerial-campus.jpg",
      imageAlt: "Aerial view of Merishaw School",
    },
  },
  academics: {
    programs: academicPrograms.map((program) => ({ ...program })),
    cbePathways: [...cbePathways],
    cbeCompetencies: [...cbeCompetencies],
    pillars: pillars.map((pillar) => ({ ...pillar })),
    facilities: [...facilities],
  },
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
    leaders: leaders.map((leader) => ({ ...leader })),
    studentCouncil: studentCouncil.map((member) => ({ ...member })),
  },
  support: {
    content: { ...supportContent },
    initiatives: [...csrInitiatives],
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

export function normalizeEditableContent(value: unknown): EditableContent {
  return mergeWithDefaults(defaultAdminContent, value);
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
