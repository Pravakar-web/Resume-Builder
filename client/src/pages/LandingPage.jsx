import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  FileCheck2, 
  Download, 
  Sliders, 
  Layers, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Eye,
  Star
} from 'lucide-react';
import { TEMPLATES } from '../templates';
import { DEFAULT_RESUME } from '../utils/sampleData';

export const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">
          <Sparkles size={14} className="sparkle-gold" />
          <span>Next-Generation Resume Intelligence</span>
        </div>

        <h1 className="hero-headline">
          Build a Resume That Gets You <span className="gradient-text">Noticed & Hired</span>
        </h1>

        <p className="hero-subtitle">
          Design ATS-optimized, modern resumes with instant live previews, 4 executive templates, 
          and pixel-perfect PDF export. No design experience needed.
        </p>

        <div className="hero-cta-group">
          <Link to="/editor" className="btn btn-primary btn-lg">
            <span>Build My Resume Now</span>
            <ArrowRight size={18} />
          </Link>
          <a href="#templates" className="btn btn-secondary btn-lg">
            Explore Templates
          </a>
        </div>

        {/* Live Mockup Teaser */}
        <div className="hero-preview-mockup">
          <div className="mockup-browser-header">
            <div className="browser-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <div className="browser-url-bar">resumely.pro/editor/alex-morgan-software-engineer</div>
          </div>
          <div className="mockup-content-window">
            <div className="mockup-form-col">
              <div className="mockup-field-skeleton large" />
              <div className="mockup-field-skeleton medium" />
              <div className="mockup-field-skeleton" />
              <div className="mockup-field-skeleton" />
            </div>
            <div className="mockup-resume-col">
              <div className="resume-mini-card">
                <div className="mini-header-line" />
                <div className="mini-sub-line" />
                <div className="mini-para-line" />
                <div className="mini-para-line short" />
                <div className="mini-grid">
                  <div className="mini-box" />
                  <div className="mini-box" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Showcase */}
      <section id="templates" className="landing-section">
        <div className="section-header-center">
          <span className="section-eyebrow">Executive Layouts</span>
          <h2 className="section-heading">4 Handcrafted Resume Templates</h2>
          <p className="section-subtext">
            Engineered to pass Applicant Tracking Systems (ATS) while captivating hiring managers.
          </p>
        </div>

        <div className="templates-showcase-grid">
          {TEMPLATES.map((tpl) => (
            <div key={tpl.id} className="template-card-preview">
              <div className="card-top-category">{tpl.category}</div>
              <h3 className="template-card-title">{tpl.name}</h3>
              <p className="template-card-summary">{tpl.description}</p>
              
              <div className="template-thumbnail-box">
                <div className="thumb-bar" style={{ backgroundColor: tpl.defaultColor }} />
                <div className="thumb-lines">
                  <div className="line full" />
                  <div className="line med" />
                  <div className="line full" />
                  <div className="line short" />
                </div>
              </div>

              <Link to={`/editor?template=${tpl.id}`} className="btn btn-secondary btn-block">
                Use This Template
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="landing-section bg-gradient-soft">
        <div className="section-header-center">
          <span className="section-eyebrow">How It Works</span>
          <h2 className="section-heading">Your Dream Resume in 3 Simple Steps</h2>
        </div>

        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">01</div>
            <div className="step-icon-wrap"><Sliders size={24} /></div>
            <h3>Fill In Your Experience</h3>
            <p>Our intuitive smart forms guide you through adding your career history, skills, and projects with real-time feedback.</p>
          </div>

          <div className="step-card">
            <div className="step-number">02</div>
            <div className="step-icon-wrap"><Layers size={24} /></div>
            <h3>Choose Style & Template</h3>
            <p>Switch between Classic, Modern, Creative, or Technical layouts instantly without losing a single character of your data.</p>
          </div>

          <div className="step-card">
            <div className="step-number">03</div>
            <div className="step-icon-wrap"><Download size={24} /></div>
            <h3>Export Pixel-Perfect PDF</h3>
            <p>Download ATS-friendly PDF documents with real selectable text, correct A4 margins, or print directly with one click.</p>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="landing-section">
        <div className="section-header-center">
          <span className="section-eyebrow">Why Resumely</span>
          <h2 className="section-heading">Everything You Need to Succeed</h2>
        </div>

        <div className="features-grid-3">
          <div className="feature-item">
            <div className="feature-icon"><Zap size={22} /></div>
            <h4>Instant Real-Time Preview</h4>
            <p>Watch your document update synchronously with zero delay as you type each word.</p>
          </div>

          <div className="feature-item">
            <div className="feature-icon"><FileCheck2 size={22} /></div>
            <h4>100% ATS Compliant</h4>
            <p>Clean semantic structure designed so automated recruitment algorithms parse your skills flawlessly.</p>
          </div>

          <div className="feature-item">
            <div className="feature-icon"><ShieldCheck size={22} /></div>
            <h4>Secure Cloud Persistence</h4>
            <p>Save unlimited versions of your resume, duplicate for different job applications, and access them anytime.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="resumely-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="brand-name">Resumely</span>
            <p>The modern standard for executive resumes and career success.</p>
          </div>
          <div className="footer-links">
            <Link to="/editor">Resume Builder</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/login">Sign In</Link>
          </div>
          <div className="footer-copy">
            © {new Date().getFullYear()} Resumely Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
