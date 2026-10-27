import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';
import { 
  Plus, 
  FileText, 
  Copy, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  Clock, 
  Loader2, 
  AlertCircle,
  Sparkles,
  Download
} from 'lucide-react';
import { getTemplateById } from '../templates';

export const DashboardPage = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [renameModal, setRenameModal] = useState({ open: false, id: null, title: '' });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login?redirect=/dashboard');
    }
  }, [authLoading, isAuthenticated, navigate]);

  const fetchResumes = async () => {
    try {
      const res = await api.getResumes();
      if (res.success && res.data) {
        setResumes(res.data);
      }
    } catch (err) {
      console.error('Error fetching dashboard resumes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchResumes();
    }
  }, [isAuthenticated]);

  const handleCreateNew = async (useSample = false) => {
    setActionLoadingId('create');
    try {
      const res = await api.createResume({
        title: useSample ? 'My Professional Resume' : 'Untitled Resume',
        templateId: 'modern-minimal',
        useSample
      });
      if (res.success && res.data?._id) {
        navigate(`/editor?id=${res.data._id}`);
      }
    } catch (err) {
      console.error('Create error:', err);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDuplicate = async (id, e) => {
    e.stopPropagation();
    setActionLoadingId(id);
    try {
      const res = await api.duplicateResume(id);
      if (res.success) {
        fetchResumes();
      }
    } catch (err) {
      console.error('Duplicate error:', err);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (id, title, e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      setActionLoadingId(id);
      try {
        const res = await api.deleteResume(id);
        if (res.success) {
          setResumes(prev => prev.filter(r => (r._id || r.id) !== id));
        }
      } catch (err) {
        console.error('Delete error:', err);
      } finally {
        setActionLoadingId(null);
      }
    }
  };

  const handleRenameSubmit = async (e) => {
    e.preventDefault();
    if (!renameModal.title.trim()) return;
    try {
      await api.updateResume(renameModal.id, { title: renameModal.title });
      setResumes(prev => prev.map(r => (r._id || r.id) === renameModal.id ? { ...r, title: renameModal.title } : r));
      setRenameModal({ open: false, id: null, title: '' });
    } catch (err) {
      console.error('Rename error:', err);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Welcome back, {user?.name || 'User'}</h1>
          <p className="dashboard-sub">Manage, customize, and export all your professional resumes.</p>
        </div>

        <div className="dashboard-actions-row">
          <button 
            onClick={() => handleCreateNew(false)}
            disabled={actionLoadingId === 'create'}
            className="btn btn-secondary"
          >
            <Plus size={16} /> Blank Resume
          </button>
          <button 
            onClick={() => handleCreateNew(true)}
            disabled={actionLoadingId === 'create'}
            className="btn btn-primary"
          >
            <Sparkles size={16} /> Create from Sample
          </button>
        </div>
      </div>

      {/* Main Content */}
      {loading ? (
        <div className="dashboard-loading-box">
          <Loader2 size={32} className="spin-icon" />
          <p>Loading your resumes...</p>
        </div>
      ) : resumes.length === 0 ? (
        /* Empty State */
        <div className="dashboard-empty-card">
          <div className="empty-icon-circle">
            <FileText size={36} />
          </div>
          <h2>No Resumes Created Yet</h2>
          <p>Create your first professional resume today with our easy split-screen builder and ATS-friendly templates.</p>
          <div className="empty-cta-buttons">
            <button onClick={() => handleCreateNew(true)} className="btn btn-primary btn-lg">
              <Sparkles size={18} /> Create Your First Resume
            </button>
          </div>
        </div>
      ) : (
        /* Grid of Resumes */
        <div className="resumes-grid">
          {resumes.map((res) => {
            const id = res._id || res.id;
            const tpl = getTemplateById(res.templateId);

            return (
              <div 
                key={id} 
                className="resume-card-item"
                onClick={() => navigate(`/editor?id=${id}`)}
              >
                {/* Thumbnail Preview Area */}
                <div className="resume-card-thumb">
                  <div className="card-thumb-mockup">
                    <div className="mockup-header-bar" style={{ backgroundColor: res.themeConfig?.accentColor || '#4f46e5' }} />
                    <div className="mockup-body-lines">
                      <div className="m-line l-full" />
                      <div className="m-line l-short" />
                      <div className="m-line l-med" />
                      <div className="m-line l-full" />
                      <div className="m-line l-med" />
                    </div>
                  </div>
                  <div className="thumb-hover-overlay">
                    <span className="btn btn-secondary btn-sm">
                      <Edit3 size={14} /> Open Editor
                    </span>
                  </div>
                </div>

                {/* Info & Metadata */}
                <div className="resume-card-info">
                  <div className="card-title-row">
                    <h3 className="card-resume-title" title={res.title}>
                      {res.title || 'Untitled Resume'}
                    </h3>
                  </div>

                  <div className="card-meta-row">
                    <span className="badge">{tpl.name}</span>
                    <span className="card-date-meta">
                      <Clock size={12} />
                      {new Date(res.updatedAt || res.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="resume-card-action-bar">
                    <button
                      className="card-action-btn"
                      title="Rename"
                      onClick={(e) => {
                        e.stopPropagation();
                        setRenameModal({ open: true, id, title: res.title || 'Untitled Resume' });
                      }}
                    >
                      <Edit3 size={14} /> Rename
                    </button>

                    <button
                      className="card-action-btn"
                      title="Duplicate"
                      disabled={actionLoadingId === id}
                      onClick={(e) => handleDuplicate(id, e)}
                    >
                      <Copy size={14} /> Duplicate
                    </button>

                    <button
                      className="card-action-btn text-danger"
                      title="Delete"
                      disabled={actionLoadingId === id}
                      onClick={(e) => handleDelete(id, res.title, e)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Rename Modal */}
      {renameModal.open && (
        <div className="modal-backdrop">
          <div className="modal-dialog-box animate-fade-in">
            <h3 className="modal-title">Rename Resume</h3>
            <form onSubmit={handleRenameSubmit}>
              <div className="form-group">
                <label className="form-label">Resume Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={renameModal.title}
                  onChange={(e) => setRenameModal(prev => ({ ...prev, title: e.target.value }))}
                  autoFocus
                />
              </div>
              <div className="modal-btn-row">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setRenameModal({ open: false, id: null, title: '' })}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
