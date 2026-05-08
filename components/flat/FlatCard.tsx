'use client';

import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import FlowerSVG from '../FlowerSVG';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11.5) return 'Chào đằng ấy buổi sáng! ☀️';
  if (hour >= 11.5 && hour < 13.5) return 'Chào đằng ấy buổi trưa! 🍜';
  if (hour >= 13.5 && hour < 18) return 'Chào đằng ấy buổi chiều! 🌤️';
  if (hour >= 18 && hour < 22) return 'Chào đằng ấy buổi tối! 🌙';
  return 'Ủa sao còn thức vậy? 🦉';
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

export default function FlatCard() {
  const [greeting, setGreeting] = useState('');
  const targetDate = new Date('2026-05-09T11:00:00+07:00');
  const [countdown, setCountdown] = useState(getCountdown(targetDate));
  const cardRef = useRef<HTMLDivElement>(null);

  const flowerType = 'daisy'; 
  const flowerColor = '#f4c2c2';

  useEffect(() => {
    setGreeting(getGreeting());
    const timer = setInterval(() => {
      setCountdown(getCountdown(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleExport = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      const link = document.createElement('a');
      link.download = `thiep-moi-puc.jpg`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export image', err);
    }
  };

  return (
    <div className="flat-container" style={{ padding: '20px', minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <button 
        onClick={handleExport}
        className="cta-btn" 
        style={{ marginBottom: '20px', padding: '10px 20px', fontSize: '16px' }}
      >
        Xuất file JPG
      </button>

      <div 
        className="flat-card" 
        ref={cardRef}
        style={{
          width: '100%',
          maxWidth: '500px',
          background: 'linear-gradient(180deg, #5b9bd5 0%, #87CEEB 20%, #b8dff0 60%, #e8f4f8 100%)',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingBottom: '40px'
        }}
      >
        {/* Top Cover Section */}
        <div style={{ position: 'relative', width: '100%', height: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '40px' }}>
          {/* Clouds */}
          <svg style={{ position: 'absolute', top: '20px', width: '100%', height: '100px' }} viewBox="0 0 300 80" aria-hidden="true">
            <ellipse cx="50" cy="50" rx="40" ry="20" fill="white" opacity="0.85" />
            <ellipse cx="80" cy="45" rx="35" ry="18" fill="white" opacity="0.75" />
            <ellipse cx="65" cy="55" rx="30" ry="15" fill="white" opacity="0.65" />
            <ellipse cx="200" cy="40" rx="45" ry="22" fill="white" opacity="0.8" />
            <ellipse cx="235" cy="35" rx="30" ry="16" fill="white" opacity="0.7" />
            <ellipse cx="215" cy="48" rx="35" ry="15" fill="white" opacity="0.55" />
          </svg>

          {/* Hot air balloon */}
          <svg style={{ width: '80px', height: '120px', zIndex: 2, marginBottom: '20px' }} viewBox="0 0 100 150" aria-hidden="true">
            <path d="M50,10 Q20,10 15,45 Q10,75 50,90 Q90,75 85,45 Q80,10 50,10 Z" fill="#d95f4b" />
            <path d="M50,10 Q50,50 50,90" stroke="white" strokeWidth="1" fill="none" opacity="0.6" />
            <path d="M30,20 Q50,55 70,20" stroke="white" strokeWidth="0.8" fill="none" opacity="0.4" />
            <path d="M20,40 Q50,70 80,40" stroke="white" strokeWidth="0.8" fill="none" opacity="0.4" />
            <path d="M35,12 Q25,40 30,80" stroke="white" strokeWidth="2" fill="none" opacity="0.5" />
            <path d="M65,12 Q75,40 70,80" stroke="white" strokeWidth="2" fill="none" opacity="0.5" />
            <line x1="42" y1="90" x2="38" y2="115" stroke="#8b6914" strokeWidth="1" />
            <line x1="58" y1="90" x2="62" y2="115" stroke="#8b6914" strokeWidth="1" />
            <rect x="35" y="115" width="30" height="18" rx="2" fill="#8b6914" stroke="#6b4e0a" strokeWidth="0.8" />
            <line x1="35" y1="120" x2="65" y2="120" stroke="#b8860b" strokeWidth="0.8" />
            <line x1="35" y1="125" x2="65" y2="125" stroke="#b8860b" strokeWidth="0.8" />
          </svg>

          <div className="cover-title" style={{ textAlign: 'center', zIndex: 2 }}>
            <h1 className="cover-line1">fen li</h1>
            <h1 className="cover-line2">rì mai đờ</h1>
            <p className="cover-subtitle">Bạn có hẹn với Púc! · 2026</p>
          </div>
        </div>

        {/* Letter Body */}
        <div style={{ width: '85%', zIndex: 2, textAlign: 'center', marginTop: '20px' }}>
          <p className="letter-greeting" style={{ marginBottom: '15px' }}>{greeting}</p>
          
          <div className="letter-body" style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
            <p style={{ marginBottom: '10px' }}>
              Bạn có hẹn với Púc vào ngày 9/5/2026 :D
            </p>
            <p style={{ marginBottom: '20px' }}>
              Update: Vì một số lí do riêng nên lịch chụp với bạn bè của Púc chuyển thành 11h-1h30. 
            </p>

            <div className="letter-details" style={{ background: 'rgba(255,255,255,0.3)', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
              <p style={{ fontWeight: 'bold' }}>Địa điểm: THPT Chuyên Lê Quý Đôn</p>
              <p className="letter-detail-sub" style={{ paddingLeft: '0', marginBottom: '10px' }}>(số 1 Vũ Văn Dũng, Đà Nẵng)</p>
              <p style={{ fontWeight: 'bold' }}>Ngày 9/5/2026 · Thứ Bảy</p>
              <p style={{ fontWeight: 'bold', color: '#d95f4b' }}>Từ 11g00 đến 13g30</p>
            </div>

            <p style={{ marginBottom: '20px' }}>
              Không cần mang quà, không cần mặc đẹp<br />
              (thật ra mặc đẹp thì càng vui hehe),<br />
              chỉ cần mang theo mặt mình là đủ rui
            </p>

            <p className="letter-sign" style={{ marginTop: '20px' }}>
              Trân trọng & yêu thương,<br />
              <strong>Đình Púc</strong>
            </p>
          </div>

          {/* Countdown & Decorative Section */}
          <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px dashed rgba(0,0,0,0.1)' }}>
            <div className="countdown" style={{ margin: '0 auto', maxWidth: '300px' }}>
              <p className="countdown-label" style={{ marginBottom: '15px' }}>Đếm ngược đến ngày kỉ yếu:</p>
              <div className="countdown-digits" style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
                <div className="countdown-unit" style={{ background: 'rgba(255,255,255,0.5)', padding: '10px', borderRadius: '8px', minWidth: '55px' }}>
                  <span className="countdown-num" style={{ display: 'block', fontSize: '1.5rem', fontWeight: 'bold' }}>{String(countdown.days).padStart(2, '0')}</span>
                  <span className="countdown-text" style={{ fontSize: '0.8rem' }}>ngày</span>
                </div>
                <span className="countdown-sep" style={{ fontSize: '1.5rem', fontWeight: 'bold', alignSelf: 'center' }}>:</span>
                <div className="countdown-unit" style={{ background: 'rgba(255,255,255,0.5)', padding: '10px', borderRadius: '8px', minWidth: '55px' }}>
                  <span className="countdown-num" style={{ display: 'block', fontSize: '1.5rem', fontWeight: 'bold' }}>{String(countdown.hours).padStart(2, '0')}</span>
                  <span className="countdown-text" style={{ fontSize: '0.8rem' }}>giờ</span>
                </div>
                <span className="countdown-sep" style={{ fontSize: '1.5rem', fontWeight: 'bold', alignSelf: 'center' }}>:</span>
                <div className="countdown-unit" style={{ background: 'rgba(255,255,255,0.5)', padding: '10px', borderRadius: '8px', minWidth: '55px' }}>
                  <span className="countdown-num" style={{ display: 'block', fontSize: '1.5rem', fontWeight: 'bold' }}>{String(countdown.minutes).padStart(2, '0')}</span>
                  <span className="countdown-text" style={{ fontSize: '0.8rem' }}>phút</span>
                </div>
                <span className="countdown-sep" style={{ fontSize: '1.5rem', fontWeight: 'bold', alignSelf: 'center' }}>:</span>
                <div className="countdown-unit" style={{ background: 'rgba(255,255,255,0.5)', padding: '10px', borderRadius: '8px', minWidth: '55px' }}>
                  <span className="countdown-num" style={{ display: 'block', fontSize: '1.5rem', fontWeight: 'bold' }}>{String(countdown.seconds).padStart(2, '0')}</span>
                  <span className="countdown-text" style={{ fontSize: '0.8rem' }}>giây</span>
                </div>
              </div>
            </div>

            <div style={{ position: 'relative', height: '120px', marginTop: '30px' }}>
              <svg viewBox="0 0 200 100" width="100%" height="100%" aria-hidden="true" style={{ position: 'absolute', bottom: '-40px', left: 0 }}>
                <path d="M10,40 Q30,20 50,30 Q70,10 90,25 Q110,5 130,20 Q150,0 170,20 Q190,5 210,25 Q230,10 250,30 Q270,20 290,40"
                  fill="none" stroke="var(--leaf-mid)" strokeWidth="1.5" />
                {[30, 70, 110, 150, 190, 230, 270].map((x, i) => (
                  <g key={i}>
                    <ellipse cx={x} cy={35} rx="8" ry="4" fill={i % 2 === 0 ? 'var(--leaf-light)' : 'var(--leaf-mid)'}
                      transform={`rotate(${i % 2 === 0 ? -20 : 20}, ${x}, 35)`} />
                    <ellipse cx={x + 10} cy={38} rx="7" ry="3.5" fill={i % 2 === 0 ? 'var(--leaf-mid)' : 'var(--leaf-light)'}
                      transform={`rotate(${i % 2 === 0 ? 15 : -15}, ${x + 10}, 38)`} />
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
