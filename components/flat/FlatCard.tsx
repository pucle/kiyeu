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



export default function FlatCard() {
  const [greeting, setGreeting] = useState('');
  const targetDate = new Date('2026-05-09T11:00:00+07:00');
  const cardRef = useRef<HTMLDivElement>(null);

  const flowerType = 'daisy'; 
  const flowerColor = '#f4c2c2';

  useEffect(() => {
    setGreeting(getGreeting());
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
    <div className="flat-container" style={{ padding: '40px 20px', minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
      <button 
        onClick={handleExport}
        className="cta-btn" 
        style={{ marginBottom: '20px', padding: '12px 24px', fontSize: '16px' }}
      >
        Xuất file JPG
      </button>

      <div 
        className="flat-card" 
        ref={cardRef}
        style={{
          width: '960px',
          minHeight: '600px',
          background: 'linear-gradient(135deg, #5b9bd5 0%, #87CEEB 30%, #b8dff0 70%, #e8f4f8 100%)',
          borderRadius: '16px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch'
        }}
      >
        {/* Left Side: Visuals & Title */}
        <div style={{ flex: '0 0 45%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', borderRight: '1px solid rgba(255,255,255,0.3)' }}>
          {/* Clouds */}
          <svg style={{ position: 'absolute', top: '40px', width: '100%', height: '100px' }} viewBox="0 0 300 80" aria-hidden="true">
            <ellipse cx="50" cy="50" rx="40" ry="20" fill="white" opacity="0.85" />
            <ellipse cx="80" cy="45" rx="35" ry="18" fill="white" opacity="0.75" />
            <ellipse cx="65" cy="55" rx="30" ry="15" fill="white" opacity="0.65" />
            <ellipse cx="200" cy="40" rx="45" ry="22" fill="white" opacity="0.8" />
            <ellipse cx="235" cy="35" rx="30" ry="16" fill="white" opacity="0.7" />
            <ellipse cx="215" cy="48" rx="35" ry="15" fill="white" opacity="0.55" />
          </svg>

          {/* Hot air balloon */}
          <svg style={{ width: '100px', height: '150px', zIndex: 2, marginBottom: '30px' }} viewBox="0 0 100 150" aria-hidden="true">
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
            <h1 className="cover-line1" style={{ fontSize: '3rem', marginBottom: '5px' }}>fen li</h1>
            <h1 className="cover-line2" style={{ fontSize: '4.5rem', marginBottom: '15px' }}>rì mai đờ</h1>
            <p className="cover-subtitle" style={{ fontSize: '1.2rem' }}>Bạn có hẹn với Púc! · 2026</p>
          </div>
        </div>

        {/* Right Side: Content */}
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 60px', zIndex: 2 }}>
          <p className="letter-greeting" style={{ fontSize: '1.8rem', marginBottom: '20px', color: '#1a2b3c' }}>{greeting}</p>
          
          <div className="letter-body" style={{ fontSize: '1.25rem', lineHeight: '1.6', color: '#1a2b3c' }}>
            <p style={{ marginBottom: '15px' }}>
              Bạn có hẹn với Púc vào ngày 9/5/2026 :D
            </p>
            <p style={{ marginBottom: '25px', fontStyle: 'italic' }}>
              Update: Vì một số lí do riêng nên lịch chụp với bạn bè của Púc chuyển thành 11h-1h30. 
            </p>

            <div className="letter-details" style={{ background: 'rgba(255,255,255,0.45)', padding: '20px', borderRadius: '12px', marginBottom: '20px', display: 'flex', flexDirection: 'row', gap: '30px' }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '5px' }}>Địa điểm:</p>
                <p>THPT Chuyên Lê Quý Đôn</p>
                <p className="letter-detail-sub" style={{ paddingLeft: '0', fontSize: '0.95rem' }}>(số 1 Vũ Văn Dũng, Đà Nẵng)</p>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '5px' }}>Thời gian:</p>
                <p>Ngày 9/5/2026 · Thứ Bảy</p>
                <p style={{ fontWeight: 'bold', color: '#d95f4b', fontSize: '1.1rem' }}>Từ 11g00 đến 13g30</p>
              </div>
            </div>

            <p style={{ marginBottom: '25px' }}>
              Không cần mang quà, không cần mặc đẹp<br />
              (thật ra mặc đẹp thì càng vui hehe),<br />
              chỉ cần mang theo mặt mình là đủ rui
            </p>

            <p className="letter-sign" style={{ fontSize: '1.3rem' }}>
              Trân trọng & yêu thương,<br />
              <strong style={{ fontSize: '1.5rem', fontFamily: "'Playfair Display', serif" }}>Đình Púc</strong>
            </p>
          </div>

          <div style={{ alignSelf: 'center', height: '40px', width: '200px', marginTop: 'auto' }}>
            <svg viewBox="0 0 200 50" width="100%" height="100%" aria-hidden="true">
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
  );
}
