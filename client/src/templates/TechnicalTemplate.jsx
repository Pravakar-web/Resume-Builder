import React from 'react';
import { Terminal, Code, Cpu, Database, ExternalLink, Calendar, MapPin, Mail, Phone } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/SocialIcons';

export const TechnicalTemplate = ({ data }) => {
  const { personalInfo, workExperience, education, skills, projects, certifications, languages, achievements, themeConfig } = data;
  const accent = themeConfig?.accentColor || '#0284c7';

  // Group skills by category if present
  const skillCategories = skills?.reduce((acc, curr) => {
    const cat = curr.category || 'Core Technologies';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(curr);
    return acc;
  }, {}) || {};

  return (
    <div className="resume-sheet technical-template" style={{ '--accent': accent }}>
      {/* Header */}
      <header className="tech-header">
        <div className="tech-title-block">
          <h1 className="tech-name">
            <span className="tech-prompt">&gt;</span> {personalInfo?.fullName || 'Full Name'}
          </h1>
          <p className="tech-role">{personalInfo?.title || 'Systems & Software Engineer'}</p>
        </div>

        <div className="tech-meta-bar">
          {personalInfo?.email && <span>email: <strong>{personalInfo.email}</strong></span>}
          {personalInfo?.phone && <span>tel: <strong>{personalInfo.phone}</strong></span>}
          {personalInfo?.location && <span>loc: <strong>{personalInfo.location}</strong></span>}
          {personalInfo?.github && <span>gh: <strong>{personalInfo.github}</strong></span>}
          {personalInfo?.linkedin && <span>in: <strong>{personalInfo.linkedin}</strong></span>}
          {personalInfo?.portfolio && <span>web: <strong>{personalInfo.portfolio}</strong></span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo?.summary && (
        <section className="tech-section">
          <h2 className="tech-section-header">// 01. TECHNICAL SUMMARY</h2>
          <p className="tech-summary-content">{personalInfo.summary}</p>
        </section>
      )}

      {/* Skills Matrix */}
      {skills && skills.length > 0 && (
        <section className="tech-section">
          <h2 className="tech-section-header">// 02. TECHNICAL PROFICIENCIES</h2>
          <div className="tech-skills-matrix">
            {Object.keys(skillCategories).map((category, idx) => (
              <div key={idx} className="tech-skill-row">
                <span className="skill-cat-label">{category}:</span>
                <span className="skill-cat-items">
                  {skillCategories[category].map((s, i) => (
                    <span key={i} className="tech-code-badge">
                      {s.name}{s.level ? ` (${s.level})` : ''}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {workExperience && workExperience.length > 0 && (
        <section className="tech-section">
          <h2 className="tech-section-header">// 03. ENGINEERING EXPERIENCE</h2>
          {workExperience.map((exp, idx) => (
            <div key={exp.id || idx} className="tech-entry">
              <div className="tech-entry-head">
                <div className="tech-role-company">
                  <span className="tech-pos">{exp.position}</span>
                  <span className="tech-at"> @ </span>
                  <span className="tech-comp">{exp.company}</span>
                  {exp.location && <span className="tech-loc"> [{exp.location}]</span>}
                </div>
                <div className="tech-date">
                  {exp.startDate} :: {exp.current ? 'PRESENT' : exp.endDate}
                </div>
              </div>
              {exp.description && (
                <div className="tech-bullets">
                  {exp.description.split('\n').map((line, i) => (
                    line.trim() ? <div key={i} className="tech-bullet">&gt; {line.replace(/^[•\-\*]\s*/, '')}</div> : null
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="tech-section">
          <h2 className="tech-section-header">// 04. PRODUCTION & OPEN-SOURCE PROJECTS</h2>
          {projects.map((proj, idx) => (
            <div key={proj.id || idx} className="tech-entry">
              <div className="tech-entry-head">
                <span className="tech-pos">
                  {proj.title}
                  {proj.link && <span className="tech-link-tag"> [link: {proj.link}]</span>}
                </span>
                {proj.startDate && (
                  <span className="tech-date">{proj.startDate} :: {proj.endDate || 'PRESENT'}</span>
                )}
              </div>
              {proj.technologies && (
                <div className="tech-stack-used">
                  <code>stack: [{proj.technologies}]</code>
                </div>
              )}
              {proj.description && (
                <div className="tech-bullets">
                  {proj.description.split('\n').map((line, i) => (
                    line.trim() ? <div key={i} className="tech-bullet">&gt; {line.replace(/^[•\-\*]\s*/, '')}</div> : null
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education & Certs */}
      <div className="tech-grid-split">
        {education && education.length > 0 && (
          <section className="tech-section">
            <h2 className="tech-section-header">// 05. EDUCATION</h2>
            {education.map((edu, idx) => (
              <div key={edu.id || idx} className="tech-sub-entry">
                <div className="tech-sub-title">{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</div>
                <div className="tech-sub-detail">{edu.institution} · {edu.startDate} – {edu.endDate} {edu.gpa && `(GPA: ${edu.gpa})`}</div>
              </div>
            ))}
          </section>
        )}

        {certifications && certifications.length > 0 && (
          <section className="tech-section">
            <h2 className="tech-section-header">// 06. CERTIFICATIONS</h2>
            {certifications.map((c, idx) => (
              <div key={c.id || idx} className="tech-sub-entry">
                <div className="tech-sub-title">{c.name}</div>
                <div className="tech-sub-detail">{c.issuer} · {c.date}</div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};
