const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Sign Up
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role, avatar } = req.body;

    // Validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Validate role
    if (!['guardian', 'protectee'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Must be either "guardian" or "protectee"'
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      role,
      avatar: avatar || 'avatar1'
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        points: user.points,
        level: user.level
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: error.message
    });
  }
});

// Sign In
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        points: user.points,
        level: user.level
      }
    });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message
    });
  }
});

// Verify Token (for protected routes)
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        points: user.points,
        level: user.level
      }
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
});

// Get available avatars
router.get('/avatars', (req, res) => {
  const avatars = [
    { id: 'avatar1', name: 'Guardian Shield', icon: '🛡️' },
    { id: 'avatar2', name: 'Cyber Warrior', icon: '⚔️' },
    { id: 'avatar3', name: 'Digital Ninja', icon: '🥷' },
    { id: 'avatar4', name: 'Code Master', icon: '💻' },
    { id: 'avatar5', name: 'Security Expert', icon: '🔒' },
    { id: 'avatar6', name: 'Network Guardian', icon: '🌐' },
    { id: 'avatar7', name: 'Data Protector', icon: '🔐' },
    { id: 'avatar8', name: 'Cyber Defender', icon: '🛡️' },
    { id: 'avatar9', name: 'Tech Guardian', icon: '⚡' },
    { id: 'avatar10', name: 'Digital Hero', icon: '🦸' },
    { id: 'avatar11', name: 'Code Guardian', icon: '👩‍💻' },
    { id: 'avatar12', name: 'Security Queen', icon: '👑' }
  ];

  res.json({
    success: true,
    avatars
  });
});

module.exports = router;

