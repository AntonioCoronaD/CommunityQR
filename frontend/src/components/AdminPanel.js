import React, { useState, useEffect } from 'react';
import { createQRCode, getPrizes, createPrize } from '../../services/api';

const AdminPanel = () => {
  const [prizes, setPrizes] = useState([]);
  const [newPrize, setNewPrize] = useState({ name: '', value: '' });
  const [qrCode, setQRCode] = useState(null);

  useEffect(() => {
    fetchPrizes();
  }, []);

  const fetchPrizes = async () => {
    try {
      const fetchedPrizes = await getPrizes();
      setPrizes(fetchedPrizes);
    } catch (error) {
      console.error('Failed to fetch prizes:', error);
    }
  };

  const handleCreatePrize = async (e) => {
    e.preventDefault();
    try {
      await createPrize(newPrize);
      setNewPrize({ name: '', value: '' });
      fetchPrizes();
    } catch (error) {
      console.error('Failed to create prize:', error);
    }
  };

  const handleCreateQRCode = async (prizeId) => {
    try {
      const qrCodeData = await createQRCode(prizeId);
      setQRCode(qrCodeData);
    } catch (error) {
      console.error('Failed to create QR code:', error);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <div className="create-prize">
        <h3>Create New Prize</h3>
        <form onSubmit={handleCreatePrize}>
          <input
            type="text"
            value={newPrize.name}
            onChange={(e) => setNewPrize({ ...newPrize, name: e.target.value })}
            placeholder="Prize Name"
            required
          />
          <input
            type="number"
            value={newPrize.value}
            onChange={(e) => setNewPrize({ ...newPrize, value: e.target.value })}
            placeholder="Prize Value"
            required
          />
          <button type="submit">Create Prize</button>
        </form>
      </div>
      <div className="prize-list">
        <h3>Existing Prizes</h3>
        <ul>
          {prizes.map((prize) => (
            <li key={prize._id}>
              {prize.name} - ${prize.value}
              <button onClick={() => handleCreateQRCode(prize._id)}>Generate QR Code</button>
            </li>
          ))}
        </ul>
      </div>
      {qrCode && (
        <div className="qr-code">
          <h3>Generated QR Code</h3>
          <img src={qrCode.qrCodeDataURL} alt="QR Code" />
          <p>Unique ID: {qrCode.uniqueId}</p>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;