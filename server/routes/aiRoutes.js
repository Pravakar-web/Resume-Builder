const express = require('express');
const router = express.Router();
const { improveText } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

// Optional AI endpoint
router.post('/improve', protect, improveText);

module.exports = router;
