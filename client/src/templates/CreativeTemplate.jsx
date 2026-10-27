import React from 'react';
import { Mail, Phone, MapPin, Globe, Award, CheckCircle } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/SocialIcons';

export const CreativeTemplate = ({ data }) => {
  const { personalInfo, workExperience, education, skills, projects, certifications, languages, achievements, themeConfig } = data;
  const accent = themeConfig?.accentColor || '#7c3aed';

  return (
    <div className="resume-sheet creative-template" style={{ '--accent': accent }}>
      {/* Left Sidebar */}
      <aside className="creative-sidebar">
        <div className="sidebar-profile">
          <div className="sidebar-avatar">
            {(personalInfo?.fullName || 'U').split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <h1 className="sidebar-name">{personalInfo?.fullName || 'Your Name'}</h1>
          <div className="sidebar-title">{personalInfo?.title}</div>
        </div>

        {/* Contact Info */}
        <div className="sidebar-block">
          <h3 className="sidebar-heading">Contact</h3>
          <div className="sidebar-contact-list">
            {personalInfo?.email && (
              <div className="sidebar-contact-item">
                <Mail size={13} />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo?.phone && (
              <div className="sidebar-contact-item">
                <Phone size={13} />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo?.location && (
              <div className="sidebar-contact-item">
                <MapPin size={13} />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo?.linkedin && (
              <div className="sidebar-contact-item">
                <LinkedinIcon size={13} />
                <span>{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo?.github && (
              <div className="sidebar-contact-item">
                <GithubIcon size={13} />
                <span>{personalInfo.github}</span>
              </div>
            )}
            {personalInfo?.portfolio && (
              <div className="sidebar-contact-item">
                <Globe size={13} />
                <span>{personalInfo.portfolio}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="sidebar-block">
            <h3 className="sidebar-heading">Key Skills</h3>
            <div className="creative-skill-bars">
              {skills.map((s, idx) => (
                <div key={s.id || idx} className="skill-meter-wrap">
                  <span className="skill-name">{s.name}</span>
                  <div className="skill-track">
                    <div 
                      className="skill-fill" 
                      style={{ 
                        width: s.level === 'Expert' ? '95%' : s.level === 'Advanced' ? '80%' : s.level === 'Intermediate' ? '65%' : '50%' 
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div className="sidebar-block">
            <h3 className="sidebar-heading">Education</h3>
            {education.map((edu, idx) => (
              <div key={edu.id || idx} className="sidebar-edu-item">
                <div className="sidebar-degree">{edu.degree}</div>
                <div className="sidebar-school">{edu.institution}</div>
                <div className="sidebar-date">{edu.startDate} – {edu.endDate}</div>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages && languages.length > 0 && (
          <div className="sidebar-block">
            <h3 className="sidebar-heading">Languages</h3>
            {languages.map((l, idx) => (
              <div key={l.id || idx} className="sidebar-lang-item">
                <span>{l.language}</span>
                <span className="lang-level">{l.proficiency}</span>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <main className="creative-main">
        {/* Profile Summary */}
        {personalInfo?.summary && (
          <section className="creative-section">
            <h2 className="creative-heading">
              <span className="heading-marker" /> About Me
            </h2>
            <p className="creative-text">{personalInfo.summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {workExperience && workExperience.length > 0 && (
          <section className="creative-section">
            <h2 className="creative-heading">
              <span className="heading-marker" /> Experience
            </h2>
            {workExperience.map((exp, idx) => (
              <div key={exp.id || idx} className="creative-card">
                <div className="creative-card-top">
                  <div>
                    <h3 className="creative-role">{exp.position}</h3>
                    <div className="creative-company">{exp.company} {exp.location && `· ${exp.location}`}</div>
                  </div>
                  <span className="creative-date-tag">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <div className="creative-desc">
                    {exp.description.split('\n').map((line, i) => (
                      line.trim() ? <div key={i} className="bullet-point">{line}</div> : null
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Featured Projects */}
        {projects && projects.length > 0 && (
          <section className="creative-section">
            <h2 className="creative-heading">
              <span className="heading-marker" /> Portfolio & Projects
            </h2>
            {projects.map((proj, idx) => (
              <div key={proj.id || idx} className="creative-card">
                <div className="creative-card-top">
                  <h3 className="creative-role">{proj.title}</h3>
                  {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="creative-link">{proj.link}</a>}
                </div>
                {proj.technologies && <div className="creative-tech-tag">{proj.technologies}</div>}
                {proj.description && (
                  <div className="creative-desc">
                    {proj.description.split('\n').map((line, i) => (
                      line.trim() ? <div key={i} className="bullet-point">{line}</div> : null
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Certifications & Achievements */}
        {((certifications && certifications.length > 0) || (achievements && achievements.length > 0)) && (
          <section className="creative-section">
            <h2 className="creative-heading">
              <span className="heading-marker" /> Highlights & Awards
            </h2>
            <div className="creative-highlights-grid">
              {achievements && achievements.map((ach, idx) => (
                <div key={ach.id || idx} className="highlight-pill">
                  <Award size={14} className="hl-icon" />
                  <div>
                    <strong>{ach.title}</strong>
                    {ach.description && <div className="hl-sub">{ach.description}</div>}
                  </div>
                </div>
              ))}
              {certifications && certifications.map((c, idx) => (
                <div key={c.id || idx} className="highlight-pill">
                  <CheckCircle size={14} className="hl-icon" />
                  <div>
                    <strong>{c.name}</strong>
                    <div className="hl-sub">{c.issuer} ({c.date})</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
