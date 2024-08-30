const express = require('express');
const router = express.Router();
const { createPrize, getPrizes, getPrizeHistory } = require('../controllers/prizeController');
const { protect, adminOnly } = require('../middlewares/auth');

router.post('/', protect, adminOnly, createPrize);
router.get('/', protect, adminOnly, getPrizes);
router.get('/history/:userId', protect, getPrizeHistory);

module.exports = router;