export type LeadershipPerson = {
  name: string;
  role: string;
  image: string;
  description: string;
};

export const principal: LeadershipPerson = {
  name: "David Gideon Kariuki HSC",
  role: "Chief Principal",
  image: "/images/principal-david-kariuki.png",
  description:
    "The principal's welcome note positions Merishaw as a place where boys are mentored into confident, purposeful young men through strong academics, discipline, and holistic formation.",
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
    image: "/images/gallery-dormitory.jpeg",
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
    name: "School Captain",
    role: "Student Council",
    image: "/images/gallery-student-life-2.jpg",
    description:
      "Represents student voice and works with school leadership to promote responsibility, teamwork, and positive school culture.",
  },
  {
    name: "Deputy School Captain",
    role: "Student Council",
    image: "/images/gallery-student-life-3.jpg",
    description:
      "Supports the School Captain and helps coordinate student participation, peer mentorship, and school activities.",
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
    image: "/images/gallery-dormitory.jpeg",
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
