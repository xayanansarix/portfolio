export const profile = {
  name: "Ayan Ansari",
  initials: "AA",
  title: "Aspiring Software Engineer",
  role: "Software Engineer",
  location: "Noida, India",
  email: "ayan001865@gmail.com",
  phone: "+91 9810919431",
  badge: "Open to software engineering internships & entry-level roles",
  heroHeadline: "Software engineer building secure, scalable systems.",
  summary:
    "I'm Ayan — a Computer Science and Engineering student who enjoys solving problems across the full stack, from web platforms to cryptographic security systems.",
  bio: "I'm a Computer Science Engineering student at Kalinga Industrial Institute of Technology (2023–2027) with a strong foundation in data structures, algorithms, databases, and machine learning. I care about writing software that is correct, secure, and maintainable — not just code that works once.",
  photoUrl: "/profile.jpg",
  resumeUrl: "/Ayan_Ansari_Resume.pdf",
  githubUrl: "https://github.com/xayanansarix",
  linkedinUrl: "https://www.linkedin.com/in/ayan-ansari1865",
  leetcodeUsername: "BilluBadshah10",
  terminalLine: "print('Open to internships & entry-level roles!')",
  terminalOutput: ">> Let's build something secure and useful together.",
  stats: [
    { value: "8.22", label: "CGPA" },
    { value: "2+", label: "Projects shipped" },
    { value: "7", label: "Certificates" },
    { value: "2027", label: "Graduating" },
  ],
};

export const milestones = [
  {
    period: "2008 – 2021",
    title: "Class X",
    org: "Mayoor School, Noida (Grade: 95%)",
    description: "Coursework includes General Education.",
  },
  {
    period: "2008 – 2023",
    title: "Class XII",
    org: "Mayoor School, Noida (Grade: 87.3%)",
    description: "Coursework includes Science.",
  },
  {
    period: "2023 – 2027",
    title: "Bachelor in Computer Science Engineering",
    org: "Kalinga Industrial Institute of Technology (CGPA: 8.22)",
    description:
      "Coursework includes Data Structures, OOPS, DBMS, Web Development, Machine Learning.",
  },
  {
    period: "May 2026 – Jun 2026",
    title: "Web Development Intern",
    org: "Telecommunications Consultants India Limited",
    description:
      "Built the TCIL website using React, Vite, and Bootstrap, backed by a Strapi CMS for dynamic, collection-driven content editing.",
  },
];

export const skillGroups = {
  Languages: [
    { name: "HTML5 & CSS3", level: 90 },
    { name: "JavaScript / TypeScript", level: 85 },
  ],
  "Frameworks & Libraries": [
    { name: "React & Vite", level: 88 },
    { name: "Bootstrap", level: 85 },
    { name: "Responsive Web Design", level: 88 },
    { name: "Strapi CMS", level: 80 },
    { name: "Node.js", level: 72 },
  ],
  "Tools & DevOps": [
    { name: "Git & VS Code", level: 88 },
    { name: "MongoDB (Basics)", level: 65 },
    { name: "HTTP & HTTPS Basics", level: 78 },
    { name: "Problem Solving", level: 90 },
    { name: "Quick Learner", level: 92 },
    { name: "Team Collaboration", level: 85 },
    { name: "Time Management", level: 82 },
  ],
} as const;

export type SkillCategory = keyof typeof skillGroups;

export const projects = [
  {
    title: "TCIL Website",
    blurb:
      "As Web Development Intern at Telecommunications Consultants India Limited, I built their production website with React, Vite, and Bootstrap backed by Strapi CMS. I owned the front-end UI and collection-driven content models so the team could edit pages without code deploys.",
    tags: ["React", "Vite", "Bootstrap", "Strapi"],
    badge: "Featured",
    metric: "CMS-editable production site",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    details: "#contact",
    repoUrl: null as string | null,
  },
  {
    title: "AI-Quantum Privacy Architecture for National Digital Identity Systems",
    blurb:
      "I designed and implemented a post-quantum document verification system for national digital identity — combining AES-256 with Kyber (ML-KEM) and Dilithium (ML-DSA) for confidentiality and authenticity. Built the Flask crypto APIs, React/TypeScript client, and MongoDB-backed verification flow end to end.",
    tags: ["Python/Flask", "React", "TypeScript", "MongoDB", "PQC"],
    badge: "Featured",
    metric: "Kyber + Dilithium verification",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    details: "#contact",
    repoUrl: null as string | null,
  },
];

export const certificates = [
  {
    title: "Complete Full-Stack Web Development Bootcamp",
    provider: "Udemy",
    issued: "Issued 2025",
    href: null as string | null,
  },
  {
    title: "Ultimate Web Development Course 2025 – Build Modern Websites",
    provider: "Udemy",
    issued: "Issued 2025",
    href: null as string | null,
  },
  {
    title: "Machine Learning A-Z: AI, Python & R + ChatGPT",
    provider: "Udemy",
    issued: "Issued 2025",
    href: null as string | null,
  },
  {
    title: "Generative AI Introduction and Applications",
    provider: "Coursera",
    issued: "Issued 2026",
    href: "https://coursera.org/share/d48e459f16cf6b832ee77b9ad5ceb15f",
  },
  {
    title: "Generative AI Prompt Engineering Basics",
    provider: "Coursera",
    issued: "Issued 2026",
    href: "https://coursera.org/share/7f7d6c61ac61a02c40b8d127dcb78a87",
  },
  {
    title: "Prompt Engineering for ChatGPT",
    provider: "Coursera",
    issued: "Issued 2026",
    href: "https://coursera.org/share/c4cc599f081d406b329019a48a385d34",
  },
  {
    title: "Data Analysis with Python",
    provider: "Coursera",
    issued: "Issued 2026",
    href: "https://coursera.org/share/3cd674cbf83c906d471c3f624b96963e",
  },
];
