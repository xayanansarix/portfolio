export const profile = {
  name: "Ayan Ansari",
  initials: "AA",
  role: "Software Engineer",
  subtitle: "CS Undergrad",
  location: "Noida, India",
  email: "ayan001865@gmail.com",
  phone: "+91 9810919431",
  badge: "CS Undergrad & Software Engineer",
  headline: ["Building", "Secure", "Modern", "Software."],
  summary:
    "Computer Science student at Kalinga Industrial Institute of Technology building CMS-driven web apps and post-quantum secure systems. Obsessed with clean code, practical engineering, and shipping real products.",
  resumeUrl: "/Ayan_Ansari_Resume.pdf",
  githubUrl: "https://github.com/xayanansarix",
  linkedinUrl: "https://www.linkedin.com/in/ayan-ansari1865",
  terminalLine: "print('Open to internships & entry-level roles!')",
  terminalOutput: ">> Let's build something secure and useful together.",
  stats: [
    { value: "8.22", label: "CGPA" },
    { value: "2+", label: "Projects shipped" },
    { value: "6", label: "Certificates" },
    { value: "2027", label: "Graduating" },
  ],
};

export const milestones = [
  {
    period: "2023 – 2027",
    title: "B.Tech in Computer Science & Engineering",
    org: "Kalinga Industrial Institute of Technology (CGPA: 8.22)",
    description:
      "Coursework in Data Structures, OOP, DBMS, Web Development, and Machine Learning. Focused on shipping practical full-stack projects alongside academics.",
  },
  {
    period: "May – Jun 2026",
    title: "Web Development Intern",
    org: "Telecommunications Consultants India Limited (TCIL)",
    description:
      "Built the TCIL website with React, Vite, and Bootstrap, backed by Strapi CMS for dynamic, collection-driven content editing across production pages.",
  },
  {
    period: "2026 – Present",
    title: "Independent Project — Post-Quantum Security",
    org: "AI-Quantum Privacy Architecture",
    description:
      "Designing a document verification system for national digital identity using AES-256, Kyber (ML-KEM), and Dilithium (ML-DSA).",
  },
];

export const skillGroups = {
  Languages: [
    { name: "JavaScript / TypeScript", level: 85 },
    { name: "HTML5 & CSS3", level: 90 },
    { name: "Python", level: 75 },
    { name: "SQL / NoSQL", level: 70 },
  ],
  "Frameworks & Libraries": [
    { name: "React & Vite", level: 88 },
    { name: "Node.js", level: 72 },
    { name: "Bootstrap / Tailwind", level: 86 },
    { name: "Strapi CMS", level: 80 },
    { name: "Flask", level: 68 },
  ],
  "Tools & DevOps": [
    { name: "Git & VS Code", level: 88 },
    { name: "MongoDB", level: 65 },
    { name: "HTTP / HTTPS", level: 78 },
    { name: "Problem Solving", level: 90 },
  ],
} as const;

export type SkillCategory = keyof typeof skillGroups;

export const projects = [
  {
    title: "TCIL Website",
    blurb:
      "As Web Development Intern at TCIL, I built their production site with React, Vite, and Bootstrap on a Strapi CMS. I owned the front-end UI and collection-driven content so the team could edit pages without code deploys.",
    tags: ["React", "Bootstrap", "Strapi", "Vite"],
    badge: "Featured",
    metric: "CMS-editable production site",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    details: "#contact",
  },
  {
    title: "AI-Quantum Privacy Architecture",
    blurb:
      "I designed a post-quantum document verification system for national digital identity — AES-256 plus Kyber (ML-KEM) and Dilithium (ML-DSA). Built the Flask crypto APIs, React/TypeScript client, and MongoDB verification flow end to end.",
    tags: ["Python/Flask", "React", "TypeScript", "PQC", "MongoDB"],
    badge: "Security",
    metric: "Kyber + Dilithium verification",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    details: "#contact",
  },
];

export const certificates = [
  {
    title: "Complete Full-Stack Web Development Bootcamp",
    provider: "Udemy",
    issued: "Issued 2025",
  },
  {
    title: "Ultimate Web Development Course 2025 – Build Modern Websites",
    provider: "Udemy",
    issued: "Issued 2025",
  },
  {
    title: "Machine Learning A-Z: AI, Python & R + ChatGPT",
    provider: "Udemy",
    issued: "Issued 2025",
  },
  {
    title: "Machine Learning Professional Ethics & Decision Making",
    provider: "Udemy",
    issued: "Issued 2026",
  },
  {
    title: "Business for Good: Fundamentals of Corporate Responsibility",
    provider: "Coursera",
    issued: "Issued 2026",
  },
  {
    title: "Corporate Governance & Ethical Decision Making for Success in the Tech Industry",
    provider: "Coursera",
    issued: "Issued 2026",
  },
];
