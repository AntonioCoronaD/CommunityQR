const express = require('express');
const router = express.Router();
const { createQRCode, scanQRCode, getNearbyQRCodes } = require('../controllers/qrController');
const { protect, adminOnly } = require('../middlewares/auth');

router.post('/', protect, adminOnly, createQRCode);
router.post('/scan', protect, scanQRCode);
router.get('/nearby', protect, getNearbyQRCodes);

module.exports = router;