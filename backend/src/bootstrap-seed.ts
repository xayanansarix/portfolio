import fs from 'fs';
import path from 'path';
import type { Core } from '@strapi/strapi';

const TCIL_DESCRIPTION =
  'As Web Development Intern at Telecommunications Consultants India Limited, I built their production website with React, Vite, and Bootstrap backed by Strapi CMS. I owned the front-end UI and collection-driven content models so the team could edit pages without code deploys.';
const TCIL_IMPACT = 'Shipped a CMS-editable production site with dynamic collection pages.';

const AIQ_DESCRIPTION =
  'I designed and implemented a post-quantum document verification system for national digital identity — combining AES-256 with Kyber (ML-KEM) and Dilithium (ML-DSA) for confidentiality and authenticity. Built the Flask crypto APIs, React/TypeScript client, and MongoDB-backed verification flow end to end.';
const AIQ_IMPACT = 'End-to-end Kyber + Dilithium verification pipeline with an O(n) encryption path.';

/**
 * One-time content seed for Ayan's portfolio. Each block checks whether data
 * already exists before writing, so this is safe to run on every server boot
 * (e.g. after dev-server restarts triggered by file changes) without creating
 * duplicates or overwriting anything entered manually in the admin panel.
 */
export async function seedContent(strapi: Core.Strapi) {
  const steps: Array<[string, () => Promise<void>]> = [
    ['seedAbout', () => seedAbout(strapi)],
    ['backfillAboutSocialsAndResume', () => backfillAboutSocialsAndResume(strapi)],
    ['seedSkills', () => seedSkills(strapi)],
    ['seedExperiences', () => seedExperiences(strapi)],
    ['seedEducation', () => seedEducation(strapi)],
    ['backfillEducationScoreType', () => backfillEducationScoreType(strapi)],
    ['seedCertifications', () => seedCertifications(strapi)],
    ['seedProjects', () => seedProjects(strapi)],
    ['backfillProjectCopy', () => backfillProjectCopy(strapi)],
  ];

  for (const [name, run] of steps) {
    try {
      await run();
    } catch (error) {
      strapi.log.warn(
        `Bootstrap step "${name}" failed: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
}

async function seedAbout(strapi: Core.Strapi) {
  const existing = await strapi.documents('api::about.about').findFirst();
  const heroSubheadline =
    "I'm Ayan — a Computer Science student and front-end developer who enjoys turning complex problems into clean, working software, from CMS-driven websites to post-quantum secure systems.";

  if (existing) {
    if (!existing.heroSubheadline) {
      await strapi
        .documents('api::about.about')
        .update({ documentId: existing.documentId, data: { heroSubheadline } });
    }
    return;
  }

  await strapi.documents('api::about.about').create({
    data: {
      name: 'Ayan Ansari',
      title: 'Aspiring Web Developer',
      badge: 'Open to internships & entry-level roles',
      heroHeadline: 'Aspiring web developer building secure, modern web experiences.',
      heroSubheadline,
      bio:
        "I'm a Computer Science Engineering student at Kalinga Industrial Institute of Technology (2023–2027), motivated by problem-solving and continuous learning. I enjoy contributing to meaningful projects and collaborating with teams to deliver real results.\n\n" +
        "During my internship at Telecommunications Consultants India Limited, I helped build the TCIL website with React, Bootstrap, and Strapi — including dynamic, CMS-editable collections. I'm currently building a post-quantum secure document verification system for national digital identity, combining cryptography with full-stack development.",
      email: 'ayan001865@gmail.com',
      phone: '+91 9810919431',
      location: 'Noida, India',
      githubUrl: 'https://github.com/xayanansarix',
      linkedinUrl: 'https://www.linkedin.com/in/ayan-ansari1865',
      leetcodeUsername: 'BilluBadshah10',
    },
  });
}

/** Fill social links / LeetCode / resume if About exists but fields are empty. */
async function backfillAboutSocialsAndResume(strapi: Core.Strapi) {
  const about = await strapi.documents('api::about.about').findFirst({
    populate: ['resume'],
  });
  if (!about) return;

  const patch: Record<string, unknown> = {};
  if (!about.githubUrl) patch.githubUrl = 'https://github.com/xayanansarix';
  if (!about.linkedinUrl) patch.linkedinUrl = 'https://www.linkedin.com/in/ayan-ansari1865';
  if (!about.leetcodeUsername) patch.leetcodeUsername = 'BilluBadshah10';

  if (!about.resume) {
    const resumeId = await uploadResumeIfPresent(strapi);
    if (resumeId) patch.resume = resumeId;
  }

  if (Object.keys(patch).length === 0) return;

  await strapi.documents('api::about.about').update({
    documentId: about.documentId,
    data: patch,
  });
}

async function uploadResumeIfPresent(strapi: Core.Strapi): Promise<number | null> {
  const candidates = [
    path.resolve(process.cwd(), '../frontend/public/Ayan_Ansari_Resume.pdf'),
    path.resolve(process.cwd(), '../pic_resume.pdf'),
    path.resolve(process.cwd(), 'public/Ayan_Ansari_Resume.pdf'),
  ];

  const filePath = candidates.find((p) => fs.existsSync(p));
  if (!filePath) {
    strapi.log.warn('Resume PDF not found — skip attaching to About.resume');
    return null;
  }

  const stats = fs.statSync(filePath);
  const uploaded = await strapi.plugin('upload').service('upload').upload({
    data: {
      fileInfo: {
        name: 'Ayan_Ansari_Resume.pdf',
        alternativeText: 'Ayan Ansari Resume',
      },
    },
    files: {
      filepath: filePath,
      originalFilename: 'Ayan_Ansari_Resume.pdf',
      mimetype: 'application/pdf',
      size: stats.size,
    },
  });

  const file = Array.isArray(uploaded) ? uploaded[0] : uploaded;
  return file?.id ?? null;
}

async function seedSkills(strapi: Core.Strapi) {
  const count = await strapi.documents('api::skill.skill').count({});
  if (count > 0) {
    await backfillSkillProficiency(strapi);
    return;
  }

  const technical: Array<{ name: string; proficiency: number }> = [
    { name: 'HTML5 & CSS3', proficiency: 90 },
    { name: 'Bootstrap', proficiency: 85 },
    { name: 'Responsive Web Design', proficiency: 88 },
    { name: 'React & Vite', proficiency: 88 },
    { name: 'Strapi CMS', proficiency: 80 },
    { name: 'Node.js', proficiency: 72 },
    { name: 'MongoDB (Basics)', proficiency: 65 },
    { name: 'HTTP & HTTPS Basics', proficiency: 78 },
    { name: 'Git & VS Code', proficiency: 88 },
  ];
  const soft: Array<{ name: string; proficiency: number }> = [
    { name: 'Problem Solving', proficiency: 90 },
    { name: 'Quick Learner', proficiency: 92 },
    { name: 'Team Collaboration', proficiency: 85 },
    { name: 'Time Management', proficiency: 82 },
  ];

  let order = 0;
  for (const skill of technical) {
    await strapi.documents('api::skill.skill').create({
      data: { name: skill.name, category: 'Technical', proficiency: skill.proficiency, order: order++ },
    });
  }
  order = 0;
  for (const skill of soft) {
    await strapi.documents('api::skill.skill').create({
      data: { name: skill.name, category: 'Soft', proficiency: skill.proficiency, order: order++ },
    });
  }
}

/** Fill proficiency for older skill rows created before the field existed. */
async function backfillSkillProficiency(strapi: Core.Strapi) {
  const defaults: Record<string, number> = {
    'HTML5 & CSS3': 90,
    Bootstrap: 85,
    'Responsive Web Design': 88,
    'React & Vite': 88,
    'Strapi CMS': 80,
    'Node.js': 72,
    'MongoDB (Basics)': 65,
    'HTTP & HTTPS Basics': 78,
    'Git & VS Code': 88,
    'Problem Solving': 90,
    'Quick Learner': 92,
    'Team Collaboration': 85,
    'Time Management': 82,
  };

  const skills = await strapi.documents('api::skill.skill').findMany({
    limit: 100,
  });

  for (const skill of skills) {
    if (skill.proficiency != null && skill.proficiency > 0) continue;
    const proficiency = defaults[skill.name as string] ?? 70;
    await strapi.documents('api::skill.skill').update({
      documentId: skill.documentId,
      data: { proficiency },
    });
  }
}

async function seedExperiences(strapi: Core.Strapi) {
  const count = await strapi.documents('api::experience.experience').count({});
  if (count > 0) return;

  await strapi.documents('api::experience.experience').create({
    data: {
      company: 'Telecommunications Consultants India Limited',
      role: 'Web Development Intern',
      startDate: '2026-05-04',
      endDate: '2026-06-30',
      isCurrent: false,
      description:
        'Built the TCIL website using React, Vite, and Bootstrap, backed by a Strapi CMS for dynamic, collection-driven content editing.',
      technologies: 'React, Vite, Bootstrap, Strapi',
      skillsDeveloped: 'Bootstrap design, web development, dynamic editing of CMS collections',
      order: 0,
    },
  });
}

async function seedEducation(strapi: Core.Strapi) {
  const count = await strapi.documents('api::education.education').count({});
  if (count > 0) {
    await ensureSchoolEducation(strapi);
    return;
  }

  await strapi.documents('api::education.education').create({
    data: {
      institution: 'Mayoor School, Noida',
      degree: 'Class X',
      startDate: '2008-04-01',
      endDate: '2021-03-31',
      cgpa: 95,
      scoreType: 'Grade',
      coursework: 'General Education',
      order: 0,
    },
  });

  await strapi.documents('api::education.education').create({
    data: {
      institution: 'Mayoor School, Noida',
      degree: 'Class XII',
      startDate: '2008-04-01',
      endDate: '2023-03-31',
      cgpa: 87.3,
      scoreType: 'Grade',
      coursework: 'Science',
      order: 1,
    },
  });

  await strapi.documents('api::education.education').create({
    data: {
      institution: 'Kalinga Industrial Institute of Technology',
      degree: 'Bachelor in Computer Science Engineering',
      startDate: '2023-08-01',
      endDate: '2027-06-30',
      cgpa: 8.22,
      scoreType: 'CGPA',
      coursework: 'Data Structures, OOPS, DBMS, Web Development, Machine Learning',
      order: 2,
    },
  });
}

/** Ensure Class X / XII exist even if only college was seeded earlier. */
async function ensureSchoolEducation(strapi: Core.Strapi) {
  const all = await strapi.documents('api::education.education').findMany({ limit: 50 });
  const hasX = all.some(
    (r) => /^class\s*x\b/i.test(String(r.degree)) && !/^class\s*xii\b/i.test(String(r.degree))
  );
  const hasXii = all.some((r) => /class\s*xii\b/i.test(String(r.degree)));

  if (!hasX) {
    await strapi.documents('api::education.education').create({
      data: {
        institution: 'Mayoor School, Noida',
        degree: 'Class X',
        startDate: '2008-04-01',
        endDate: '2021-03-31',
        cgpa: 95,
        scoreType: 'Grade',
        coursework: 'General Education',
        order: -2,
      },
    });
  }

  if (!hasXii) {
    await strapi.documents('api::education.education').create({
      data: {
        institution: 'Mayoor School, Noida',
        degree: 'Class XII',
        startDate: '2008-04-01',
        endDate: '2023-03-31',
        cgpa: 87.3,
        scoreType: 'Grade',
        coursework: 'Science',
        order: -1,
      },
    });
  }
}

/** Mark Class X / XII (and scores > 10) as Grade so the UI shows Grade, not CGPA. */
async function backfillEducationScoreType(strapi: Core.Strapi) {
  const rows = await strapi.documents('api::education.education').findMany({
    limit: 100,
  });

  for (const row of rows) {
    const degree = String(row.degree ?? '');
    const score = row.cgpa != null ? Number(row.cgpa) : null;
    const isSchool =
      /class\s*(x|xii|10|12)\b/i.test(degree) || (score != null && score > 10);
    const nextType = isSchool ? 'Grade' : 'CGPA';

    if (row.scoreType === nextType) continue;

    await strapi.documents('api::education.education').update({
      documentId: row.documentId,
      data: { scoreType: nextType },
    });
  }
}

async function seedCertifications(strapi: Core.Strapi) {
  const count = await strapi.documents('api::certification.certification').count({});
  if (count > 0) return;

  const certifications = [
    {
      title: 'Complete Full-Stack Web Development Bootcamp',
      provider: 'Udemy',
      date: '2025-01-01',
    },
    {
      title: 'Ultimate Web Development Course 2025 – Build Modern Websites',
      provider: 'Udemy',
      date: '2025-01-01',
    },
    {
      title: 'Machine Learning A-Z: AI, Python & R + ChatGPT',
      provider: 'Udemy',
      date: '2025-01-01',
    },
    {
      title: 'Machine Learning Professional Ethics & Decision Making',
      provider: 'Udemy',
      date: '2026-01-01',
    },
    {
      title: 'Business for Good: Fundamentals of Corporate Responsibility',
      provider: 'Coursera',
      date: '2026-01-01',
    },
    {
      title: 'Corporate Governance & Ethical Decision Making for Success in the Tech Industry',
      provider: 'Coursera',
      date: '2026-01-01',
    },
  ];

  let order = 0;
  for (const cert of certifications) {
    await strapi
      .documents('api::certification.certification')
      .create({ data: { ...cert, order: order++ } });
  }
}

async function seedProjects(strapi: Core.Strapi) {
  const tcil = await strapi
    .documents('api::project.project')
    .findFirst({ filters: { title: { $contains: 'TCIL' } } });

  if (!tcil) {
    await strapi.documents('api::project.project').create({
      status: 'published',
      data: {
        title: 'TCIL Website',
        description: TCIL_DESCRIPTION,
        technologies: 'React, Vite, Bootstrap, Strapi',
        impact: TCIL_IMPACT,
        featured: true,
        startDate: '2026-05-04',
        endDate: '2026-06-30',
        order: 0,
      },
    });
  }

  const aiQuantum = await strapi
    .documents('api::project.project')
    .findFirst({ filters: { title: { $contains: 'AI-Quantum' } } });

  if (!aiQuantum) {
    await strapi.documents('api::project.project').create({
      status: 'published',
      data: {
        title: 'AI-Quantum Privacy Architecture for National Digital Identity Systems',
        description: AIQ_DESCRIPTION,
        technologies: 'Python (Flask), React (TypeScript), MongoDB, AES-256, ML-KEM, ML-DSA',
        impact: AIQ_IMPACT,
        featured: true,
        startDate: '2026-01-01',
        order: 1,
      },
    });
  }
}

/** Refresh project blurbs to the stronger recruiter-facing copy. */
async function backfillProjectCopy(strapi: Core.Strapi) {
  const tcil = await strapi
    .documents('api::project.project')
    .findFirst({ filters: { title: { $contains: 'TCIL' } } });

  if (tcil && tcil.description !== TCIL_DESCRIPTION) {
    await strapi.documents('api::project.project').update({
      documentId: tcil.documentId,
      status: 'published',
      data: {
        description: TCIL_DESCRIPTION,
        technologies: 'React, Vite, Bootstrap, Strapi',
        impact: TCIL_IMPACT,
      },
    });
  }

  const aiQuantum = await strapi
    .documents('api::project.project')
    .findFirst({ filters: { title: { $contains: 'AI-Quantum' } } });

  if (aiQuantum && aiQuantum.description !== AIQ_DESCRIPTION) {
    await strapi.documents('api::project.project').update({
      documentId: aiQuantum.documentId,
      status: 'published',
      data: {
        description: AIQ_DESCRIPTION,
        technologies: 'Python (Flask), React (TypeScript), MongoDB, AES-256, ML-KEM, ML-DSA',
        impact: AIQ_IMPACT,
      },
    });
  }
}
