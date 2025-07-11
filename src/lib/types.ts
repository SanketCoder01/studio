
export type Profile = {
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
  period: string;
  description: string;
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
  reportUrl: string;
};

export type Certification = {
  id?:string;
  name: string;
  issuer: string;
  date: string;
  imageUrl: string;
};

export type PortfolioData = {
  profile: Profile;
  education: Education[];
  internships: Internship[];
  projects: Project[];
  certifications: Certification[];
};
