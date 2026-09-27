import { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';

export interface NPCMessage {
  id: number;
  message: string;
}

/**
 * useNPCCompanion
 *
 * Subscribes to the `server_toast` Socket.IO event and exposes the latest
 * NPC messages. Toasts now STACK — each new message is appended below the
 * previous ones instead of dismissing them, so nothing gets lost when a
 * second message arrives before the first auto-dismisses.
 */
export function useNPCCompanion() {
  const { socket, connected } = useSocket();
  const [messages, setMessages] = useState<NPCMessage[]>([]);

  useEffect(() => {
    if (!socket) return;

    const onToast = (message: string) => {
      setMessages((prev) => [...prev, { id: Date.now() + Math.random(), message }]);
    };

    socket.on('server_toast', onToast);

    return () => {
      socket.off('server_toast', onToast);
    };
  }, [socket]);

  const dismiss = (id: number) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const dismissAll = () => {
    setMessages([]);
  };

  return { connected, messages, dismiss, dismissAll };
}

export default useNPCCompanion;