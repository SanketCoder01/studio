
import type { PortfolioData } from '@/lib/types';

export const portfolioData: PortfolioData = {
  profile: {
    id: 'profile1',
    name: 'Sanket Gaikwad',
    avatar: 'https://placehold.co/400x400.png',
    title: 'Full Stack Developer & AI Enthusiast',
    about:
      "I'm a passionate developer with a knack for creating elegant solutions in the least amount of time. I love diving into new technologies and constantly expanding my skillset. My journey in tech has been driven by a curiosity to understand how things work and a desire to build things that make a difference. Currently exploring the world of AI and its applications.",
    cvUrl: '',
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
      startDate: '2022-06-01',
      endDate: '2022-08-31',
      location: 'Remote',
      description:
        'Worked on the core platform, contributing to both front-end and back-end services. Developed new features, fixed bugs, and participated in the full software development lifecycle.',
      memories: 'This was a fantastic learning experience where I got to collaborate with senior engineers and contribute to a real-world product. One of my favorite memories was the weekly demo day where we showcased our work to the entire team.',
      images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
      certificateUrl: '',
      reportUrl: '',
    },
  ],
  projects: [
    {
      id: 'proj1',
      title: 'E-commerce Platform',
      description: 'A full-featured e-commerce website built with Next.js, TypeScript, and Tailwind CSS.',
      imageUrl: 'https://placehold.co/600x400.png',
      link: '#',
      introduction: 'This project is a comprehensive e-commerce solution designed to provide a seamless shopping experience. It features a modern, responsive interface and a robust backend to manage products, users, and orders.',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Prisma'],
      features: ['User Authentication (NextAuth)', 'Product Catalog with Filtering', 'Shopping Cart Functionality', 'Secure Checkout with Stripe', 'Admin Dashboard for Product Management'],
      reportUrl: '',
    },
    {
      id: 'proj2',
      title: 'AI-Powered Chatbot',
      description: 'A customer service chatbot that uses natural language processing to respond to user queries.',
      imageUrl: 'https://placehold.co/600x400.png',
      link: '#',
      introduction: 'This AI-powered chatbot was developed to automate customer support. It leverages natural language processing to understand user intent and provide accurate, real-time responses, improving efficiency and user satisfaction.',
      technologies: ['Python', 'Flask', 'NLTK', 'React', 'WebSocket'],
      features: ['Natural Language Understanding', 'Real-time Responses', 'Conversation History', 'Integration with Web Interfaces', 'Sentiment Analysis'],
      reportUrl: '',
    },
     {
      id: 'proj3',
      title: 'Portfolio Website',
      description: 'This very portfolio website, designed to be dynamic and easily updatable through a custom admin panel.',
      imageUrl: 'https://placehold.co/600x400.png',
      link: '#',
      introduction: 'A personal portfolio website built to showcase my skills and projects. It features a clean, modern design and a custom-built admin panel for easy content management without touching the code.',
      technologies: ['Next.js', 'React', 'TypeScript', 'ShadCN UI', 'Tailwind CSS'],
      features: ['Dynamic Content Management', 'Responsive Design', 'Admin Authentication', 'Light/Dark Mode', 'Interactive UI Components'],
      reportUrl: '',
    },
  ],
  certifications: [
    {
      id: 'cert1',
      name: 'Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: '2023',
      imageUrl: 'https://placehold.co/600x400.png',
    },
    {
      id: 'cert2',
      name: 'GenAI Professional',
      issuer: 'Google Cloud',
      date: '2024',
      imageUrl: 'https://placehold.co/600x400.png',
    },
  ],
  contacts: [],
};
