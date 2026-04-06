'use client';

import React from 'react';

interface BasketSVGProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function BasketSVG({ width = 130, height = 95, className }: BasketSVGProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 130 95" className={className} style={{ display: 'block' }}>
      {/* Handle */}
      <path
        d="M30,38 Q65,5 100,38"
        fill="none"
        stroke="#9b7b55"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M30,38 Q65,10 100,38"
        fill="none"
        stroke="#c9a87c"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      
      {/* Basket body - trapezoid shape */}
      <path
        d="M12,40 L24,88 L106,88 L118,40 Z"
        fill="#9b7b55"
        stroke="#7a5e3a"
        strokeWidth="1.2"
      />
      
      {/* Weave pattern - horizontal */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const y = 44 + i * 6.5;
        const xLeft = 12 + (y - 40) * (12 / 48);
        const xRight = 118 - (y - 40) * (12 / 48);
        return (
          <line key={`h${i}`} x1={xLeft} y1={y} x2={xRight} y2={y}
            stroke={i % 2 === 0 ? '#c9a87c' : '#7a5e3a'} strokeWidth="1" opacity="0.6" />
        );
      })}
      
      {/* Weave pattern - vertical */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
        const xTop = 22 + i * 9.5;
        const xBot = 27 + i * 8;
        return (
          <line key={`v${i}`} x1={xTop} y1={40} x2={xBot} y2={88}
            stroke={i % 2 === 0 ? '#c9a87c' : '#b08a5a'} strokeWidth="1" opacity="0.5" />
        );
      })}
      
      {/* Rim */}
      <path
        d="M10,38 L120,38 L120,42 L10,42 Z"
        fill="#b08a5a"
        stroke="#7a5e3a"
        strokeWidth="0.6"
      />
      
      {/* Rim highlight */}
      <path
        d="M12,39 L118,39"
        fill="none"
        stroke="#d4b896"
        strokeWidth="0.8"
        opacity="0.5"
      />
    </svg>
  );
}
