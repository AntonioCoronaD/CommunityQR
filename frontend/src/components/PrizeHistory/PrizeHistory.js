import React, { useEffect, useState } from 'react';
import { getPrizeHistory } from '../../services/api';

const PrizeHistory = ({ user }) => {
  const [prizes, setPrizes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrizes = async () => {
      try {
        const history = await getPrizeHistory(user.id);
        setPrizes(history);
      } catch (error) {
        console.error('Failed to fetch prize history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrizes();
  }, [user.id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="prize-history">
      <h2>Your Prize History</h2>
      {prizes.length === 0 ? (
        <p>You haven't won any prizes yet. Keep hunting!</p>
      ) : (
        <ul>
          {prizes.map((prize) => (
            <li key={prize._id}>
              <h3>{prize.name}</h3>
              <p>Won on: {new Date(prize.wonAt).toLocaleDateString()}</p>
              <p>Value: ${prize.value}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PrizeHistory;