import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const ENDPOINT = process.env.REACT_APP_SOCKET_ENDPOINT || 'http://localhost:5000';

const Notifications = ({ user }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = io(ENDPOINT);
    
    socket.on('connect', () => {
      console.log('Connected to server');
      socket.emit('join', { userId: user.id });
    });

    socket.on('newNotification', (notification) => {
      setNotifications(prev => [...prev, notification]);
    });

    return () => {
      socket.disconnect();
    };
  }, [user.id]);

  return (
    <div className="notifications">
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>{notification.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;