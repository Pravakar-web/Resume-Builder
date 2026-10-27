export const DEFAULT_RESUME = {
  title: 'My Professional Resume',
  templateId: 'modern-minimal',
  themeConfig: {
    accentColor: '#4f46e5',
    fontFamily: 'Inter',
    fontSize: 'medium', // small, medium, large
    sectionSpacing: 'normal' // compact, normal, relaxed
  },
  personalInfo: {
    fullName: 'Alex Morgan',
    title: 'Senior Full Stack Engineer',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexmorgan',
    github: 'github.com/alexmorgan',
    portfolio: 'alexmorgan.dev',
    summary: 'Results-driven Full Stack Engineer with 6+ years of experience architecting high-scale web platforms and reactive user interfaces. Proven track record in microservices, performance optimization, and cross-functional team leadership.'
  },
  workExperience: [
    {
      id: 'exp_1',
      company: 'Vanguard Tech Solutions',
      position: 'Senior Full Stack Developer',
      location: 'San Francisco, CA',
      startDate: '2022-03',
      endDate: '',
      current: true,
      description: '• Architected and migrated legacy monolith into React & Node.js microservices, cutting page latency by 42%.\n• Mentored 8 junior and mid-level engineers in modern JavaScript standards, automated testing, and CI/CD pipelines.\n• Designed and maintained REST and GraphQL APIs serving 1.5M+ active monthly users with 99.98% uptime.'
    },
    {
      id: 'exp_2',
      company: 'Horizon Cloud Labs',
      position: 'Full Stack Software Engineer',
      location: 'Austin, TX',
      startDate: '2019-06',
      endDate: '2022-02',
      current: false,
      description: '• Developed responsive client portals utilizing React, Redux, and TailwindCSS with end-to-end accessibility (WCAG 2.1 AA).\n• Streamlined database performance on MongoDB & PostgreSQL, reducing 95th percentile query times by 35%.\n• Built automated export workflows generating pixel-perfect analytical PDF reports.'
    }
  ],
  education: [
    {
      id: 'edu_1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      location: 'Berkeley, CA',
      startDate: '2015-08',
      endDate: '2019-05',
      gpa: '3.85 / 4.0',
      description: 'Dean\'s Honor List, coursework in Distributed Systems, Algorithms, and Software Engineering.'
    }
  ],
  skills: [
    { id: 'sk_1', name: 'JavaScript / TypeScript', category: 'Languages', level: 'Expert' },
    { id: 'sk_2', name: 'React.js & Next.js', category: 'Frameworks', level: 'Expert' },
    { id: 'sk_3', name: 'Node.js & Express', category: 'Backend', level: 'Expert' },
    { id: 'sk_4', name: 'MongoDB / PostgreSQL', category: 'Databases', level: 'Advanced' },
    { id: 'sk_5', name: 'Docker & Kubernetes', category: 'DevOps', level: 'Intermediate' },
    { id: 'sk_6', name: 'RESTful API & GraphQL', category: 'Architecture', level: 'Expert' }
  ],
  projects: [
    {
      id: 'proj_1',
      title: 'DevPulse Analytics Suite',
      link: 'https://github.com/alexmorgan/devpulse',
      technologies: 'React, Node.js, WebSocket, Redis, Chart.js',
      startDate: '2023-01',
      endDate: '2023-08',
      description: 'An open-source real-time developer productivity and telemetry dashboard with custom webhooks, role-based access control, and PDF summaries.'
    },
    {
      id: 'proj_2',
      title: 'CloudStore Distributed Cache',
      link: 'https://cloudstore-demo.io',
      technologies: 'Go, Node.js, Docker, AWS',
      startDate: '2022-04',
      endDate: '2022-11',
      description: 'High-throughput in-memory key-value cache engine with master-worker replication and zero-downtime cluster rebalancing.'
    }
  ],
  certifications: [
    {
      id: 'cert_1',
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      date: '2023-05',
      link: 'https://aws.amazon.com'
    }
  ],
  languages: [
    { id: 'lang_1', language: 'English', proficiency: 'Native / Bilingual' },
    { id: 'lang_2', language: 'Spanish', proficiency: 'Professional Working' }
  ],
  achievements: [
    {
      id: 'ach_1',
      title: 'First Place – Global Cloud Hackathon 2023',
      date: '2023-10',
      description: 'Selected 1st out of 350+ worldwide teams for building an AI-powered automated code documentation bot.'
    }
  ]
};

export const EMPTY_RESUME = {
  title: 'Untitled Resume',
  templateId: 'modern-minimal',
  themeConfig: {
    accentColor: '#4f46e5',
    fontFamily: 'Inter',
    fontSize: 'medium',
    sectionSpacing: 'normal'
  },
  personalInfo: {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: '',
    summary: ''
  },
  workExperience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  achievements: []
};
