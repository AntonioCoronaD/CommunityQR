import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import { scanQRCode } from '../../services/api';

const QRScanner = ({ user, location }) => {
  const [result, setResult] = useState('');

  const handleScan = async (data) => {
    if (data) {
      try {
        const response = await scanQRCode(data, user.id, location.lat, location.lng);
        setResult(response.message);
      } catch (error) {
        console.error('QR scan failed:', error);
        setResult('Scan failed. Please try again.');
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      <p>{result}</p>
    </div>
  );
};

export default QRScanner;