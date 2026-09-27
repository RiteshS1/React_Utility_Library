import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Brand tokens
const BRAND = {
  bg: '#FFFFFF',
  text: '#19357F',
  border: '1px solid #e2e8f0',
  shadow: '0 4px 6px -1px rgba(15, 23, 42, 0.1), 0 2px 4px -2px rgba(15, 23, 42, 0.1)',
};

export interface NPCToastItem {
  id: number;
  message: string;
}

interface NPCToastItemProps {
  toast: NPCToastItem;
  onDismiss: (id: number) => void;
  duration: number;
}

/** Single branded toast. Auto-dismisses after `duration` unless manually closed. */
const NPCToastItem: React.FC<NPCToastItemProps> = ({ toast, onDismiss, duration }) => {
  useEffect(() => {
    const timer = window.setTimeout(() => onDismiss(toast.id), duration);
    return () => window.clearTimeout(timer);
  }, [toast.id, duration, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
      style={{
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
        cursor: 'default',
        minWidth: '260px',
        maxWidth: '420px',
      }}
      role="status"
      aria-live="polite"
    >
      <span style={{ flex: 1 }}>{toast.message}</span>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
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
  );
};

interface NPCToastStackProps {
  toasts: NPCToastItem[];
  onDismiss: (id: number) => void;
  duration?: number;
}

/** Stacks toasts vertically. Each toast dismisses independently. */
export const NPCToastStack: React.FC<NPCToastStackProps> = ({
  toasts,
  onDismiss,
  duration = 5000,
}) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.75rem',
        maxWidth: '420px',
      }}
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <NPCToastItem
            key={toast.id}
            toast={toast}
            onDismiss={onDismiss}
            duration={duration}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NPCToastStack;