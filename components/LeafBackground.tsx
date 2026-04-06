'use client';

import React from 'react';

/* Small decorative flower SVG inline */
function BgFlower({ cx, cy, color, size = 14 }: { cx: number; cy: number; color: string; size?: number }) {
  const r = size / 2;
  const pr = r * 0.65;
  return (
    <g>
      {[0, 72, 144, 216, 288].map((deg, i) => {
        const angle = (deg - 90) * Math.PI / 180;
        const px = cx + Math.cos(angle) * pr;
        const py = cy + Math.sin(angle) * pr;
        return (
          <ellipse key={i} cx={px} cy={py} rx={r * 0.45} ry={r * 0.7}
            fill={color} opacity="0.85"
            transform={`rotate(${deg - 90}, ${px}, ${py})`} />
        );
      })}
      <circle cx={cx} cy={cy} r={r * 0.25} fill="#f5e06a" />
    </g>
  );
}

export default function LeafBackground() {
  return (
    <div className="leaf-background" aria-hidden="true">
      {/* ===== LEAVES ===== */}

      {/* Monstera - top left */}
      <svg className="leaf leaf-1" viewBox="0 0 200 200" width="300" height="300">
        <path d="M100,180 Q60,140 30,100 Q10,70 20,40 Q30,10 60,5 Q80,2 100,20 Q95,50 80,70 Q100,60 110,40 Q120,20 140,10 Q160,5 175,20 Q190,40 180,70 Q170,100 140,140 Z"
          fill="var(--leaf-dark)" opacity="0.92" />
        <path d="M100,180 L100,20" stroke="var(--leaf-vein)" strokeWidth="2" fill="none" />
        <path d="M100,60 L70,40" stroke="var(--leaf-vein)" strokeWidth="1" fill="none" />
        <path d="M100,90 L60,70" stroke="var(--leaf-vein)" strokeWidth="1" fill="none" />
        <path d="M100,120 L65,100" stroke="var(--leaf-vein)" strokeWidth="1" fill="none" />
        <path d="M100,60 L130,35" stroke="var(--leaf-vein)" strokeWidth="1" fill="none" />
        <path d="M100,90 L140,65" stroke="var(--leaf-vein)" strokeWidth="1" fill="none" />
        <path d="M100,120 L135,100" stroke="var(--leaf-vein)" strokeWidth="1" fill="none" />
      </svg>

      {/* Banana leaf - top right */}
      <svg className="leaf leaf-2" viewBox="0 0 180 300" width="220" height="370">
        <path d="M90,290 Q85,200 80,150 Q70,100 50,60 Q35,30 50,10 Q70,0 90,10 Q110,0 130,10 Q145,30 130,60 Q110,100 100,150 Q95,200 95,290 Z"
          fill="var(--leaf-mid)" opacity="0.88" />
        <path d="M90,290 Q88,150 70,30" stroke="var(--leaf-dark)" strokeWidth="2" fill="none" />
        {[50, 80, 110, 140, 170, 200, 230].map((y, i) => (
          <g key={i}>
            <path d={`M${88 - (290 - y) * 0.02},${y} L${60 - (290 - y) * 0.05},${y - 15}`} stroke="var(--leaf-dark)" strokeWidth="0.8" fill="none" />
            <path d={`M${92 + (290 - y) * 0.02},${y} L${120 + (290 - y) * 0.05},${y - 15}`} stroke="var(--leaf-dark)" strokeWidth="0.8" fill="none" />
          </g>
        ))}
      </svg>

      {/* Ficus leaf - bottom left */}
      <svg className="leaf leaf-3" viewBox="0 0 160 220" width="200" height="270">
        <path d="M80,210 L80,100 Q30,80 15,50 Q5,25 25,10 Q50,0 80,10 Q110,0 135,10 Q155,25 145,50 Q130,80 80,100 Z"
          fill="var(--leaf-light)" opacity="0.82" />
        <path d="M80,210 L80,10" stroke="var(--leaf-vein)" strokeWidth="2" fill="none" />
        <path d="M80,40 L45,25" stroke="var(--leaf-vein)" strokeWidth="1" fill="none" />
        <path d="M80,60 L35,45" stroke="var(--leaf-vein)" strokeWidth="1" fill="none" />
        <path d="M80,80 L40,65" stroke="var(--leaf-vein)" strokeWidth="1" fill="none" />
        <path d="M80,40 L115,25" stroke="var(--leaf-vein)" strokeWidth="1" fill="none" />
        <path d="M80,60 L125,45" stroke="var(--leaf-vein)" strokeWidth="1" fill="none" />
        <path d="M80,80 L120,65" stroke="var(--leaf-vein)" strokeWidth="1" fill="none" />
      </svg>

      {/* Monstera - bottom right */}
      <svg className="leaf leaf-4" viewBox="0 0 200 200" width="270" height="270">
        <path d="M100,190 Q70,150 40,110 Q20,80 25,50 Q35,20 65,10 Q85,5 100,25 Q100,55 85,75 Q105,65 115,45 Q125,25 145,15 Q165,10 180,30 Q190,55 175,85 Q160,115 130,150 Z"
          fill="var(--leaf-dark)" opacity="0.78" />
        <path d="M100,190 L100,25" stroke="var(--leaf-light)" strokeWidth="1.5" fill="none" />
      </svg>

      {/* Long narrow leaf - mid left */}
      <svg className="leaf leaf-5" viewBox="0 0 140 200" width="170" height="240">
        <path d="M70,190 Q65,130 55,90 Q40,50 50,25 Q60,5 80,5 Q100,5 110,25 Q120,50 100,90 Q85,130 75,190 Z"
          fill="var(--leaf-mid)" opacity="0.75" />
        <path d="M70,190 L75,5" stroke="var(--leaf-dark)" strokeWidth="1.5" fill="none" />
      </svg>

      {/* Fern leaf - mid right */}
      <svg className="leaf leaf-6" viewBox="0 0 200 200" width="240" height="240">
        <path d="M100,180 Q50,140 25,90 Q10,50 35,20 Q65,0 100,15 Q135,0 165,20 Q190,50 175,90 Q150,140 100,180 Z"
          fill="var(--leaf-light)" opacity="0.68" />
        <path d="M100,180 L100,15" stroke="var(--leaf-dark)" strokeWidth="1.5" fill="none" />
      </svg>

      {/* Extra tropical leaf - top center-left */}
      <svg className="leaf leaf-7" viewBox="0 0 160 200" width="140" height="180">
        <path d="M80,190 Q40,140 20,90 Q10,50 30,20 Q55,0 80,15 Q105,0 130,20 Q150,50 140,90 Q120,140 80,190 Z"
          fill="var(--leaf-mid)" opacity="0.6" />
        <path d="M80,190 L80,15" stroke="var(--leaf-dark)" strokeWidth="1.2" fill="none" />
        {[40, 60, 80, 100, 120, 140].map((y, i) => (
          <g key={i}>
            <path d={`M80,${y} L${50 - i * 3},${y - 12}`} stroke="var(--leaf-dark)" strokeWidth="0.6" fill="none" />
            <path d={`M80,${y} L${110 + i * 3},${y - 12}`} stroke="var(--leaf-dark)" strokeWidth="0.6" fill="none" />
          </g>
        ))}
      </svg>

      {/* Roundish leaf - bottom center-right */}
      <svg className="leaf leaf-8" viewBox="0 0 180 180" width="160" height="160">
        <path d="M90,170 Q30,130 15,70 Q10,30 50,10 Q90,0 130,10 Q170,30 165,70 Q150,130 90,170 Z"
          fill="var(--leaf-dark)" opacity="0.55" />
        <path d="M90,170 L90,10" stroke="var(--leaf-vein)" strokeWidth="1.5" fill="none" />
      </svg>

      {/* ===== DECORATIVE FLOWERS scattered around ===== */}
      <svg className="bg-flowers bg-flowers-1" viewBox="0 0 120 120" width="120" height="120">
        <BgFlower cx={30} cy={30} color="#f4c2c2" size={18} />
        <BgFlower cx={80} cy={50} color="#ffd5a8" size={14} />
        <BgFlower cx={50} cy={95} color="#d8b4f8" size={16} />
      </svg>

      <svg className="bg-flowers bg-flowers-2" viewBox="0 0 100 100" width="100" height="100">
        <BgFlower cx={25} cy={40} color="#f9e4a0" size={15} />
        <BgFlower cx={70} cy={25} color="#f4a5a0" size={17} />
        <BgFlower cx={55} cy={75} color="#c7e8f3" size={13} />
      </svg>

      <svg className="bg-flowers bg-flowers-3" viewBox="0 0 140 100" width="140" height="100">
        <BgFlower cx={30} cy={35} color="#fdf6e3" size={16} />
        <BgFlower cx={90} cy={55} color="#f2c4d0" size={18} />
        <BgFlower cx={120} cy={25} color="#b5ead7" size={14} />
      </svg>

      <svg className="bg-flowers bg-flowers-4" viewBox="0 0 90 90" width="90" height="90">
        <BgFlower cx={25} cy={30} color="#d8b4f8" size={15} />
        <BgFlower cx={65} cy={60} color="#ffcba4" size={17} />
      </svg>

      {/* ===== FALLING PETALS ===== */}
      <div className="falling-petals">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="petal"
            style={{
              left: `${8 + (i * 7.5) % 90}%`,
              animationDelay: `${i * 1.8}s`,
              animationDuration: `${8 + (i % 4) * 2}s`,
            }}
          >
            <svg viewBox="0 0 16 16" width="16" height="16">
              <ellipse cx="8" cy="8" rx="5" ry="8"
                fill={['#f4c2c2', '#ffd5a8', '#d8b4f8', '#f9e4a0', '#fdf6e3', '#f2c4d0'][i % 6]}
                opacity="0.7" />
            </svg>
          </div>
        ))}
      </div>

      {/* ===== FIREFLIES / SPARKLES ===== */}
      <div className="fireflies">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="firefly"
            style={{
              left: `${10 + (i * 12) % 85}%`,
              top: `${15 + (i * 11) % 70}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${3 + (i % 3)}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
