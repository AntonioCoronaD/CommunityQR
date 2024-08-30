const Prize = require('../models/Prize');
const User = require('../models/User');

exports.createPrize = async (req, res) => {
  try {
    const { name, value } = req.body;
    const prize = new Prize({ name, value });
    await prize.save();
    res.status(201).json(prize);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPrizes = async (req, res) => {
  try {
    const prizes = await Prize.find();
    res.json(prizes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPrizeHistory = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('prizesWon');
    res.json(user.prizesWon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};