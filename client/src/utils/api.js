const API_BASE = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('resumely_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const api = {
  // Auth endpoints
  async register(name, email, password) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    return res.json();
  },

  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  async getMe() {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Resumes CRUD
  async getResumes() {
    const res = await fetch(`${API_BASE}/resumes`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async getResumeById(id) {
    const res = await fetch(`${API_BASE}/resumes/${id}`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async createResume(resumeData) {
    const res = await fetch(`${API_BASE}/resumes`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(resumeData)
    });
    return res.json();
  },

  async updateResume(id, resumeData) {
    const res = await fetch(`${API_BASE}/resumes/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(resumeData)
    });
    return res.json();
  },

  async duplicateResume(id) {
    const res = await fetch(`${API_BASE}/resumes/${id}/duplicate`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async deleteResume(id) {
    const res = await fetch(`${API_BASE}/resumes/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // AI Assistance
  async improveText(type, text, targetRole) {
    const res = await fetch(`${API_BASE}/ai/improve`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ type, text, targetRole })
    });
    return res.json();
  }
};
