const Resume = require('../models/Resume');
const FileDB = require('../config/fileDb');
const { getDbStatus } = require('../config/db');

// Sample default resume structure
const getSampleResume = (userId, title = 'Software Engineer Resume') => ({
  userId,
  title,
  templateId: 'modern-minimal',
  themeConfig: {
    accentColor: '#4f46e5',
    fontFamily: 'Inter',
    fontSize: 'medium',
    sectionSpacing: 'normal'
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
    summary: 'Results-driven Full Stack Engineer with 6+ years of experience building high-scale web platforms, distributed microservices, and reactive user interfaces. Passionate about clean code, performance optimization, and intuitive user experiences.'
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
});

// @route   GET /api/resumes
// @desc    Get all resumes for authenticated user
exports.getResumes = async (req, res) => {
  try {
    const userId = req.user.id;
    const { mode } = getDbStatus();

    let resumes;
    if (mode === 'mongodb') {
      resumes = await Resume.find({ userId }).sort({ updatedAt: -1 });
    } else {
      resumes = FileDB.findResumesByUserId(userId);
      resumes.sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));
    }

    res.json({ success: true, count: resumes.length, data: resumes });
  } catch (err) {
    console.error('GetResumes error:', err);
    res.status(500).json({ success: false, message: 'Server error retrieving resumes' });
  }
};

// @route   GET /api/resumes/:id
// @desc    Get single resume by id
exports.getResumeById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { mode } = getDbStatus();

    let resume;
    if (mode === 'mongodb') {
      resume = await Resume.findById(id);
    } else {
      resume = FileDB.findResumeById(id);
    }

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    // Ownership check
    if (resume.userId.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: 'Access denied: not authorized to view this resume' });
    }

    res.json({ success: true, data: resume });
  } catch (err) {
    console.error('GetResumeById error:', err);
    res.status(500).json({ success: false, message: 'Server error retrieving resume' });
  }
};

// @route   POST /api/resumes
// @desc    Create a new resume (or duplicate with sample template)
exports.createResume = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, templateId, themeConfig, personalInfo, workExperience, education, skills, projects, certifications, languages, achievements, useSample } = req.body;
    const { mode } = getDbStatus();

    let resumeData;
    if (useSample) {
      resumeData = getSampleResume(userId, title || 'My Professional Resume');
      if (templateId) resumeData.templateId = templateId;
    } else {
      resumeData = {
        userId,
        title: title || 'Untitled Resume',
        templateId: templateId || 'modern-minimal',
        themeConfig: themeConfig || {
          accentColor: '#4f46e5',
          fontFamily: 'Inter',
          fontSize: 'medium',
          sectionSpacing: 'normal'
        },
        personalInfo: personalInfo || { fullName: '', title: '', email: '', phone: '', location: '', linkedin: '', github: '', portfolio: '', summary: '' },
        workExperience: workExperience || [],
        education: education || [],
        skills: skills || [],
        projects: projects || [],
        certifications: certifications || [],
        languages: languages || [],
        achievements: achievements || []
      };
    }

    let newResume;
    if (mode === 'mongodb') {
      newResume = await Resume.create(resumeData);
    } else {
      newResume = FileDB.createResume(resumeData);
    }

    res.status(201).json({ success: true, data: newResume });
  } catch (err) {
    console.error('CreateResume error:', err);
    res.status(500).json({ success: false, message: 'Server error creating resume' });
  }
};

// @route   PUT /api/resumes/:id
// @desc    Update an existing resume
exports.updateResume = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { mode } = getDbStatus();

    let resume;
    if (mode === 'mongodb') {
      resume = await Resume.findById(id);
    } else {
      resume = FileDB.findResumeById(id);
    }

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    // Ownership check
    if (resume.userId.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: 'Access denied: not authorized to edit this resume' });
    }

    let updatedResume;
    if (mode === 'mongodb') {
      updatedResume = await Resume.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    } else {
      updatedResume = FileDB.updateResume(id, req.body);
    }

    res.json({ success: true, data: updatedResume });
  } catch (err) {
    console.error('UpdateResume error:', err);
    res.status(500).json({ success: false, message: 'Server error updating resume' });
  }
};

// @route   POST /api/resumes/:id/duplicate
// @desc    Duplicate an existing resume
exports.duplicateResume = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { mode } = getDbStatus();

    let resume;
    if (mode === 'mongodb') {
      resume = await Resume.findById(id);
    } else {
      resume = FileDB.findResumeById(id);
    }

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    if (resume.userId.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const duplicatedData = {
      ...(resume.toObject ? resume.toObject() : resume),
      title: `${resume.title} (Copy)`,
      userId
    };
    delete duplicatedData._id;
    delete duplicatedData.id;
    delete duplicatedData.createdAt;
    delete duplicatedData.updatedAt;

    let newResume;
    if (mode === 'mongodb') {
      newResume = await Resume.create(duplicatedData);
    } else {
      newResume = FileDB.createResume(duplicatedData);
    }

    res.status(201).json({ success: true, data: newResume });
  } catch (err) {
    console.error('DuplicateResume error:', err);
    res.status(500).json({ success: false, message: 'Server error duplicating resume' });
  }
};

// @route   DELETE /api/resumes/:id
// @desc    Delete a resume
exports.deleteResume = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { mode } = getDbStatus();

    let resume;
    if (mode === 'mongodb') {
      resume = await Resume.findById(id);
    } else {
      resume = FileDB.findResumeById(id);
    }

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    if (resume.userId.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: 'Access denied: not authorized to delete this resume' });
    }

    if (mode === 'mongodb') {
      await Resume.findByIdAndDelete(id);
    } else {
      FileDB.deleteResume(id);
    }

    res.json({ success: true, message: 'Resume successfully deleted' });
  } catch (err) {
    console.error('DeleteResume error:', err);
    res.status(500).json({ success: false, message: 'Server error deleting resume' });
  }
};
