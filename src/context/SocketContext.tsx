import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: number;
  connected: boolean;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      if (import.meta.env.DEV) {
        console.log('Connected to Socket.IO server');
      }
      setConnected(true);
    });

    newSocket.on('disconnect', () => {
      if (import.meta.env.DEV) {
        console.log('Disconnected from Socket.IO server');
      }
      setConnected(false);
    });

    newSocket.on('userCount', (count: number) => {
      if (import.meta.env.DEV) {
        console.log('Online users:', count);
      }
      setOnlineUsers(count);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const value = {
    socket,
    onlineUsers,
    connected,
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
