export const STRAPI_URL = import.meta.env.VITE_STRAPI_URL ?? "http://localhost:1337";

export interface StrapiMedia {
  url: string;
  alternativeText?: string | null;
}

export interface About {
  name: string;
  title: string | null;
  badge: string | null;
  heroHeadline: string | null;
  heroSubheadline: string | null;
  bio: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
  leetcodeUsername: string | null;
  profilePhoto: StrapiMedia | null;
  resume: StrapiMedia | null;
}

export interface Skill {
  id: number;
  name: string;
  category: "Technical" | "Soft";
  proficiency: number | null;
  order: number;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  startDate: string | null;
  endDate: string | null;
  isCurrent: boolean;
  description: string | null;
  technologies: string | null;
  skillsDeveloped: string | null;
  order: number;
}

export type ScoreType = 'Grade' | 'Percentage' | 'CGPA';

export interface Education {
  id: number;
  institution: string;
  degree: string;
  startDate: string | null;
  endDate: string | null;
  cgpa: number | null;
  scoreType?: ScoreType | null;
  coursework: string | null;
  order: number;
}

/** School board marks show as Grade (%); college degrees use CGPA. */
export function resolveScoreType(edu: Pick<Education, 'degree' | 'cgpa' | 'scoreType'>): ScoreType {
  if (edu.scoreType === 'Grade' || edu.scoreType === 'Percentage' || edu.scoreType === 'CGPA') {
    return edu.scoreType === 'Percentage' ? 'Grade' : edu.scoreType;
  }
  if (edu.cgpa != null && edu.cgpa > 10) return 'Grade';
  if (/class\s*(x|xii|10|12)\b/i.test(edu.degree ?? '')) return 'Grade';
  return 'CGPA';
}

export function formatEducationScore(edu: Pick<Education, 'degree' | 'cgpa' | 'scoreType'>): string | null {
  if (edu.cgpa == null) return null;
  return resolveScoreType(edu) === 'CGPA'
    ? `CGPA: ${edu.cgpa}`
    : `Grade: ${edu.cgpa}%`;
}

export interface Project {
  id: number;
  documentId: string;
  title: string;
  description: string | null;
  technologies: string | null;
  impact: string | null;
  repoUrl: string | null;
  demoUrl: string | null;
  featured: boolean;
  coverImage: StrapiMedia | null;
  order: number;
}

export interface Certification {
  id: number;
  title: string;
  provider: string;
  date: string | null;
  credentialUrl: string | null;
  image: StrapiMedia | null;
  order: number;
}

interface StrapiListResponse<T> {
  data: T[];
}

interface StrapiSingleResponse<T> {
  data: T | null;
}

interface StrapiPaginatedResponse {
  meta: { pagination: { total: number } };
}

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${STRAPI_URL}/api${path}`);
  if (!res.ok) {
    throw new Error(`Strapi request failed (${res.status}): ${path}`);
  }
  return res.json() as Promise<T>;
}

export async function getAbout(): Promise<About | null> {
  const { data } = await request<StrapiSingleResponse<About>>(
    "/about?populate[profilePhoto]=true&populate[resume]=true",
  );
  return data;
}

export async function getSkills(): Promise<Skill[]> {
  const { data } = await request<StrapiListResponse<Skill>>(
    "/skills?sort=order:asc&pagination[pageSize]=100",
  );
  return data;
}

export async function getExperiences(): Promise<Experience[]> {
  const { data } = await request<StrapiListResponse<Experience>>(
    "/experiences?sort=order:asc",
  );
  return data;
}

export async function getEducation(): Promise<Education[]> {
  const { data } = await request<StrapiListResponse<Education>>(
    "/educations?sort=order:asc",
  );
  return data;
}

export async function getProjects(): Promise<Project[]> {
  const { data } = await request<StrapiListResponse<Project>>(
    "/projects?sort=order:asc&populate=coverImage",
  );
  return data;
}

export async function getCertifications(): Promise<Certification[]> {
  const { data } = await request<StrapiListResponse<Certification>>(
    "/certifications?sort=order:asc&pagination[pageSize]=100&populate=image",
  );
  return data ?? [];
}

export async function getProjectsCount(): Promise<number> {
  const { meta } = await request<StrapiPaginatedResponse>("/projects?pagination[pageSize]=1");
  return meta.pagination.total;
}

export async function getCertificationsCount(): Promise<number> {
  const { meta } = await request<StrapiPaginatedResponse>(
    "/certifications?pagination[pageSize]=1",
  );
  return meta.pagination.total;
}

export async function submitMessage(payload: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  const res = await fetch(`${STRAPI_URL}/api/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: payload }),
  });
  if (!res.ok) {
    throw new Error(`Failed to submit message (${res.status})`);
  }
}

export function getMediaUrl(media: StrapiMedia | null | undefined): string | undefined {
  if (!media?.url) return undefined;
  return media.url.startsWith("http") ? media.url : `${STRAPI_URL}${media.url}`;
}

export function formatYearRange(
  start: string | null | undefined,
  end: string | null | undefined,
  isCurrent = false,
): string {
  const startYear = start ? new Date(start).getFullYear().toString() : "";
  if (isCurrent) return startYear ? `${startYear} – Present` : "Present";
  const endYear = end ? new Date(end).getFullYear().toString() : "";
  if (startYear && endYear) {
    return startYear === endYear ? startYear : `${startYear} – ${endYear}`;
  }
  return startYear || endYear || "";
}

export function formatMonthYearRange(
  start: string | null | undefined,
  end: string | null | undefined,
  isCurrent = false,
): string {
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  if (!start && !end) return "";
  if (isCurrent && start) return `${fmt(start)} – Present`;
  if (start && end) return `${fmt(start)} – ${fmt(end)}`;
  if (start) return fmt(start);
  return end ? fmt(end) : "";
}

export function techList(technologies: string | null | undefined): string[] {
  if (!technologies) return [];
  return technologies
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}
