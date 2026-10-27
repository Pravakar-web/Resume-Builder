const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  title: {
    type: String,
    default: 'Untitled Resume',
    trim: true
  },
  templateId: {
    type: String,
    default: 'modern-minimal'
  },
  themeConfig: {
    accentColor: { type: String, default: '#4f46e5' },
    fontFamily: { type: String, default: 'Inter' },
    fontSize: { type: String, default: 'medium' },
    sectionSpacing: { type: String, default: 'normal' }
  },
  personalInfo: {
    fullName: { type: String, default: '' },
    title: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    github: { type: String, default: '' },
    portfolio: { type: String, default: '' },
    summary: { type: String, default: '' }
  },
  workExperience: [
    {
      id: String,
      company: String,
      position: String,
      location: String,
      startDate: String,
      endDate: String,
      current: Boolean,
      description: String
    }
  ],
  education: [
    {
      id: String,
      institution: String,
      degree: String,
      fieldOfStudy: String,
      location: String,
      startDate: String,
      endDate: String,
      gpa: String,
      description: String
    }
  ],
  skills: [
    {
      id: String,
      name: String,
      category: String, // e.g. "Languages", "Frameworks", "Tools"
      level: String     // e.g. "Beginner", "Intermediate", "Advanced", "Expert"
    }
  ],
  projects: [
    {
      id: String,
      title: String,
      link: String,
      technologies: String,
      startDate: String,
      endDate: String,
      description: String
    }
  ],
  certifications: [
    {
      id: String,
      name: String,
      issuer: String,
      date: String,
      link: String
    }
  ],
  languages: [
    {
      id: String,
      language: String,
      proficiency: String
    }
  ],
  achievements: [
    {
      id: String,
      title: String,
      date: String,
      description: String
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Resume', resumeSchema);
