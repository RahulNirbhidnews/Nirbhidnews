import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDestructive = true,
  isLoading = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {isDestructive && <AlertTriangle size={20} color="#dc2626" />}
            <h3 id="confirm-modal-title" style={{ fontSize: '1.125rem', fontWeight: 700, margin: 0 }}>
              {title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onCancel}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <p style={{ color: '#475569', fontSize: '0.9375rem', lineHeight: 1.5, margin: 0 }}>
            {message}
          </p>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={`btn ${isDestructive ? 'btn-primary' : 'btn-secondary'}`}
            onClick={onConfirm}
            disabled={isLoading}
            style={{ minWidth: '90px' }}
          >
            {isLoading ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
