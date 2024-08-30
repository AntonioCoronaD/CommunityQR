const QRCode = require('qrcode');
const crypto = require('crypto');

exports.generateQRCode = async (prizeId) => {
  const uniqueId = crypto.randomBytes(16).toString('hex');
  const data = JSON.stringify({ prizeId, uniqueId });
  
  try {
    const qrCodeDataURL = await QRCode.toDataURL(data);
    return { qrCodeDataURL, uniqueId };
  } catch (error) {
    console.error('QR Code generation failed:', error);
    throw error;
  }
};