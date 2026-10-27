import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/SocialIcons';

export const ModernMinimalTemplate = ({ data }) => {
  const { personalInfo, workExperience, education, skills, projects, certifications, languages, achievements, themeConfig } = data;
  const accent = themeConfig?.accentColor || '#4f46e5';

  return (
    <div className="resume-sheet modern-minimal-template" style={{ '--accent': accent }}>
      {/* Top Banner */}
      <header className="modern-header">
        <div className="modern-header-main">
          <h1 className="modern-name">{personalInfo?.fullName || 'Your Full Name'}</h1>
          {personalInfo?.title && <p className="modern-subtitle">{personalInfo.title}</p>}
        </div>

        <div className="modern-contacts">
          {personalInfo?.email && (
            <div className="contact-item">
              <Mail size={12} className="contact-icon" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo?.phone && (
            <div className="contact-item">
              <Phone size={12} className="contact-icon" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo?.location && (
            <div className="contact-item">
              <MapPin size={12} className="contact-icon" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo?.linkedin && (
            <div className="contact-item">
              <LinkedinIcon size={12} className="contact-icon" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo?.github && (
            <div className="contact-item">
              <GithubIcon size={12} className="contact-icon" />
              <span>{personalInfo.github}</span>
            </div>
          )}
          {personalInfo?.portfolio && (
            <div className="contact-item">
              <Globe size={12} className="contact-icon" />
              <span>{personalInfo.portfolio}</span>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo?.summary && (
        <section className="modern-section">
          <h2 className="modern-heading">Profile</h2>
          <p className="modern-summary-text">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {workExperience && workExperience.length > 0 && (
        <section className="modern-section">
          <h2 className="modern-heading">Experience</h2>
          <div className="experience-timeline">
            {workExperience.map((exp, idx) => (
              <div key={exp.id || idx} className="timeline-item">
                <div className="timeline-header">
                  <div>
                    <span className="timeline-role">{exp.position}</span>
                    <span className="timeline-company"> · {exp.company}</span>
                    {exp.location && <span className="timeline-loc">({exp.location})</span>}
                  </div>
                  <span className="timeline-dates">
                    {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <div className="timeline-body">
                    {exp.description.split('\n').map((line, i) => (
                      line.trim() ? <div key={i} className="bullet-point">{line}</div> : null
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="modern-section">
          <h2 className="modern-heading">Featured Projects</h2>
          <div className="projects-grid">
            {projects.map((proj, idx) => (
              <div key={proj.id || idx} className="modern-card">
                <div className="card-top">
                  <span className="card-title">{proj.title}</span>
                  {proj.link && (
                    <span className="card-link-badge">
                      <ExternalLink size={10} /> {proj.link.replace(/^https?:\/\//, '')}
                    </span>
                  )}
                </div>
                {proj.technologies && (
                  <div className="modern-tech-pill">Tech: {proj.technologies}</div>
                )}
                {proj.description && (
                  <div className="timeline-body">
                    {proj.description.split('\n').map((line, i) => (
                      line.trim() ? <div key={i} className="bullet-point">{line}</div> : null
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Two Column Footer: Education & Skills */}
      <div className="modern-columns-layout">
        {education && education.length > 0 && (
          <section className="modern-section flex-1">
            <h2 className="modern-heading">Education</h2>
            {education.map((edu, idx) => (
              <div key={edu.id || idx} className="edu-card">
                <div className="edu-degree">{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</div>
                <div className="edu-inst">{edu.institution} {edu.location && `· ${edu.location}`}</div>
                <div className="edu-meta">{edu.startDate} – {edu.endDate} {edu.gpa && `| GPA: ${edu.gpa}`}</div>
                {edu.description && <p className="edu-desc">{edu.description}</p>}
              </div>
            ))}
          </section>
        )}

        <div className="flex-1">
          {skills && skills.length > 0 && (
            <section className="modern-section">
              <h2 className="modern-heading">Skills</h2>
              <div className="modern-pills-wrap">
                {skills.map((s, idx) => (
                  <span key={s.id || idx} className="modern-pill">
                    {s.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {certifications && certifications.length > 0 && (
            <section className="modern-section">
              <h2 className="modern-heading">Certifications</h2>
              {certifications.map((c, idx) => (
                <div key={c.id || idx} className="cert-item">
                  <span className="cert-name">{c.name}</span>
                  <span className="cert-issuer"> · {c.issuer}</span>
                  {c.date && <span className="cert-date"> ({c.date})</span>}
                </div>
              ))}
            </section>
          )}

          {languages && languages.length > 0 && (
            <section className="modern-section">
              <h2 className="modern-heading">Languages</h2>
              <div className="lang-list">
                {languages.map((l, idx) => (
                  <span key={l.id || idx} className="lang-badge">
                    {l.language} ({l.proficiency})
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
