export type LeadershipPerson = {
  name: string;
  role: string;
  image: string;
  description: string;
};

export const principalWelcomeNote = [
  "This is an exciting time to join Merishaw School as we continue to build on our successes and strengthen our position as the Home of the Boy Child and the best boys school in Sub-Saharan Africa. We have achieved the institutionalization of our core values: Men of Valor and Purpose, Empowered Entrepreneurs, Resilience, Innovation, Spirituality, Honesty, Accountability, and a Winning Mentality that transforms our boys to Morans.",
  "We pride ourselves with being much more than the best in academic results, but on being part of a community of learners, both students and staff, pursuing excellence in everything we do.",
  "Our state-of-the-art facilities provide access to a wide range of activities designed to enable our students to fully invest themselves in many aspects of modern society. These include Olympic-standard competitive sports, data science and robotics, art, aviation, music, dance, performance arts, and other clubs, with many of our students achieving regional, national, and global success.",
  "Our students are able to gain a variety of experiences, working as apprentices in engineering workshops and agriculture, taking overseas trips to experience different cultures and values, and participating in world scholars programs aimed at raising their aspirations.",
  "These invaluable experiences are specifically aimed at ensuring all students are equipped with the necessary skills, knowledge, and understanding, beyond those attained in the classroom, which best prepares them to win in their life, with increasing confidence and courage.",
  "We support this further with our parent-led mentorship program, aimed at developing our young students' resilience, critical thinking, initiative, reflection, and desire to seek out challenge. These are attributes possessed by the most successful and happy in society.",
  "We are an open, forward-thinking, and outward-facing school that values partnership. We are confident that, by cultivating strategic partnerships where we share best practices and benchmark, we are becoming a centre of excellence that secures the Founder's vision at the heart of this community.",
].join("\n\n");

export const principal: LeadershipPerson = {
  name: "Mr Aringo",
  role: "Chief Principal",
  image: "/images/principal-mr-aringo.jpeg",
  description: principalWelcomeNote,
};

export const boardMembers: LeadershipPerson[] = [
  {
    name: "Board Chair",
    role: "Board of Management",
    image: "/images/resource-centre.jpeg",
    description:
      "Provides governance oversight, strategic guidance, and stewardship for the long-term growth of Merishaw School.",
  },
  {
    name: "Board Member",
    role: "Academic and Quality Oversight",
    image: "/images/gallery-resource-centre.jpeg",
    description:
      "Supports academic excellence, learner welfare, and continuous improvement across the school experience.",
  },
  {
    name: "Parent Representative",
    role: "Parent Voice",
    image: "/images/campus-life.jpg",
    description:
      "Represents parent perspectives and helps strengthen the partnership between families and the school.",
  },
  {
    name: "Sponsor Representative",
    role: "Community and Values Support",
    image: "/images/merishaw-bg.jpeg",
    description:
      "Supports the school's mission, values, and community links as learners grow in character and purpose.",
  },
];

export const seniorManagement: LeadershipPerson[] = [
  {
    name: "Deputy Principal",
    role: "School Administration",
    image: "/images/gallery-parade-grounds.png",
    description:
      "Supports daily school operations, discipline, coordination, and the smooth running of academic and boarding life.",
  },
  {
    name: "Dean of Studies",
    role: "Academic Leadership",
    image: "/images/hero-tuition-block.png",
    description:
      "Coordinates teaching, assessment, learner progress, and curriculum delivery across the school.",
  },
  {
    name: "Director of Boarding",
    role: "Residential Life",
    image: "/images/gallery-hostel-manyatta-palace.jpeg",
    description:
      "Guides the boarding environment so learners experience structure, care, accountability, and belonging.",
  },
  {
    name: "Guidance and Counselling Lead",
    role: "Student Welfare",
    image: "/images/gallery-student-life-1.jpg",
    description:
      "Supports learner wellbeing, mentorship, character formation, and positive decision-making.",
  },
];

export const studentCouncil: LeadershipPerson[] = [
  {
    name: "Victor Muuo",
    role: "School President",
    image: "/images/student-council-victor-muuo.jpeg",
    description:
      "Leads the student council and represents student voice across the school community.",
  },
  {
    name: "Victor Kemboi",
    role: "Deputy President",
    image: "/images/student-council-victor-kemboi.jpeg",
    description:
      "Supports the School President and helps coordinate council responsibilities.",
  },
  {
    name: "Brian Ruto",
    role: "Prime Minister",
    image: "/images/student-council-brian-ruto.jpeg",
    description:
      "Supports the student council executive and helps coordinate student leadership responsibilities.",
  },
  {
    name: "Michael Bob",
    role: "DH Captain",
    image: "/images/student-council-michael-bob.jpeg",
    description:
      "Supports student responsibility, discipline, and positive daily school life.",
  },
  {
    name: "Mohammed Abdikad",
    role: "Captain",
    image: "/images/student-council-mohammed-abdikad.jpeg",
    description:
      "Supports student leadership, responsibility, and positive school culture.",
  },
  {
    name: "Ronald Kinoti",
    role: "Games Captain",
    image: "/images/student-council-ronald-kinoti.jpeg",
    description:
      "Encourages participation, teamwork, discipline, and sportsmanship.",
  },
  {
    name: "Trevor Chomba",
    role: "Halls of Residence Captain",
    image: "/images/student-council-trevor-chomba.jpeg",
    description:
      "Supports responsibility, order, and a positive residential experience.",
  },
  {
    name: "Caleb Kamau",
    role: "Academic Captain",
    image: "/images/student-council-caleb-kamau.jpeg",
    description:
      "Promotes academic focus, study discipline, and peer encouragement.",
  },
  {
    name: "Chibu Obieche",
    role: "Chapel and Mentorship Captain",
    image: "/images/student-council-chibu-obieche.jpeg",
    description:
      "Supports chapel life, mentorship, values, and character formation.",
  },
  {
    name: "Kawwagi",
    role: "Entertainment Captain",
    image: "/images/student-council-kawwagi.jpeg",
    description:
      "Encourages creativity, participation, and vibrant student activities.",
  },
];

export const studentLeaders: LeadershipPerson[] = [
  {
    name: "Academic Leader",
    role: "Student Leader",
    image: "/images/news-stem.jpg",
    description:
      "Encourages study discipline, academic focus, and peer support among learners.",
  },
  {
    name: "Boarding Leader",
    role: "Student Leader",
    image: "/images/gallery-hostel-state-house.jpeg",
    description:
      "Helps promote order, care, and responsibility within the boarding community.",
  },
  {
    name: "Sports Leader",
    role: "Student Leader",
    image: "/images/sports-day.jpg",
    description:
      "Encourages teamwork, sportsmanship, participation, and healthy competition.",
  },
  {
    name: "Dining Hall Leader",
    role: "Student Leader",
    image: "/images/gallery-dining-hall.jpeg",
    description:
      "Supports order, respect, and student responsibility during dining routines.",
  },
  {
    name: "Environment Leader",
    role: "Student Leader",
    image: "/images/gallery-campus-view.jpg",
    description:
      "Promotes cleanliness, environmental care, and pride in the school compound.",
  },
];

export const leaders = [principal];
