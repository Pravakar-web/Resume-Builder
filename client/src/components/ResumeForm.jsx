import React, { useState } from 'react';
import { api } from '../utils/api';
import { 
  User, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  FolderGit2, 
  Award, 
  Languages, 
  Trophy, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  Trash2, 
  Sparkles, 
  Palette, 
  Loader2,
  Check
} from 'lucide-react';
import { TEMPLATES } from '../templates';

export const ResumeForm = ({ resumeData, setResumeData }) => {
  // Collapsible sections state
  const [openSections, setOpenSections] = useState({
    personal: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    certifications: false,
    languages: false,
    achievements: false,
    theme: false
  });

  const [aiLoading, setAiLoading] = useState(false);
  const [aiNotice, setAiNotice] = useState(null);

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Generic updater for personal info
  const handlePersonalInfoChange = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  // Color & Theme changes
  const handleColorChange = (color) => {
    setResumeData(prev => ({
      ...prev,
      themeConfig: {
        ...prev.themeConfig,
        accentColor: color
      }
    }));
  };

  const handleTemplateSelect = (templateId) => {
    setResumeData(prev => ({
      ...prev,
      templateId
    }));
  };

  // Repeatable list helpers
  const handleAddItem = (sectionKey, emptyItem) => {
    setResumeData(prev => ({
      ...prev,
      [sectionKey]: [...(prev[sectionKey] || []), { ...emptyItem, id: 'item_' + Date.now() }]
    }));
  };

  const handleRemoveItem = (sectionKey, index) => {
    setResumeData(prev => ({
      ...prev,
      [sectionKey]: prev[sectionKey].filter((_, i) => i !== index)
    }));
  };

  const handleUpdateItem = (sectionKey, index, field, value) => {
    setResumeData(prev => {
      const list = [...(prev[sectionKey] || [])];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, [sectionKey]: list };
    });
  };

  // Optional AI enhancement trigger
  const handleAiImprove = async (type, currentText, index = null) => {
    if (!currentText || currentText.trim() === '') {
      setAiNotice({ text: 'Please enter some text first before optimizing with AI.', type: 'warn' });
      return;
    }
    setAiLoading(true);
    setAiNotice(null);
    try {
      const res = await api.improveText(type, currentText, resumeData.personalInfo?.title || 'Professional');
      if (res.success && res.improvedText) {
        if (type === 'summary') {
          handlePersonalInfoChange('summary', res.improvedText);
        } else if (type === 'experience' && index !== null) {
          handleUpdateItem('workExperience', index, 'description', res.improvedText);
        }
        setAiNotice({ text: 'Content optimized with AI successfully!', type: 'success' });
      } else {
        setAiNotice({ 
          text: res.message || 'AI service unavailable. You can enter and edit bullet points manually.', 
          type: 'info' 
        });
      }
    } catch (err) {
      setAiNotice({ 
        text: 'AI Service note: GEMINI_API_KEY is not configured on the backend. All manual editing and templates are fully operational.', 
        type: 'info' 
      });
    } finally {
      setAiLoading(false);
    }
  };

  // Color options
  const PRESET_COLORS = ['#4f46e5', '#2563eb', '#0284c7', '#0d9488', '#16a34a', '#7c3aed', '#db2777', '#dc2626', '#334155'];

  return (
    <div className="resume-form-container">
      {/* Notice Banner */}
      {aiNotice && (
        <div className={`form-notice-banner ${aiNotice.type}`}>
          <span>{aiNotice.text}</span>
          <button onClick={() => setAiNotice(null)} className="notice-close">✕</button>
        </div>
      )}

      {/* 1. TEMPLATE & STYLING */}
      <div className="form-accordion-card">
        <button className="accordion-header" onClick={() => toggleSection('theme')}>
          <div className="accordion-title">
            <Palette size={18} className="acc-icon" />
            <span>Templates & Styling</span>
          </div>
          {openSections.theme ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {openSections.theme && (
          <div className="accordion-content">
            <div className="form-group">
              <label className="form-label">Choose Template</label>
              <div className="template-cards-grid">
                {TEMPLATES.map((tpl) => (
                  <div
                    key={tpl.id}
                    className={`template-select-card ${resumeData.templateId === tpl.id ? 'active' : ''}`}
                    onClick={() => handleTemplateSelect(tpl.id)}
                  >
                    <div className="template-card-header">
                      <span className="tpl-name">{tpl.name}</span>
                      {resumeData.templateId === tpl.id && <Check size={14} className="tpl-check" />}
                    </div>
                    <p className="tpl-desc">{tpl.description}</p>
                    <span className="tpl-tag">{tpl.category}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Accent Color</label>
              <div className="color-swatches-row">
                {PRESET_COLORS.map(color => (
                  <button
                    key={color}
                    type="button"
                    className={`color-swatch-circle ${resumeData.themeConfig?.accentColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorChange(color)}
                  />
                ))}
                <input
                  type="color"
                  value={resumeData.themeConfig?.accentColor || '#4f46e5'}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="color-custom-input"
                  title="Pick custom color"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. PERSONAL INFORMATION */}
      <div className="form-accordion-card">
        <button className="accordion-header" onClick={() => toggleSection('personal')}>
          <div className="accordion-title">
            <User size={18} className="acc-icon" />
            <span>Personal Information</span>
          </div>
          {openSections.personal ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {openSections.personal && (
          <div className="accordion-content">
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Alex Morgan"
                  value={resumeData.personalInfo?.fullName || ''}
                  onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Professional Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Senior Full Stack Engineer"
                  value={resumeData.personalInfo?.title || ''}
                  onChange={(e) => handlePersonalInfoChange('title', e.target.value)}
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="e.g. alex@example.com"
                  value={resumeData.personalInfo?.email || ''}
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="e.g. +1 (555) 234-5678"
                  value={resumeData.personalInfo?.phone || ''}
                  onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Location / City</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. San Francisco, CA"
                  value={resumeData.personalInfo?.location || ''}
                  onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">LinkedIn Profile</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="linkedin.com/in/username"
                  value={resumeData.personalInfo?.linkedin || ''}
                  onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">GitHub</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="github.com/username"
                  value={resumeData.personalInfo?.github || ''}
                  onChange={(e) => handlePersonalInfoChange('github', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Portfolio Website</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="yourname.dev"
                  value={resumeData.personalInfo?.portfolio || ''}
                  onChange={(e) => handlePersonalInfoChange('portfolio', e.target.value)}
                />
              </div>
            </div>

            {/* Professional Summary with AI rewrite option */}
            <div className="form-group">
              <div className="label-with-ai">
                <label className="form-label">Professional Summary</label>
                <button
                  type="button"
                  onClick={() => handleAiImprove('summary', resumeData.personalInfo?.summary)}
                  disabled={aiLoading}
                  className="ai-enhance-btn"
                  title="Improve with AI"
                >
                  {aiLoading ? <Loader2 size={13} className="spin-icon" /> : <Sparkles size={13} />}
                  <span>Enhance Summary</span>
                </button>
              </div>
              <textarea
                className="form-control"
                rows={4}
                placeholder="Write a concise overview of your background, high-level achievements, and strengths..."
                value={resumeData.personalInfo?.summary || ''}
                onChange={(e) => handlePersonalInfoChange('summary', e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      {/* 3. WORK EXPERIENCE */}
      <div className="form-accordion-card">
        <button className="accordion-header" onClick={() => toggleSection('experience')}>
          <div className="accordion-title">
            <Briefcase size={18} className="acc-icon" />
            <span>Work Experience ({resumeData.workExperience?.length || 0})</span>
          </div>
          {openSections.experience ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {openSections.experience && (
          <div className="accordion-content">
            {resumeData.workExperience?.map((exp, index) => (
              <div key={exp.id || index} className="entry-sub-card">
                <div className="entry-card-top">
                  <span className="entry-index-badge">Experience #{index + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem('workExperience', index)}
                    className="btn-delete-entry"
                    title="Remove experience"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Job Title / Position</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Senior Software Engineer"
                      value={exp.position || ''}
                      onChange={(e) => handleUpdateItem('workExperience', index, 'position', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Company Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Acme Corp"
                      value={exp.company || ''}
                      onChange={(e) => handleUpdateItem('workExperience', index, 'company', e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-grid-3">
                  <div className="form-group">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. New York, NY"
                      value={exp.location || ''}
                      onChange={(e) => handleUpdateItem('workExperience', index, 'location', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Start Date</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. 2021-03"
                      value={exp.startDate || ''}
                      onChange={(e) => handleUpdateItem('workExperience', index, 'startDate', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">End Date</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Present"
                      disabled={exp.current}
                      value={exp.current ? 'Present' : (exp.endDate || '')}
                      onChange={(e) => handleUpdateItem('workExperience', index, 'endDate', e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={!!exp.current}
                      onChange={(e) => handleUpdateItem('workExperience', index, 'current', e.target.checked)}
                    />
                    <span>I currently work here</span>
                  </label>
                </div>

                <div className="form-group">
                  <div className="label-with-ai">
                    <label className="form-label">Responsibilities & Achievements</label>
                    <button
                      type="button"
                      onClick={() => handleAiImprove('experience', exp.description, index)}
                      disabled={aiLoading}
                      className="ai-enhance-btn"
                    >
                      <Sparkles size={13} />
                      <span>Polish Bullets</span>
                    </button>
                  </div>
                  <textarea
                    className="form-control"
                    rows={3}
                    placeholder="• Built microservices reducing latency by 30%...&#10;• Led sprint planning for a team of 6 engineers..."
                    value={exp.description || ''}
                    onChange={(e) => handleUpdateItem('workExperience', index, 'description', e.target.value)}
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              className="btn-add-entry"
              onClick={() => handleAddItem('workExperience', {
                company: '',
                position: '',
                location: '',
                startDate: '',
                endDate: '',
                current: false,
                description: ''
              })}
            >
              <Plus size={16} /> Add Work Experience
            </button>
          </div>
        )}
      </div>

      {/* 4. EDUCATION */}
      <div className="form-accordion-card">
        <button className="accordion-header" onClick={() => toggleSection('education')}>
          <div className="accordion-title">
            <GraduationCap size={18} className="acc-icon" />
            <span>Education ({resumeData.education?.length || 0})</span>
          </div>
          {openSections.education ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {openSections.education && (
          <div className="accordion-content">
            {resumeData.education?.map((edu, index) => (
              <div key={edu.id || index} className="entry-sub-card">
                <div className="entry-card-top">
                  <span className="entry-index-badge">Education #{index + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem('education', index)}
                    className="btn-delete-entry"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Institution / University</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. UC Berkeley"
                      value={edu.institution || ''}
                      onChange={(e) => handleUpdateItem('education', index, 'institution', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Degree</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Bachelor of Science"
                      value={edu.degree || ''}
                      onChange={(e) => handleUpdateItem('education', index, 'degree', e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-grid-3">
                  <div className="form-group">
                    <label className="form-label">Field of Study</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Computer Science"
                      value={edu.fieldOfStudy || ''}
                      onChange={(e) => handleUpdateItem('education', index, 'fieldOfStudy', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Start Date</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. 2016"
                      value={edu.startDate || ''}
                      onChange={(e) => handleUpdateItem('education', index, 'startDate', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">End Date</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. 2020"
                      value={edu.endDate || ''}
                      onChange={(e) => handleUpdateItem('education', index, 'endDate', e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">GPA (Optional)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. 3.8 / 4.0"
                      value={edu.gpa || ''}
                      onChange={(e) => handleUpdateItem('education', index, 'gpa', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Berkeley, CA"
                      value={edu.location || ''}
                      onChange={(e) => handleUpdateItem('education', index, 'location', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              className="btn-add-entry"
              onClick={() => handleAddItem('education', {
                institution: '',
                degree: '',
                fieldOfStudy: '',
                location: '',
                startDate: '',
                endDate: '',
                gpa: '',
                description: ''
              })}
            >
              <Plus size={16} /> Add Education
            </button>
          </div>
        )}
      </div>

      {/* 5. SKILLS */}
      <div className="form-accordion-card">
        <button className="accordion-header" onClick={() => toggleSection('skills')}>
          <div className="accordion-title">
            <Wrench size={18} className="acc-icon" />
            <span>Skills & Proficiencies ({resumeData.skills?.length || 0})</span>
          </div>
          {openSections.skills ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {openSections.skills && (
          <div className="accordion-content">
            <div className="skills-inline-grid">
              {resumeData.skills?.map((s, index) => (
                <div key={s.id || index} className="skill-edit-pill">
                  <input
                    type="text"
                    className="skill-input-tag"
                    placeholder="Skill name"
                    value={s.name || ''}
                    onChange={(e) => handleUpdateItem('skills', index, 'name', e.target.value)}
                  />
                  <select
                    className="skill-select-level"
                    value={s.level || 'Intermediate'}
                    onChange={(e) => handleUpdateItem('skills', index, 'level', e.target.value)}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem('skills', index)}
                    className="skill-remove-btn"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="btn-add-entry mt-2"
              onClick={() => handleAddItem('skills', { name: '', level: 'Intermediate', category: 'General' })}
            >
              <Plus size={16} /> Add Skill
            </button>
          </div>
        )}
      </div>

      {/* 6. PROJECTS */}
      <div className="form-accordion-card">
        <button className="accordion-header" onClick={() => toggleSection('projects')}>
          <div className="accordion-title">
            <FolderGit2 size={18} className="acc-icon" />
            <span>Projects ({resumeData.projects?.length || 0})</span>
          </div>
          {openSections.projects ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {openSections.projects && (
          <div className="accordion-content">
            {resumeData.projects?.map((proj, index) => (
              <div key={proj.id || index} className="entry-sub-card">
                <div className="entry-card-top">
                  <span className="entry-index-badge">Project #{index + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem('projects', index)}
                    className="btn-delete-entry"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Project Title</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Cloud Telemetry Dashboard"
                      value={proj.title || ''}
                      onChange={(e) => handleUpdateItem('projects', index, 'title', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Project Link / Demo URL</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="https://..."
                      value={proj.link || ''}
                      onChange={(e) => handleUpdateItem('projects', index, 'link', e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Technologies Used</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. React, Node.js, Redis, Docker"
                    value={proj.technologies || ''}
                    onChange={(e) => handleUpdateItem('projects', index, 'technologies', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    placeholder="Describe what you built, architecture decisions, and results..."
                    value={proj.description || ''}
                    onChange={(e) => handleUpdateItem('projects', index, 'description', e.target.value)}
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              className="btn-add-entry"
              onClick={() => handleAddItem('projects', { title: '', link: '', technologies: '', description: '' })}
            >
              <Plus size={16} /> Add Project
            </button>
          </div>
        )}
      </div>

      {/* 7. CERTIFICATIONS */}
      <div className="form-accordion-card">
        <button className="accordion-header" onClick={() => toggleSection('certifications')}>
          <div className="accordion-title">
            <Award size={18} className="acc-icon" />
            <span>Certifications ({resumeData.certifications?.length || 0})</span>
          </div>
          {openSections.certifications ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {openSections.certifications && (
          <div className="accordion-content">
            {resumeData.certifications?.map((c, index) => (
              <div key={c.id || index} className="entry-sub-card">
                <div className="entry-card-top">
                  <span className="entry-index-badge">Certification #{index + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem('certifications', index)}
                    className="btn-delete-entry"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>

                <div className="form-grid-3">
                  <div className="form-group">
                    <label className="form-label">Certificate Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. AWS Solutions Architect"
                      value={c.name || ''}
                      onChange={(e) => handleUpdateItem('certifications', index, 'name', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Issuer</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Amazon Web Services"
                      value={c.issuer || ''}
                      onChange={(e) => handleUpdateItem('certifications', index, 'issuer', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date Issued</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. 2023"
                      value={c.date || ''}
                      onChange={(e) => handleUpdateItem('certifications', index, 'date', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              className="btn-add-entry"
              onClick={() => handleAddItem('certifications', { name: '', issuer: '', date: '' })}
            >
              <Plus size={16} /> Add Certification
            </button>
          </div>
        )}
      </div>

      {/* 8. LANGUAGES */}
      <div className="form-accordion-card">
        <button className="accordion-header" onClick={() => toggleSection('languages')}>
          <div className="accordion-title">
            <Languages size={18} className="acc-icon" />
            <span>Languages ({resumeData.languages?.length || 0})</span>
          </div>
          {openSections.languages ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {openSections.languages && (
          <div className="accordion-content">
            <div className="form-grid-2">
              {resumeData.languages?.map((l, index) => (
                <div key={l.id || index} className="skill-edit-pill">
                  <input
                    type="text"
                    className="skill-input-tag"
                    placeholder="Language (e.g. English)"
                    value={l.language || ''}
                    onChange={(e) => handleUpdateItem('languages', index, 'language', e.target.value)}
                  />
                  <input
                    type="text"
                    className="skill-input-tag"
                    placeholder="Proficiency (e.g. Fluent)"
                    value={l.proficiency || ''}
                    onChange={(e) => handleUpdateItem('languages', index, 'proficiency', e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveItem('languages', index)}
                    className="skill-remove-btn"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="btn-add-entry mt-2"
              onClick={() => handleAddItem('languages', { language: '', proficiency: 'Fluent' })}
            >
              <Plus size={16} /> Add Language
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
