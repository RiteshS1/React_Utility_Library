import React from 'react';
import { Users } from 'lucide-react';
import { useSocket } from '../context/SocketContext';

const OnlineUsers: React.FC = () => {
  const { onlineUsers, connected } = useSocket();

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      background: connected ? '#e8f5e9' : '#fafafa',
      border: `1px solid ${connected ? '#4caf50' : '#ddd'}`,
      borderRadius: '20px',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: connected ? '#2e7d32' : '#666'
    }}>
      <Users size={16} />
      <span>
        {onlineUsers} {onlineUsers === 1 ? 'user' : 'users'} online
      </span>
      {connected && (
        <span style={{
          width: '8px',
          height: '8px',
          background: '#4caf50',
          borderRadius: '50%',
          animation: 'pulse 2s ease-in-out infinite'
        }} />
      )}
    </div>
  );
};

export default OnlineUsers;
