const QRCode = require('../models/QRCode');
const Prize = require('../models/Prize');
const User = require('../models/User');
const { generateQRCode } = require('../utils/qrCodeGenerator');

exports.createQRCode = async (req, res) => {
  try {
    const { prizeId, lat, lng } = req.body;
    const { qrCodeDataURL, uniqueId } = await generateQRCode(prizeId);
    const qrCode = new QRCode({
      prizeId,
      uniqueId,
      location: {
        type: 'Point',
        coordinates: [lng, lat]
      }
    });
    await qrCode.save();
    res.status(201).json({ qrCode, qrCodeDataURL });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.scanQRCode = async (req, res) => {
  try {
    const { qrCodeId, userId, lat, lng } = req.body;
    const qrCode = await QRCode.findOne({ uniqueId: qrCodeId });
    if (!qrCode) {
      return res.status(404).json({ message: 'QR Code not found' });
    }
    if (qrCode.scannedBy) {
      return res.status(400).json({ message: 'QR Code already scanned' });
    }
    const prize = await Prize.findById(qrCode.prizeId);
    qrCode.scannedBy = userId;
    qrCode.scannedAt = new Date();
    await qrCode.save();
    const user = await User.findById(userId);
    user.prizesWon.push(prize._id);
    await user.save();
    req.io.emit('newNotification', { userId, message: `Congratulations! You've won ${prize.name}!` });
    res.json({ message: 'QR Code scanned successfully', prize });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getNearbyQRCodes = async (req, res) => {
  try {
    const { lat, lng } = req.query;
    const nearbyQRCodes = await QRCode.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: 1000 // 1km radius
        }
      },
      scannedBy: null
    });
    res.json(nearbyQRCodes);
  } catch (error) {}};