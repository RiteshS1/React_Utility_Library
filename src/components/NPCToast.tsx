import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Brand tokens
const BRAND = {
  bg: '#FFFFFF',
  text: '#19357F',
  border: '1px solid #e2e8f0',
  shadow: '0 4px 6px -1px rgba(15, 23, 42, 0.1), 0 2px 4px -2px rgba(15, 23, 42, 0.1)',
};

interface NPCToastProps {
  message: string;
  onDismiss: () => void;
  duration?: number;
}

/** Crisp, branded toast. Always dismisses the previous instance before mounting. */
export const NPCToast: React.FC<NPCToastProps> = ({ message, onDismiss, duration = 5000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(false);
      window.setTimeout(onDismiss, 250); // allow exit animation to finish
    }, duration);
    return () => window.clearTimeout(timer);
  }, [duration, onDismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            zIndex: 9999,
            minWidth: '260px',
            maxWidth: '420px',
            background: BRAND.bg,
            color: BRAND.text,
            border: BRAND.border,
            borderRadius: '0.75rem',
            boxShadow: BRAND.shadow,
            padding: '0.85rem 1rem 0.85rem 1.1rem',
            fontWeight: 500,
            fontSize: '0.9rem',
            lineHeight: 1.4,
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.6rem',
          }}
          role="status"
          aria-live="polite"
        >
          <span style={{ flex: 1 }}>{message}</span>
          <button
            type="button"
            onClick={() => setVisible(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: 0,
              lineHeight: 1,
              flexShrink: 0,
            }}
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NPCToast;