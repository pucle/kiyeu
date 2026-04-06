'use client';

import React from 'react';
import FlowerSVG, { FLOWER_TYPES, getFlowerName } from '../FlowerSVG';

const FLOWER_COLORS: { name: string; hex: string }[] = [
  { name: 'Hồng phấn', hex: '#f4c2c2' },
  { name: 'Đào nhạt', hex: '#ffcba4' },
  { name: 'Vàng bơ', hex: '#f9e4a0' },
  { name: 'Xanh bạc hà', hex: '#b5ead7' },
  { name: 'Xanh trời', hex: '#c7e8f3' },
  { name: 'Tím lavender', hex: '#d8b4f8' },
  { name: 'Trắng sữa', hex: '#fdf6e3' },
  { name: 'Cam mơ', hex: '#ffd5a8' },
  { name: 'Xanh lá pastel', hex: '#c8e6c0' },
  { name: 'Hồng san hô', hex: '#f4a5a0' },
  { name: 'Vàng chanh', hex: '#f0f4a0' },
  { name: 'Xanh teal', hex: '#a8d8d0' },
  { name: 'Tím hoa cà', hex: '#c9a8d8' },
  { name: 'Đỏ gạch pastel', hex: '#e8b0a0' },
  { name: 'Xanh cobalt nhạt', hex: '#aac4e8' },
  { name: 'Nâu latte', hex: '#d4b896' },
  { name: 'Hồng cánh sen', hex: '#f2c4d0' },
  { name: 'Xanh ngọc', hex: '#a8e0d8' },
  { name: 'Xanh navy', hex: '#000080' },
];

export { FLOWER_COLORS };

interface Spread2Props {
  nickname: string;
  setNickname: (v: string) => void;
  displayName: boolean;
  setDisplayName: (v: boolean) => void;
  selectedFlower: string;
  setSelectedFlower: (v: string) => void;
  selectedColor: string;
  setSelectedColor: (v: string) => void;
  onNext: () => void;
}

export default function Spread2({
  nickname, setNickname,
  displayName, setDisplayName,
  selectedFlower, setSelectedFlower,
  selectedColor, setSelectedColor,
  onNext,
}: Spread2Props) {
  const canProceed = nickname.trim() && selectedFlower && selectedColor;

  return (
    <div className="spread">
      {/* Page 3 — Name + Flower Type Picker */}
      <div className="page page-left page-paper">
        <div className="page-inner">
          <h2 className="page-heading">Bạn tên gì nhể</h2>

          {/* Name input */}
          <div className="name-section">
            <input
              type="text"
              className="name-input"
              placeholder="Tên hoặc biệt danh của bạn..."
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              maxLength={30}
              id="input-nickname"
            />
            <label className="display-toggle" id="label-display-name">
              <input
                type="checkbox"
                checked={displayName}
                onChange={(e) => setDisplayName(e.target.checked)}
                className="vintage-checkbox"
              />
              <span className="toggle-label">Hiện tên với mọi người?</span>
            </label>
          </div>

          <div className="section-divider" />

          {/* Flower type grid */}
          <div className="flower-grid">
            {FLOWER_TYPES.map((type) => (
              <button
                key={type}
                className={`flower-card ${selectedFlower === type ? 'flower-card-selected' : ''}`}
                onClick={() => setSelectedFlower(type)}
                id={`flower-${type}`}
                title={getFlowerName(type)}
              >
                <FlowerSVG
                  type={type}
                  color={selectedColor || '#f4c2c2'}
                  size={80}
                />
                <span className="flower-card-name">{getFlowerName(type)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Page 4 — Flower Color Picker */}
      <div className="page page-right page-paper">
        <div className="page-inner">
          <h2 className="page-heading">Chọn màu</h2>
          
          <p className="instruction-text">
            * Chọn hoa, bỏ hoa vào giỏ để lựa giờ nghe
          </p>

          <div className="color-grid">
            {FLOWER_COLORS.map((c) => (
              <button
                key={c.hex}
                className={`color-swatch ${selectedColor === c.hex ? 'color-swatch-selected' : ''}`}
                onClick={() => setSelectedColor(c.hex)}
                title={c.name}
                id={`color-${c.hex.replace('#', '')}`}
              >
                <span
                  className="swatch-circle"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="swatch-name">{c.name}</span>
              </button>
            ))}
          </div>

            {selectedFlower && selectedColor && (
              <div className="flower-preview">
                <span className="preview-label">Hoa của bạn:</span>
                <FlowerSVG type={selectedFlower} color={selectedColor} size={120} />
              </div>
            )}

            <button
              className={`cta-btn cta-btn-outside ${canProceed ? '' : 'cta-btn-disabled'}`}
              onClick={canProceed ? onNext : undefined}
              disabled={!canProceed}
              id="btn-go-spread3"
            >
              Chọn xong, đặt giờ!! →
            </button>
          </div>
        </div>
      </div>
    );
}
