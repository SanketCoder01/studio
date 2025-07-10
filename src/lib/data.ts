import type { PortfolioData } from '@/lib/types';

export const portfolioData: PortfolioData = {
  profile: {
    name: 'Sanket Gaikwad',
    avatar: 'https://placehold.co/400x400.png',
    title: 'Full Stack Developer & AI Enthusiast',
    about:
      "I'm a passionate developer with a knack for creating elegant solutions in the least amount of time. I love diving into new technologies and constantly expanding my skillset. My journey in tech has been driven by a curiosity to understand how things work and a desire to build things that make a difference. Currently exploring the world of AI and its applications.",
    cvUrl: '#',
  },
  education: [
    {
      id: 'edu1',
      school: 'University of Technology',
      degree: 'Bachelor of Science in Computer Science',
      period: '2019 - 2023',
    },
    {
      id: 'edu2',
      school: 'Tech Academy',
      degree: 'Advanced Web Development Bootcamp',
      period: '2023',
    },
  ],
  internships: [
    {
      id: 'int1',
      company: 'Innovate Corp',
      role: 'Software Engineer Intern',
      period: 'Summer 2022',
      description:
        'Worked on the core platform, contributing to both front-end and back-end services. Developed new features, fixed bugs, and participated in the full software development lifecycle.',
    },
  ],
  projects: [
    {
      id: 'proj1',
      title: 'E-commerce Platform',
      description:
        'A full-featured e-commerce website built with Next.js, TypeScript, and Tailwind CSS. Includes user authentication, product catalog, shopping cart, and a checkout process.',
      imageUrl: 'https://placehold.co/600x400.png',
      link: '#',
    },
    {
      id: 'proj2',
      title: 'AI-Powered Chatbot',
      description:
        'A customer service chatbot that uses natural language processing to understand and respond to user queries in real-time. Built with Python and integrated into a web interface.',
      imageUrl: 'https://placehold.co/600x400.png',
      link: '#',
    },
     {
      id: 'proj3',
      title: 'Portfolio Website',
      description:
        'This very portfolio website, designed to be dynamic and easily updatable through a custom admin panel. Showcases my skills in modern web development and design.',
      imageUrl: 'https://placehold.co/600x400.png',
      link: '#',
    },
  ],
  certifications: [
    {
      id: 'cert1',
      name: 'Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: '2023',
    },
    {
      id: 'cert2',
      name: 'GenAI Professional',
      issuer: 'Google Cloud',
      date: '2024',
    },
  ],
};
