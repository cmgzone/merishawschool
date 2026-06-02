export const academicPrograms = [
  {
    title: "8-4-4 Curriculum",
    eyebrow: "Form 3 and Form 4",
    description:
      "Kenya's 8-4-4 system is being phased out as the final cohorts complete secondary school. Merishaw currently supports Form 3 and Form 4 learners through the transition.",
  },
  {
    title: "Competency-Based Education",
    eyebrow: "Grade 7-12",
    description:
      "Competency-Based Education, often referred to as CBC, prioritizes practical skills, critical thinking, values, continuous assessment, and tailored career pathways.",
  },
  {
    title: "Holistic Boarding Experience",
    eyebrow: "Student life",
    description:
      "A safe and caring residential environment supports academics, mentorship, sports, spiritual growth, creativity, and disciplined independence.",
  },
];

export const curriculumTransition = {
  title: "Kenya's education system is moving from 8-4-4 to CBE.",
  description:
    "The 8-4-4 model is officially being phased out and replaced by the Competency-Based Curriculum. The final KCPE examinations were held in 2023, and the remaining 8-4-4 learners will complete secondary school as the last cohorts progress through Form 3 and Form 4.",
  highlights: [
    "No new 8-4-4 classes are being admitted.",
    "Merishaw currently has two 8-4-4 cohorts: Form 3 and Form 4.",
    "The transition favours practical skills, core values, continuous assessment, and applied learning.",
  ],
};

export const legacy844Principles = [
  {
    title: "Subject-based design",
    description:
      "Standardized syllabi were prescribed for every subject, with emphasis on theoretical knowledge and memorization.",
  },
  {
    title: "Centralized evaluation",
    description:
      "Progression relied heavily on standardized, high-stakes national examinations at the end of primary and secondary cycles.",
  },
  {
    title: "Academic progression",
    description:
      "The system aimed to prepare learners for white-collar and civil-service careers through identical nationwide content delivery.",
  },
];

export const cbeOverview = {
  title: "CBE focuses on mastery, application, and pathways.",
  description:
    "Competency-Based Education replaces the traditional exam-focused system with a 2-6-3-3-3 structure. It ensures learners master specific abilities and apply knowledge rather than only memorizing facts for examinations.",
  facilitiesNote:
    "Merishaw School facilities, resources, and infrastructure have been optimized for CBE through practical learning spaces, STEM exposure, sports, mentorship, digital literacy, and hands-on training.",
};

export const cbeStages = [
  {
    title: "Pre-Primary",
    description: "PP1 and PP2 establish early developmental skills.",
  },
  {
    title: "Primary School",
    description:
      "Grades 1 to 6 focus on core literacy, numeracy, and foundational life skills.",
  },
  {
    title: "Junior School",
    description:
      "Grades 7 to 9 act as a transitional period where learners explore a broad spectrum of subjects.",
  },
  {
    title: "Senior School",
    description:
      "Grades 10 to 12 allow learners to specialize based on talents and interests across career pathways.",
  },
];

export const cbePathways = [
  "Arts and Sports Science",
  "Social Sciences",
  "STEM: Science, Technology, Engineering and Mathematics",
];

export const cbeCompetencies = [
  "Communication and collaboration",
  "Critical thinking and problem solving",
  "Creativity and imagination",
  "Citizenship and social responsibility",
  "Digital literacy",
  "Learning to learn",
  "Self-efficacy and confidence",
];

export const pillars = [
  {
    title: "STEM Program",
    image: "/images/pillar-stem.jpg",
    imageAlt: "Merishaw students taking part in a STEM learning activity",
    description:
      "A future-facing pillar that prepares boys for innovation, real-world problem solving, creativity, and adaptability in a changing global economy.",
  },
  {
    title: "Sports and Talents",
    image: "/images/gallery-soccer-academy.jpeg",
    imageAlt: "Merishaw Soccer Academy students competing on the school field",
    description:
      "A nurturing environment where students explore, develop, and excel in sporting and talent areas while building discipline and resilience.",
  },
  {
    title: "Spiritual Well-being",
    image: "/images/pillar-spiritual.jpg",
    imageAlt: "Merishaw school community during a thanksgiving gathering",
    description:
      "A Christian foundation that supports the holistic transformation of the boy child into a man of integrity and purpose.",
  },
  {
    title: "Performing Arts",
    image: "/images/pillar-performing-arts.jpeg",
    imageAlt: "Merishaw students in a performing arts activity",
    description:
      "Drama, theatre, music, and performance opportunities that strengthen confidence, expression, collaboration, and creativity.",
  },
  {
    title: "Digital Literacy",
    image: "/images/pillar-digital-literacy.jpg",
    imageAlt: "Digital learning and literacy at Merishaw School",
    description:
      "Intentional exposure to technology and digital skills so learners can participate confidently in a modern information age.",
  },
  {
    title: "Social and Collaboration",
    image: "/images/pillar-social-collaboration.jpeg",
    imageAlt: "Merishaw students participating in a social collaboration initiative",
    description:
      "Community service, outreach, environmental care, donation drives, and wellness campaigns that build compassion and citizenship.",
  },
];

export const facilities = [
  "Resource center with junior, senior, and common library spaces",
  "600-seat auditorium and 2,000-seat multi-purpose hall",
  "36 regular classrooms, special classrooms, computer labs, art room, and staffrooms",
  "Science block with laboratories, lecture theatres, and preparation rooms",
  "Workshops for wood work, metal fabrication, STEM, crafts, and culinary arts",
  "Dining hall, dormitories, staff accommodation, and extensive sports facilities",
];

export const values = [
  { letter: "M", label: "Men of Valor and Purpose" },
  { letter: "E", label: "Empowered Entrepreneurs" },
  { letter: "R", label: "Resilience" },
  { letter: "I", label: "Innovation" },
  { letter: "S", label: "Spirituality" },
  { letter: "H", label: "Honesty" },
  { letter: "A", label: "Accountability" },
  { letter: "W", label: "Winning mentality" },
];

export type AcademicExperiencePage = {
  title: string;
  eyebrow: string;
  description: string;
  heroImage?: string;
  introTitle: string;
  introDescription: string;
  highlights: {
    title: string;
    description: string;
  }[];
  photos: {
    src: string;
    alt: string;
    className?: string;
  }[];
};

export const academicExperiencePages = {
  "our-classrooms": {
    title: "Our Classrooms",
    eyebrow: "Academics / Learning Spaces",
    description:
      "Calm, ordered classrooms create space for participation, concentration, collaboration, and steady academic progress.",
    heroImage: "/images/academics-engaged-classroom.jpeg",
    introTitle: "Focused spaces where every learner can participate.",
    introDescription:
      "Merishaw classrooms support an active learning culture. Boys are encouraged to ask questions, think carefully, collaborate with peers, and build the study habits that sustain progress across the school year.",
    highlights: [
      {
        title: "Active participation",
        description:
          "Lessons invite learners to ask questions, share ideas, and take responsibility for their progress.",
      },
      {
        title: "Structured routines",
        description:
          "A clear academic rhythm helps students concentrate, prepare well, and use learning time purposefully.",
      },
      {
        title: "Assessment and growth",
        description:
          "Classroom practice, feedback, and assessment help boys understand their strengths and improve steadily.",
      },
      {
        title: "Collaborative learning",
        description:
          "Students learn to listen, contribute, and solve problems together with confidence and respect.",
      },
    ],
    photos: [
      {
        src: "/images/academics-engaged-classroom.jpeg",
        alt: "Merishaw School student raising his hand during a classroom lesson",
        className: "sm:col-span-2",
      },
      {
        src: "/images/academics-exam-time.jpeg",
        alt: "Merishaw School students completing an assessment in a classroom",
      },
    ],
  },
  "science-block": {
    title: "Science Block",
    eyebrow: "Academics / STEM",
    description:
      "Practical science spaces help students investigate ideas, work carefully, and turn curiosity into disciplined inquiry.",
    heroImage: "/images/academics-science-lab.jpeg",
    introTitle: "Science becomes memorable when learners can test an idea.",
    introDescription:
      "Laboratory experiences give boys room to observe, experiment, record findings, and make connections between classroom concepts and the physical world. Practical work supports both academic confidence and future STEM pathways.",
    highlights: [
      {
        title: "Practical investigation",
        description:
          "Students learn through experiments that strengthen observation, precision, and scientific reasoning.",
      },
      {
        title: "Safe working habits",
        description:
          "Guided laboratory routines encourage responsibility, careful preparation, and respect for equipment.",
      },
      {
        title: "STEM foundations",
        description:
          "Science learning supports future pathways in technology, engineering, health, and applied research.",
      },
      {
        title: "Curiosity with purpose",
        description:
          "Learners are encouraged to ask strong questions and follow evidence toward thoughtful conclusions.",
      },
    ],
    photos: [
      {
        src: "/images/academics-science-lab.jpeg",
        alt: "Merishaw School students conducting a practical experiment in the science laboratory",
        className: "sm:col-span-2",
      },
    ],
  },
  workshop: {
    title: "Workshop",
    eyebrow: "Academics / Practical Skills",
    description:
      "Workshop exposure develops practical confidence, care, problem-solving, and respect for skilled work.",
    heroImage: "/images/academics-engineering-workshop.jpeg",
    introTitle: "Hands-on learning gives ideas weight, shape, and purpose.",
    introDescription:
      "Merishaw gives learners practical exposure that connects classroom knowledge with tools, materials, safety habits, and the satisfaction of building something carefully. These experiences support entrepreneurship and technical curiosity.",
    highlights: [
      {
        title: "Technical confidence",
        description:
          "Learners gain familiarity with practical processes while developing patience and attention to detail.",
      },
      {
        title: "Safety first",
        description:
          "Protective equipment and clear routines teach boys to approach tools and materials responsibly.",
      },
      {
        title: "Applied problem-solving",
        description:
          "Projects encourage learners to plan, test, adjust, and persevere when an idea needs refinement.",
      },
      {
        title: "Enterprise mindset",
        description:
          "Practical work helps boys see how skills, creativity, and discipline can create real-world value.",
      },
    ],
    photos: [
      {
        src: "/images/academics-engineering-workshop.jpeg",
        alt: "Merishaw School student wearing protective equipment during an engineering workshop activity",
        className: "sm:col-span-2",
      },
    ],
  },
  robotics: {
    title: "Robotics",
    eyebrow: "Academics / Innovation",
    description:
      "Robotics turns digital literacy into practical invention through coding, electronics, teamwork, and iterative problem-solving.",
    heroImage: "/images/academics-robotics-soldering.jpeg",
    introTitle: "Build. Test. Improve. Try again.",
    introDescription:
      "Robotics gives Merishaw students a practical route into technology and engineering. Boys work with components, circuits, code, and collaborative challenges while building the resilience to refine an idea until it works.",
    highlights: [
      {
        title: "Electronics",
        description:
          "Students encounter circuits, components, and the practical logic behind connected systems.",
      },
      {
        title: "Engineering design",
        description:
          "Learners move from an idea to a working solution through planning, building, testing, and refinement.",
      },
      {
        title: "Team problem-solving",
        description:
          "Collaborative projects strengthen communication, patience, and the confidence to learn from setbacks.",
      },
      {
        title: "Future-ready skills",
        description:
          "Robotics supports digital literacy, creative thinking, and curiosity about emerging technologies.",
      },
    ],
    photos: [
      {
        src: "/images/academics-robotics-soldering.jpeg",
        alt: "Merishaw School student soldering a robotics component during a hands-on technology session",
        className: "sm:col-span-2",
      },
      {
        src: "/images/academics-robotics-circuit.jpeg",
        alt: "Merishaw School student testing a robotics circuit during a practical STEM activity",
      },
    ],
  },
  "resource-centre": {
    title: "Resource Centre",
    eyebrow: "Academics / Study Support",
    description:
      "A dedicated resource centre supports reading, research, independent study, and a culture of lifelong learning.",
    heroImage: "/images/gallery-resource-centre.jpeg",
    introTitle: "A quieter space for deeper attention.",
    introDescription:
      "The resource centre supports learners as they read widely, study independently, conduct research, and build the habits behind strong academic performance. It gives boys room to slow down, focus, and follow an idea further.",
    highlights: [
      {
        title: "Reading culture",
        description:
          "Learners are encouraged to read beyond the syllabus and explore ideas with curiosity.",
      },
      {
        title: "Independent study",
        description:
          "Quiet spaces help students practise concentration, preparation, and personal responsibility.",
      },
      {
        title: "Research habits",
        description:
          "The centre supports information literacy and the ability to investigate a question thoughtfully.",
      },
      {
        title: "Academic support",
        description:
          "Shared resources complement classroom learning and help boys revisit concepts at their own pace.",
      },
    ],
    photos: [
      {
        src: "/images/gallery-resource-centre.jpeg",
        alt: "Merishaw School resource centre",
        className: "sm:col-span-2",
      },
      {
        src: "/images/resource-centre.jpeg",
        alt: "Merishaw School resource and study centre",
      },
    ],
  },
  languages: {
    title: "Languages",
    eyebrow: "Academics / Communication",
    description:
      "Language learning strengthens expression, listening, reading, writing, confidence, and connection across cultures.",
    introTitle: "Clear expression helps boys lead with confidence.",
    introDescription:
      "Language learning at Merishaw supports the ability to read critically, write clearly, speak thoughtfully, and listen well. These habits strengthen every subject while preparing learners to participate confidently in a wider world.",
    highlights: [
      {
        title: "Reading and writing",
        description:
          "Learners strengthen comprehension, vocabulary, structure, and the craft of communicating an idea clearly.",
      },
      {
        title: "Public speaking",
        description:
          "Classroom participation and presentation practice help boys express themselves with confidence.",
      },
      {
        title: "Listening well",
        description:
          "Communication begins with attention, respect, and the ability to understand another perspective.",
      },
      {
        title: "Cultural awareness",
        description:
          "Languages create pathways into literature, history, identity, and the wider human experience.",
      },
    ],
    photos: [],
  },
  "art-gallery": {
    title: "Creative Arts",
    eyebrow: "Academics / Talents",
    description:
      "Creative arts give students room to express ideas, develop confidence, and discover talents beyond the classroom.",
    introTitle: "Creativity belongs at the heart of whole-boy formation.",
    introDescription:
      "Merishaw creates space for artistic expression, performance, music, and the confidence to share a developing talent. Creative experiences complement academic work by encouraging imagination, collaboration, and personal voice.",
    highlights: [
      {
        title: "Creative expression",
        description:
          "Students explore ideas through artistic, musical, and performance-based experiences.",
      },
      {
        title: "Confidence",
        description:
          "Sharing a creative skill helps boys become more comfortable with preparation, practice, and presentation.",
      },
      {
        title: "Collaboration",
        description:
          "Group creative work teaches listening, timing, contribution, and respect for the strengths of others.",
      },
      {
        title: "Talent development",
        description:
          "The arts give learners another pathway to discover a strength and pursue steady improvement.",
      },
    ],
    photos: [],
  },
} satisfies Record<string, AcademicExperiencePage>;

export type AcademicExperienceSlug = keyof typeof academicExperiencePages;
