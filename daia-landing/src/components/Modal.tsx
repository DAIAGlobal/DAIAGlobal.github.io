import React from 'react';
import { motion } from 'framer-motion';

export default function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title?: string; children?: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <motion.div
        initial={{ y: 30, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.18 }}
        className="relative bg-white rounded-2xl p-6 max-w-md w-full shadow-lg"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            {title && <h3 className="font-bold text-lg">{title}</h3>}
            <div className="mt-2 text-sm text-neutral-700">{children}</div>
          </div>
          <button onClick={onClose} className="px-2 py-1 rounded-lg border">Cerrar</button>
        </div>
      </motion.div>
    </div>
  );
}
