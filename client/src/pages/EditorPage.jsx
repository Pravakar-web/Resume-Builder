import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { ResumeForm } from '../components/ResumeForm';
import { ResumePreview } from '../components/ResumePreview';
import { DEFAULT_RESUME, EMPTY_RESUME } from '../utils/sampleData';
import { api } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { 
  Save, 
  RotateCcw, 
  Sparkles, 
  Check, 
  ChevronLeft, 
  SlidersHorizontal, 
  Eye, 
  CheckCircle2,
  FileCheck
} from 'lucide-react';

export const EditorPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const resumeId = searchParams.get('id');
  const templateParam = searchParams.get('template');

  const [resumeData, setResumeData] = useState(() => {
    // Check local storage for quick draft restoration
    const cached = localStorage.getItem('resumely_draft');
    if (cached && !resumeId) {
      try {
        const parsed = JSON.parse(cached);
        if (templateParam) parsed.templateId = templateParam;
        return parsed;
      } catch (e) {
        // Fallback to sample
      }
    }
    const initial = JSON.parse(JSON.stringify(DEFAULT_RESUME));
    if (templateParam) initial.templateId = templateParam;
    return initial;
  });

  const [zoom, setZoom] = useState(0.85);
  const [activeTab, setActiveTab] = useState('split'); // 'edit', 'preview', 'split'
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'saved', 'error'
  const [loadingResume, setLoadingResume] = useState(false);

  // Load existing resume from backend if resumeId is provided
  useEffect(() => {
    if (resumeId) {
      setLoadingResume(true);
      api.getResumeById(resumeId)
        .then(res => {
          if (res.success && res.data) {
            setResumeData(res.data);
          }
        })
        .catch(err => console.error('Error fetching resume:', err))
        .finally(() => setLoadingResume(false));
    }
  }, [resumeId]);

  // Keep local draft cache updated
  useEffect(() => {
    localStorage.setItem('resumely_draft', JSON.stringify(resumeData));
  }, [resumeData]);

  // Handle Save (to backend if logged in, otherwise local)
  const handleSave = async () => {
    setSaving(true);
    setSaveStatus(null);
    try {
      if (isAuthenticated) {
        if (resumeId) {
          await api.updateResume(resumeId, resumeData);
        } else {
          const res = await api.createResume(resumeData);
          if (res.success && res.data?._id) {
            navigate(`/editor?id=${res.data._id}`, { replace: true });
          }
        }
        setSaveStatus('saved');
      } else {
        localStorage.setItem('resumely_draft', JSON.stringify(resumeData));
        setSaveStatus('saved_locally');
      }
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      console.error('Save failed:', err);
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset this resume to sample data?')) {
      setResumeData(JSON.parse(JSON.stringify(DEFAULT_RESUME)));
    }
  };

  const handleClear = () => {
    if (window.confirm('Clear all fields to start completely from scratch?')) {
      setResumeData(JSON.parse(JSON.stringify(EMPTY_RESUME)));
    }
  };

  // Completion calculation
  const calculateCompletion = () => {
    let score = 0;
    const p = resumeData.personalInfo || {};
    if (p.fullName) score += 15;
    if (p.title) score += 10;
    if (p.email) score += 10;
    if (p.phone) score += 5;
    if (p.summary) score += 15;
    if (resumeData.workExperience?.length > 0) score += 20;
    if (resumeData.education?.length > 0) score += 10;
    if (resumeData.skills?.length > 0) score += 15;
    return Math.min(score, 100);
  };

  const completionPct = calculateCompletion();

  return (
    <div className="editor-container">
      {/* Top Header Bar */}
      <div className="editor-header-bar">
        <div className="editor-header-left">
          <Link to="/dashboard" className="btn-back-link" title="Back to Dashboard">
            <ChevronLeft size={18} />
          </Link>
          <input
            type="text"
            className="resume-title-input"
            value={resumeData.title || ''}
            onChange={(e) => setResumeData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Name your resume (e.g. Senior Software Engineer)"
          />
          <div className="completion-meter" title={`${completionPct}% Completed`}>
            <div className="meter-track">
              <div className="meter-fill" style={{ width: `${completionPct}%` }} />
            </div>
            <span className="meter-text">{completionPct}% Complete</span>
          </div>
        </div>

        {/* Responsive Mobile Toggle Tabs */}
        <div className="editor-view-toggles">
          <button 
            className={`view-toggle-btn ${activeTab === 'edit' ? 'active' : ''}`}
            onClick={() => setActiveTab('edit')}
          >
            <SlidersHorizontal size={14} /> Form
          </button>
          <button 
            className={`view-toggle-btn ${activeTab === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            <Eye size={14} /> Preview
          </button>
          <button 
            className={`view-toggle-btn desktop-only ${activeTab === 'split' ? 'active' : ''}`}
            onClick={() => setActiveTab('split')}
          >
            Split View
          </button>
        </div>

        {/* Action Buttons */}
        <div className="editor-header-actions">
          <button onClick={handleReset} className="btn btn-ghost btn-sm" title="Fill sample data">
            <RotateCcw size={14} /> Sample
          </button>

          <button onClick={handleClear} className="btn btn-ghost btn-sm" title="Clear all fields">
            Clear
          </button>

          <button 
            onClick={handleSave} 
            disabled={saving} 
            className={`btn btn-primary btn-sm ${saveStatus ? 'btn-success' : ''}`}
          >
            {saving ? (
              <span>Saving...</span>
            ) : saveStatus === 'saved' ? (
              <><CheckCircle2 size={14} /> Saved!</>
            ) : saveStatus === 'saved_locally' ? (
              <><Check size={14} /> Saved Locally</>
            ) : (
              <><Save size={14} /> {isAuthenticated ? 'Save Resume' : 'Save Draft'}</>
            )}
          </button>
        </div>
      </div>

      {/* Main Split-Screen Workspace */}
      <div className={`editor-workspace tab-${activeTab}`}>
        {/* Form Panel */}
        <div className="editor-panel-form">
          <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
        </div>

        {/* Live Preview Panel */}
        <div className="editor-panel-preview">
          <ResumePreview resumeData={resumeData} zoom={zoom} setZoom={setZoom} />
        </div>
      </div>
    </div>
  );
};
