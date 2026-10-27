import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FileText, Sparkles, Layout, LogIn, LogOut, User, PlusCircle } from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar-container">
      <div className="navbar-inner">
        {/* Brand */}
        <Link to="/" className="navbar-brand">
          <div className="brand-icon-box">
            <FileText size={20} color="#ffffff" />
          </div>
          <span className="brand-name">Resumely</span>
          <span className="brand-pill">Pro</span>
        </Link>

        {/* Center Links */}
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/#templates" className="nav-link">Templates</Link>
          <Link to="/#features" className="nav-link">Features</Link>
          <Link to="/editor" className="nav-link highlight">
            <Sparkles size={14} className="sparkle-icon" /> Builder
          </Link>
        </div>

        {/* Right Actions */}
        <div className="navbar-actions">
          {isAuthenticated ? (
            <div className="user-profile-menu">
              <Link to="/dashboard" className="btn btn-secondary">
                <Layout size={16} /> My Resumes
              </Link>
              <div className="user-info-badge">
                <User size={15} />
                <span>{user?.name?.split(' ')[0]}</span>
              </div>
              <button onClick={logout} className="btn btn-ghost" title="Logout">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-ghost">Log In</Link>
              <Link to="/register" className="btn btn-primary">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
