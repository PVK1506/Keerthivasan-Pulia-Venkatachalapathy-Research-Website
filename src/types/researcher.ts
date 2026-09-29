export interface Publication {
  id: string;
  title: string;
  authors: string[];
  year: number;
  venue: string;
  venueType: 'journal' | 'conference' | 'preprint' | 'chapter';
  doi?: string;
  pdfUrl?: string;
  codeUrl?: string;
  datasetUrl?: string;
  slidesUrl?: string;
  abstract: string;
  citations: number;
  highlighted?: boolean;
  topicId: string;
  bibtex: string;
  pages?: string;
  volume?: string;
  issue?: string;
}

export interface ResearchInterest {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  keyQuestions: string[];
  methodologies: string[];
  activeProjects: string[];
  iconName: string;
  imageUrl?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  institution: string;
  year: string;
  dissertation?: string;
  advisor?: string;
  honors?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  department?: string;
  period: string;
  description?: string;
}

export interface GrantItem {
  id: string;
  title: string;
  fundingAgency: string;
  amount: string;
  period: string;
  role: string;
}

export interface AwardItem {
  id: string;
  title: string;
  conferringBody: string;
  year: string;
  description?: string;
}

export interface TeachingItem {
  id: string;
  courseCode: string;
  courseTitle: string;
  role: string;
  institution: string;
  terms: string;
}

export interface ServiceItem {
  id: string;
  category: 'Editor / PC' | 'Reviewer' | 'Institutional' | 'Community';
  details: string;
}

export interface EngagementItem {
  id: string;
  type: 'presentation' | 'visit' | 'keynote' | 'workshop';
  title: string;
  role: string; // e.g. "Invited Speaker", "Keynote", "Visiting Scholar", "Panelist"
  eventOrHost: string; // e.g. "NeurIPS 2025 Workshop", "Max Planck Institute for Mathematics in the Sciences"
  location: string; // e.g. "Vancouver, BC, Canada", "Leipzig, Germany"
  date: string; // e.g. "December 2025"
  talkTitle?: string;
  description: string;
  hostPerson?: string; // e.g. "Host: Prof. Jürgen Jost"
  slidesUrl?: string;
  videoUrl?: string;
  photos: string[]; // Base64 data URLs or image links
}

export interface NewsItem {
  id: string;
  date: string; // e.g. "July 2026"
  content: string;
  tag?: string; // e.g. "Paper", "Travel Grant", "Talk", "Milestone"
  link?: string;
}

export interface SocialLinks {
  googleScholar: string;
  linkedin: string;
  orcid: string;
  orcidId: string;
  cvUrl: string;
  github?: string;
  researchGate?: string;
  twitter?: string;
  email: string;
}

export interface AcademicMetrics {
  totalCitations: number;
  hIndex: number;
  i10Index: number;
  publicationsCount: number;
}

export interface ResearcherProfile {
  name: string;
  title: string;
  roleType: 'research_scholar' | 'postdoc' | 'faculty';
  advisor: string;
  advisorUrl?: string;
  coAdvisor?: string;
  phdProgram: string;
  expectedGraduation: string;
  researchStage: string; // e.g. "Doctoral Candidate (Post-Comprehensive / Final Year)"
  jobMarketStatus: string; // e.g. "Actively seeking Postdoctoral & Research Scientist positions (Fall 2026)"
  affiliation: string;
  department: string;
  labName: string;
  location: string;
  avatarUrl: string;
  bio: string[];
  researchStatement: string;
  links: SocialLinks;
  metrics: AcademicMetrics;
  interests: ResearchInterest[];
  publications: Publication[];
  engagements: EngagementItem[];
  news: NewsItem[];
  education: EducationItem[];
  experience: ExperienceItem[];
  grants: GrantItem[];
  awards: AwardItem[];
  teaching: TeachingItem[];
  service: ServiceItem[];
}
