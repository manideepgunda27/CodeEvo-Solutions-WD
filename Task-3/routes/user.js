const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

// Route accessible to all logged-in users
router.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: `Welcome ${req.user.username}`, user: req.user });
});

// Admin-only route
router.get('/admin', authMiddleware, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    res.json({ message: `Welcome Admin ${req.user.username}` });
});

module.exports = router;
