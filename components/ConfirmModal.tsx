'use client';

import React, { useState } from 'react';

interface ConfirmModalProps {
  flowerType: string;
  flowerColor: string;
  timeSlot: string;
  onConfirm: (message: string) => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function ConfirmModal({ flowerType, flowerColor, timeSlot, onConfirm, onCancel, loading }: ConfirmModalProps) {
  const [message, setMessage] = useState('');
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <p className="modal-text">
          Bỏ <strong>{flowerType}</strong> màu <span style={{
            display: 'inline-block',
            width: 24,
            height: 24,
            backgroundColor: flowerColor,
            borderRadius: '50%',
            border: '1px solid var(--ink-light)',
            verticalAlign: 'middle',
            marginInline: 8,
          }} /> vào lúc <strong>{timeSlot}</strong>?
        </p>
        <div className="modal-message">
          <p className="modal-message-label">Bạn có lời nhắn nhủ gì không?</p>
          <textarea
            className="modal-message-input"
            placeholder="Lời nhắn cho Púc..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={200}
            rows={3}
          />
          <p className="modal-privacy-note">
            * Lời nhắn sẽ được bảo mật, chỉ mình Púc thấy
          </p>
        </div>
        
        <p className="modal-subtext">Xác nhận luôn nghen 🌸</p>
        <div className="modal-actions">
          <button
            className="btn-confirm"
            onClick={() => onConfirm(message)}
            disabled={loading}
            id="btn-confirm-rsvp"
          >
            {loading ? 'Đang gửi...' : 'Xác nhận'}
          </button>
          <button
            className="btn-cancel"
            onClick={onCancel}
            disabled={loading}
            id="btn-cancel-rsvp"
          >
            Đổi ý
          </button>
        </div>
      </div>
    </div>
  );
}
