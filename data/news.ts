export type NewsArticleBlock =
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[]; columns?: 2 | 3 }
  | { type: "image"; src: string; alt: string }
  | { type: "cta"; title: string; text: string };

export type NewsArticle = {
  hero: {
    eyebrow: string;
    title: string;
  };
  blocks: NewsArticleBlock[];
};

export type NewsItem = {
  slug?: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  category: string;
  article?: NewsArticle;
};

export const newsItems: NewsItem[] = [
  {
    title: "Andy Onsarigo Takes Office as School President",
    date: "28 September 2026",
    image: "/images/student-council-andy-onsarigo.jpg",
    excerpt:
      "Merishaw School welcomed Andy Onsarigo as School President in a swearing-in ceremony captured in the school's official video.",
    category: "Student Leadership",
    slug: "andy-onsarigo-school-president-sworn-in",
    article: {
      hero: {
        eyebrow: "Student Leadership | 28 September 2026",
        title: "Andy Onsarigo takes office as School President.",
      },
      blocks: [
        {
          type: "paragraph",
          text: "Merishaw School welcomed Andy Onsarigo as School President in a swearing-in ceremony captured in the school's official video.",
        },
        {
          type: "image",
          src: "/images/student-council-andy-onsarigo.jpg",
          alt: "Andy Onsarigo, Merishaw School President",
        },
        {
          type: "paragraph",
          text: "The occasion marks a student leadership transition at Merishaw and places service, responsibility, and example at the centre of the role.",
        },
        {
          type: "paragraph",
          text: "We congratulate Andy Onsarigo as he takes up the office of School President and wish him wisdom and strength in the responsibility ahead.",
        },
      ],
    },
  },
  {
    title: "Merishaw School Shines in STEM",
    date: "School news archive",
    image: "/images/news-stem.jpg",
    excerpt:
      "Merishaw continued to excel during the Kenya National Research Festivals organized by Young Scientists Kenya, with one project securing 2nd position in the Technology category.",
    category: "STEM",
  },
  {
    title: "Merishaw School Recognised Twice at the Great Places to School Awards 2026",
    date: "26 September 2026",
    image: "/images/news-great-places-awards.jpg",
    excerpt:
      "Merishaw School received two recognitions at the 6th Edition of the Great Places to School Awards 2026: Emerging Position 1 in Technology & Digital Skills (STEM) and Emerging Position 2 in Global Competence.",
    category: "Awards & Achievements",
    slug: "merishaw-great-places-to-school-awards-2026",
    article: {
      hero: {
        eyebrow: "Awards & Achievements | 26 September 2026",
        title: "Two recognitions, one vision.",
      },
      blocks: [
        {
          type: "paragraph",
          text: "Merishaw School has been honoured in two categories at the 6th Edition of the Great Places to School Awards 2026.",
        },
        {
          type: "list",
          items: [
            "Emerging Position 1: Technology & Digital Skills (STEM)",
            "Emerging Position 2: Global Competence",
          ],
        },
        {
          type: "image",
          src: "/images/news-great-places-awards.jpg",
          alt: "Merishaw School trophy from the 6th Great Places to School Awards 2026",
        },
        {
          type: "paragraph",
          text: "Behind both recognitions lies the same stated purpose: to prepare boys for a future increasingly shaped by technology, and for a world that demands confidence across cultures.",
        },
        {
          type: "paragraph",
          text: "Digital skills and global competence are treated not as separate subjects, but as two sides of a single ambition — equipping students to operate comfortably in a rapidly changing world.",
        },
        { type: "heading", text: "A milestone, and a midpoint" },
        {
          type: "paragraph",
          text: "Receiving recognition is a milestone, but the school frames it as a midpoint rather than a finish line: keep pushing for excellence, keep shaping the leaders of tomorrow, and keep widening the horizon for the boys in its care.",
        },
        {
          type: "paragraph",
          text: "Global competence is demonstrated through exposure to the wider world — international exchanges, language learning, robotics and design, sport, and the aviation programmes that have become a distinctive part of the Merishaw offering.",
        },
        {
          type: "paragraph",
          text: "Admissions at Merishaw School are open and ongoing.",
        },
        {
          type: "cta",
          title: "Admissions are open & ongoing",
          text: "📞 0721 303 303\n📱 Call or WhatsApp us for admissions, directions and enquiries.",
        },
      ],
    },
  },
  {
    title: "Merishaw Established as a Lacrosse Centre",
    date: "School news archive",
    image: "/images/news-lacrosse.jpg",
    excerpt:
      "Merishaw hosted a delegation from Liberty University in the USA, giving students valuable exposure to Lacrosse coaching, play, and international sporting exchange.",
    category: "Sports",
  },
  {
    title: "International Football Experience | Madrid, Spain",
    date: "School news archive",
    image: "/images/news-football-madrid.jpg",
    excerpt:
      "Our Morans had the privilege of experiencing an elite international football training session in Madrid, Spain—immersing themselves in a football culture renowned for producing some of the world's greatest players and teams. This was more than football: they trained, learned, competed, observed and grew in an international environment where excellence is a standard.",
    category: "Sports",
    slug: "international-football-experience-madrid",
    article: {
      hero: {
        eyebrow: "International Football Experience | Madrid, Spain",
        title: "The world is their classroom. The future is their destination. 🌍⚽",
      },
      blocks: [
        {
          type: "paragraph",
          text: "At Merishaw School, we believe that exceptional education goes beyond the classroom.",
        },
        {
          type: "paragraph",
          text: "It is about giving boys the opportunity to explore the world, encounter excellence and discover possibilities far beyond what they may have imagined.",
        },
        {
          type: "paragraph",
          text: "Our Morans had the privilege of experiencing an elite international football training session in Madrid, Spain—immersing themselves in a football culture renowned for producing some of the world's greatest players and teams.",
        },
        {
          type: "image",
          src: "/images/news-football-madrid.jpg",
          alt: "The Merishaw Morans gathered on an elite training pitch in Madrid, Spain",
        },
        {
          type: "paragraph",
          text: "This was more than football.",
        },
        {
          type: "paragraph",
          text: "It was an opportunity to train, learn, compete, observe and grow in an international environment where excellence is not an aspiration—it is a standard.",
        },
        { type: "heading", text: "Beyond the pitch" },
        {
          type: "paragraph",
          text: "International exposure challenges a boy to think differently.",
        },
        {
          type: "paragraph",
          text: "In Madrid, our Morans experienced a new sporting culture, encountered different approaches to football development and gained perspectives that cannot be taught from a textbook.",
        },
        {
          type: "paragraph",
          text: "They developed:",
        },
        {
          type: "image",
          src: "/images/news-madrid-training.jpg",
          alt: "The Morans training under an elite coach during their Madrid football experience",
        },
        {
          type: "list",
          columns: 2,
          items: [
            "⚽ Greater technical ability",
            "🌍 Global perspective and exposure",
            "💪 Confidence and resilience",
            "🏆 Competitive ambition",
            "🤝 Teamwork and leadership",
            "🎯 Discipline and determination",
          ],
        },
        {
          type: "paragraph",
          text: "But perhaps most importantly, they returned with something even more valuable—a bigger vision of what is possible.",
        },
        { type: "heading", text: "Preparing boys for a global world" },
        {
          type: "paragraph",
          text: "We deliberately create experiences that stretch our boys beyond the familiar.",
        },
        {
          type: "paragraph",
          text: "From academics and leadership to sport, innovation and international exposure, every opportunity at Merishaw is designed to develop young men who can confidently navigate the world around them.",
        },
        {
          type: "paragraph",
          text: "Because we don't believe a boy's potential should be defined by his surroundings.",
        },
        {
          type: "paragraph",
          text: "We take our boys to where possibility becomes reality.",
        },
        {
          type: "paragraph",
          text: "Today, it is Madrid. Tomorrow, it may be another global city, another international arena, another challenge that demands courage, discipline and ambition.",
        },
        {
          type: "paragraph",
          text: "The destination may change. The standard does not.",
        },
        {
          type: "image",
          src: "/images/news-madrid-squad.jpg",
          alt: "The Merishaw Morans squad line up on the Madrid training pitch",
        },
        { type: "heading", text: "The Merishaw standard" },
        {
          type: "paragraph",
          text: "At Merishaw School, we bring together:",
        },
        {
          type: "list",
          columns: 2,
          items: [
            "Academic Excellence.",
            "Character Formation.",
            "Discipline.",
            "Leadership.",
            "Talent Development.",
            "Global Exposure.",
          ],
        },
        {
          type: "paragraph",
          text: "We are not simply preparing boys for examinations.",
        },
        {
          type: "paragraph",
          text: "We are preparing them for life.",
        },
        {
          type: "paragraph",
          text: "We want every Moran to leave Merishaw with the confidence to walk into any room, compete on any stage and pursue excellence anywhere in the world.",
        },
        {
          type: "paragraph",
          text: "Because the world is changing. And our boys must be ready for it.",
        },
        { type: "heading", text: "Merishaw School" },
        { type: "subheading", text: "Home of the Boy Child" },
        {
          type: "list",
          columns: 2,
          items: [
            "Where potential is discovered.",
            "Where character is forged.",
            "Where talent is developed.",
            "Where leaders are prepared for a global world.",
          ],
        },
        { type: "heading", text: "Give your son more than a school." },
        {
          type: "paragraph",
          text: "Give him an environment that expands his horizons, challenges his potential and inspires him to believe that the world is within his reach.",
        },
        {
          type: "image",
          src: "/images/news-madrid-team.jpg",
          alt: "The Merishaw Morans and their coaches on the pitch at the Madrid football experience",
        },
        {
          type: "cta",
          title: "Admissions are open & ongoing",
          text: "📞 0721 303 303\n📱 Call or WhatsApp us for admissions, directions and enquiries.",
        },
        {
          type: "paragraph",
          text: "Merishaw School — Raising Men of Valour for a Global World. 🌍",
        },
      ],
    },
  },
];
