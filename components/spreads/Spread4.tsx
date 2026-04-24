'use client';

import React, { useState, useEffect } from 'react';
import FlowerSVG from '../FlowerSVG';

interface Spread4Props {
  onBack: () => void;
}

function getCountdown(target: Date): { days: number; hours: number; minutes: number; seconds: number } {
  const now = new Date();
  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function Spread4({ onBack }: Spread4Props) {
  const targetDate = new Date('2026-04-25T09:00:00+07:00');
  const [countdown, setCountdown] = useState(getCountdown(targetDate));

  // Default visuals for the static invitation
  const flowerType = 'daisy'; 
  const flowerColor = '#f4c2c2';

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="spread">
      <div className="page page-left page-paper">
        <div className="page-inner thank-you-page">
          {/* Bouquet illustration */}
          <div className="bouquet">
            <div className="bouquet-flowers">
              {[...Array(7)].map((_, i) => {
                const angle = -45 + i * 15;
                const xOff = (i - 3) * 18;
                const yOff = Math.abs(i - 3) * 8;
                return (
                  <div
                    key={i}
                    className="bouquet-flower"
                    style={{
                      transform: `translate(${xOff}px, ${-yOff}px) rotate(${angle}deg)`,
                    }}
                  >
                    <FlowerSVG type={flowerType} color={flowerColor} size={70} />
                  </div>
                );
              })}
            </div>
            {/* Wrapping paper */}
            <svg width="120" height="60" viewBox="0 0 120 60" className="bouquet-wrap">
              <path d="M20,0 L0,60 L120,60 L100,0 Z" fill="var(--accent-tan)" opacity="0.7" />
              <path d="M20,0 L0,60 L120,60 L100,0 Z" fill="none" stroke="var(--ink-light)" strokeWidth="0.8" />
              <path d="M60,55 Q55,30 45,5" stroke="var(--accent-red)" strokeWidth="1.5" fill="none" opacity="0.5" />
            </svg>
          </div>

          <h2 className="thank-you-heading">
            Hẹn gặp bạn tại Kỉ yếu nhé!
          </h2>
          <p className="thank-you-text">
            Thời gian: <strong>9:00 - 11:10</strong>
          </p>

          {/* Countdown */}
          <div className="countdown">
            <p className="countdown-label">Đếm ngược đến ngày trọng đại:</p>
            <div className="countdown-digits">
              <div className="countdown-unit">
                <span className="countdown-num">{String(countdown.days).padStart(2, '0')}</span>
                <span className="countdown-text">ngày</span>
              </div>
              <span className="countdown-sep">:</span>
              <div className="countdown-unit">
                <span className="countdown-num">{String(countdown.hours).padStart(2, '0')}</span>
                <span className="countdown-text">giờ</span>
              </div>
              <span className="countdown-sep">:</span>
              <div className="countdown-unit">
                <span className="countdown-num">{String(countdown.minutes).padStart(2, '0')}</span>
                <span className="countdown-text">phút</span>
              </div>
              <span className="countdown-sep">:</span>
              <div className="countdown-unit">
                <span className="countdown-num">{String(countdown.seconds).padStart(2, '0')}</span>
                <span className="countdown-text">giây</span>
              </div>
            </div>
          </div>

          <button className="cta-btn" onClick={onBack} id="btn-view-letter">
            ← Quay lại đọc thư
          </button>
        </div>
      </div>
      <div className="page page-right page-paper">
        <div className="page-inner thank-you-right">
          <div className="thank-you-deco">
            <svg viewBox="0 0 200 200" width="180" height="180" aria-hidden="true">
              {/* Decorative wreath */}
              {[...Array(12)].map((_, i) => {
                const angle = (i * 30) * Math.PI / 180;
                const x = 100 + Math.cos(angle) * 70;
                const y = 100 + Math.sin(angle) * 70;
                const leafAngle = i * 30 + 90;
                return (
                  <g key={i}>
                    <ellipse cx={x} cy={y} rx="12" ry="6"
                      fill={i % 3 === 0 ? 'var(--leaf-dark)' : i % 3 === 1 ? 'var(--leaf-mid)' : 'var(--leaf-light)'}
                      transform={`rotate(${leafAngle}, ${x}, ${y})`}
                      opacity="0.8" />
                  </g>
                );
              })}
              {/* Small flowers in wreath */}
              {[0, 90, 180, 270].map((deg, i) => {
                const angle = (deg) * Math.PI / 180;
                const x = 100 + Math.cos(angle) * 70;
                const y = 100 + Math.sin(angle) * 70;
                return (
                  <circle key={i} cx={x} cy={y} r="5" fill={flowerColor} opacity="0.9" />
                );
              })}
              <text x="100" y="95" textAnchor="middle" fill="var(--ink)" fontFamily="'Playfair Display', serif" fontSize="14" fontWeight="700">
                25/4
              </text>
              <text x="100" y="115" textAnchor="middle" fill="var(--ink-light)" fontFamily="'Crimson Pro', serif" fontSize="11">
                2026
              </text>
            </svg>
          </div>
          <p className="thank-you-footer">
            Địa điểm:<br />
            <strong>THPT Chuyên Lê Quý Đôn</strong><br />
            Đà Nẵng
          </p>
        </div>
      </div>
    </div>
  );
}
