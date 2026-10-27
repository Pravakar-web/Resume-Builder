const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const RESUMES_FILE = path.join(DATA_DIR, 'resumes.json');

// Ensure data folder and files exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
}
if (!fs.existsSync(RESUMES_FILE)) {
  fs.writeFileSync(RESUMES_FILE, JSON.stringify([], null, 2));
}

const readData = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return [];
  }
};

const writeData = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
};

const FileDB = {
  findUsers: () => readData(USERS_FILE),
  saveUsers: (users) => writeData(USERS_FILE, users),
  findUserById: (id) => readData(USERS_FILE).find(u => u._id === id || u.id === id),
  findUserByEmail: (email) => readData(USERS_FILE).find(u => u.email.toLowerCase() === email.toLowerCase()),
  createUser: (userData) => {
    const users = readData(USERS_FILE);
    const newUser = {
      _id: 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      ...userData,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    writeData(USERS_FILE, users);
    return newUser;
  },

  findResumes: () => readData(RESUMES_FILE),
  findResumesByUserId: (userId) => readData(RESUMES_FILE).filter(r => r.userId === userId),
  findResumeById: (id) => readData(RESUMES_FILE).find(r => r._id === id || r.id === id),
  createResume: (resumeData) => {
    const resumes = readData(RESUMES_FILE);
    const newResume = {
      _id: 'res_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      ...resumeData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    resumes.push(newResume);
    writeData(RESUMES_FILE, resumes);
    return newResume;
  },
  updateResume: (id, updateData) => {
    const resumes = readData(RESUMES_FILE);
    const index = resumes.findIndex(r => r._id === id || r.id === id);
    if (index === -1) return null;
    resumes[index] = {
      ...resumes[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    writeData(RESUMES_FILE, resumes);
    return resumes[index];
  },
  deleteResume: (id) => {
    let resumes = readData(RESUMES_FILE);
    const initialLen = resumes.length;
    resumes = resumes.filter(r => r._id !== id && r.id !== id);
    writeData(RESUMES_FILE, resumes);
    return resumes.length < initialLen;
  }
};

module.exports = FileDB;
