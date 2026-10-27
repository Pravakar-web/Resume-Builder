const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const FileDB = require('../config/fileDb');
const { getDbStatus } = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'resumely_super_secure_jwt_secret_2026_key';

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id || user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: '30d' }
  );
};

// @route   POST /api/auth/register
// @desc    Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    const { mode } = getDbStatus();

    // Check if user already exists
    if (mode === 'mongodb') {
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'Email already registered' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password: hashedPassword
      });

      const token = generateToken(user);
      return res.status(201).json({
        success: true,
        token,
        user: { id: user._id, name: user.name, email: user.email }
      });
    } else {
      // Local FileDB mode
      const existingUser = FileDB.findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'Email already registered' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = FileDB.createUser({
        name,
        email: email.toLowerCase(),
        password: hashedPassword
      });

      const token = generateToken(user);
      return res.status(201).json({
        success: true,
        token,
        user: { id: user._id, name: user.name, email: user.email }
      });
    }
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
};

// @route   POST /api/auth/login
// @desc    Authenticate user & return token
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const { mode } = getDbStatus();
    let user;

    if (mode === 'mongodb') {
      user = await User.findOne({ email: email.toLowerCase() });
    } else {
      user = FileDB.findUserByEmail(email);
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(user);
    res.json({
      success: true,
      token,
      user: { id: user._id || user.id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

// @route   GET /api/auth/me
// @desc    Get currently logged in user
exports.getMe = async (req, res) => {
  try {
    const { mode } = getDbStatus();
    let user;

    if (mode === 'mongodb') {
      user = await User.findById(req.user.id).select('-password');
    } else {
      user = FileDB.findUserById(req.user.id);
      if (user) {
        const { password, ...userWithoutPassword } = user;
        user = userWithoutPassword;
      }
    }

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      user: { id: user._id || user.id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error('GetMe error:', err);
    res.status(500).json({ success: false, message: 'Server error fetching user profile' });
  }
};
