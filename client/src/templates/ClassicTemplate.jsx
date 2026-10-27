import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/SocialIcons';

export const ClassicTemplate = ({ data }) => {
  const { personalInfo, workExperience, education, skills, projects, certifications, languages, achievements, themeConfig } = data;
  const accent = themeConfig?.accentColor || '#1e3a8a';

  return (
    <div className="resume-sheet classic-template" style={{ '--accent': accent }}>
      {/* Header */}
      <header className="classic-header">
        <h1 className="classic-name">{personalInfo?.fullName || 'Your Full Name'}</h1>
        {personalInfo?.title && <div className="classic-title">{personalInfo.title}</div>}
        
        <div className="classic-contact-bar">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo?.location && <span>• {personalInfo.location}</span>}
          {personalInfo?.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo?.portfolio && <span>• {personalInfo.portfolio}</span>}
          {personalInfo?.github && <span>• {personalInfo.github}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo?.summary && (
        <section className="classic-section">
          <h2 className="classic-section-title">Professional Summary</h2>
          <p className="classic-text">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {workExperience && workExperience.length > 0 && (
        <section className="classic-section">
          <h2 className="classic-section-title">Work Experience</h2>
          {workExperience.map((exp, idx) => (
            <div key={exp.id || idx} className="classic-entry">
              <div className="classic-entry-header">
                <span className="classic-entry-title">{exp.position}</span>
                <span className="classic-entry-date">
                  {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div className="classic-entry-sub">
                <span className="classic-company">{exp.company}</span>
                {exp.location && <span className="classic-loc">{exp.location}</span>}
              </div>
              {exp.description && (
                <div className="classic-desc">
                  {exp.description.split('\n').map((line, i) => (
                    line.trim() ? <div key={i} className="bullet-point">{line}</div> : null
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="classic-section">
          <h2 className="classic-section-title">Education</h2>
          {education.map((edu, idx) => (
            <div key={edu.id || idx} className="classic-entry">
              <div className="classic-entry-header">
                <span className="classic-entry-title">{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</span>
                <span className="classic-entry-date">{edu.startDate} – {edu.endDate}</span>
              </div>
              <div className="classic-entry-sub">
                <span className="classic-company">{edu.institution}</span>
                {edu.location && <span className="classic-loc">{edu.location}</span>}
                {edu.gpa && <span className="classic-gpa">| GPA: {edu.gpa}</span>}
              </div>
              {edu.description && <p className="classic-desc-text">{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="classic-section">
          <h2 className="classic-section-title">Key Projects</h2>
          {projects.map((proj, idx) => (
            <div key={proj.id || idx} className="classic-entry">
              <div className="classic-entry-header">
                <span className="classic-entry-title">
                  {proj.title}
                  {proj.link && <span className="entry-link"> ({proj.link})</span>}
                </span>
                {proj.startDate && (
                  <span className="classic-entry-date">{proj.startDate} – {proj.endDate || 'Present'}</span>
                )}
              </div>
              {proj.technologies && <div className="tech-stack-line">Technologies: {proj.technologies}</div>}
              {proj.description && (
                <div className="classic-desc">
                  {proj.description.split('\n').map((line, i) => (
                    line.trim() ? <div key={i} className="bullet-point">{line}</div> : null
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="classic-section">
          <h2 className="classic-section-title">Skills & Proficiencies</h2>
          <div className="classic-skills-list">
            {skills.map((s, idx) => (
              <span key={s.id || idx} className="classic-skill-tag">
                {s.name} {s.level ? `(${s.level})` : ''}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Languages */}
      {((certifications && certifications.length > 0) || (languages && languages.length > 0)) && (
        <div className="classic-two-col-grid">
          {certifications && certifications.length > 0 && (
            <section className="classic-section">
              <h2 className="classic-section-title">Certifications</h2>
              {certifications.map((c, idx) => (
                <div key={c.id || idx} className="classic-sub-entry">
                  <strong>{c.name}</strong> — {c.issuer} {c.date && `(${c.date})`}
                </div>
              ))}
            </section>
          )}

          {languages && languages.length > 0 && (
            <section className="classic-section">
              <h2 className="classic-section-title">Languages</h2>
              {languages.map((l, idx) => (
                <div key={l.id || idx} className="classic-sub-entry">
                  <strong>{l.language}:</strong> {l.proficiency}
                </div>
              ))}
            </section>
          )}
        </div>
      )}
    </div>
  );
};
