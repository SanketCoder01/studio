
export type Profile = {
  id?: string;
  name: string;
  avatar: string;
  title: string;
  about: string;
  cvUrl: string;
};

export type Education = {
  id?: string;
  school: string;
  degree: string;
  period: string;
};

export type Internship = {
  id?: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  memories: string;
  images: string[];
  certificateUrl?: string;
  reportUrl?: string;
};

export type Project = {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  introduction: string;
  technologies: string[];
  features: string[];
  reportUrl?: string;
};

export type Certification = {
  id?:string;
  name: string;
  issuer: string;
  date: string;
  imageUrl: string;
};

export type Contact = {
  id?: string;
  name: string;
  email: string;
  message: string;
  received: string;
  read: boolean;
};

export type PortfolioData = {
  profile: Profile;
  education: Education[];
  internships: Internship[];
  projects: Project[];
  ongoingProjects: Project[];
  certifications: Certification[];
  contacts: Contact[];
};
