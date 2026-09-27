import { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';

interface NPCMessage {
  message: string;
  id: number;
}

/**
 * useNPCCompanion
 *
 * Subscribes to the `server_toast` Socket.IO event and exposes the latest
 * NPC message. The consumer is responsible for dismissing any previous
 * toast before rendering the new one — toasts must never stack.
 */
export function useNPCCompanion() {
  const { socket, connected } = useSocket();
  const [current, setCurrent] = useState<NPCMessage | null>(null);

  useEffect(() => {
    if (!socket) return;

    const onToast = (message: string) => {
      // Always dismiss the previous toast before mounting a new instance.
      setCurrent(null);
      // Small timeout lets the unmount animation finish before the new toast mounts.
      window.setTimeout(() => {
        setCurrent({ message, id: Date.now() + Math.random() });
      }, 50);
    };

    socket.on('server_toast', onToast);

    return () => {
      socket.off('server_toast', onToast);
    };
  }, [socket]);

  return { connected, current };
}

export default useNPCCompanion;