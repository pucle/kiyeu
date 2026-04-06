'use client';

import React from 'react';

interface FlowerSVGProps {
  type: string;
  color: string;
  size?: number;
  className?: string;
}

function darkenColor(hex: string, amount: number = 0.3): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, ((num >> 16) & 0xff) - Math.floor(255 * amount));
  const g = Math.max(0, ((num >> 8) & 0xff) - Math.floor(255 * amount));
  const b = Math.max(0, (num & 0xff) - Math.floor(255 * amount));
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}

const flowerNames: Record<string, string> = {
  'daisy': 'Hoa cúc',
  'rose': 'Hoa hồng',
  'tulip': 'Hoa tulip',
  'lotus': 'Hoa sen',
  'apricot': 'Hoa mai',
  'peach': 'Hoa đào',
  'lavender': 'Hoa lavender',
  'sakura': 'Hoa anh đào',
  'sunflower': 'Hoa hướng dương',
  'hydrangea': 'Hoa cẩm tú cầu',
  'lily': 'Hoa lily',
  'dandelion': 'Hoa bồ công anh',
  'peony': 'Hoa mẫu đơn',
  'violet': 'Hoa violet',
  'wild_sunflower': 'Hoa dã quỳ',
  'frangipani': 'Hoa sứ',
  'lisianthus': 'Hoa cát tường',
  'calla_lily': 'Hoa rum',
};

export function getFlowerName(type: string): string {
  return flowerNames[type] || type;
}

export const FLOWER_TYPES = Object.keys(flowerNames);

function renderFlower(type: string, color: string, dark: string, size: number) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.14;
  const pr = size * 0.18;

  switch (type) {
    case 'daisy': {
      const petals = [];
      for (let i = 0; i < 8; i++) {
        const angle = (i * 45 * Math.PI) / 180;
        const px = cx + Math.cos(angle) * pr;
        const py = cy + Math.sin(angle) * pr;
        petals.push(
          <ellipse key={i} cx={px} cy={py} rx={r * 0.7} ry={r * 1.1}
            fill={color} stroke={dark} strokeWidth="0.5"
            transform={`rotate(${i * 45}, ${px}, ${py})`} />
        );
      }
      return (
        <>
          <line x1={cx} y1={cy + r} x2={cx} y2={size * 0.95} stroke="#5a8a4a" strokeWidth="1.5" />
          {petals}
          <circle cx={cx} cy={cy} r={r * 0.55} fill="#f0d060" stroke={dark} strokeWidth="0.5" />
        </>
      );
    }
    case 'rose': {
      return (
        <>
          <line x1={cx} y1={cy + r * 0.5} x2={cx} y2={size * 0.95} stroke="#5a8a4a" strokeWidth="1.5" />
          <ellipse cx={cx - 2} cy={cy + size * 0.18} rx={size * 0.06} ry={size * 0.03} fill="#6a9e6f" transform={`rotate(-30, ${cx - 2}, ${cy + size * 0.18})`} />
          <circle cx={cx} cy={cy} r={pr} fill={color} stroke={dark} strokeWidth="0.5" />
          <path d={`M${cx - pr * 0.6},${cy} Q${cx},${cy - pr * 0.8} ${cx + pr * 0.6},${cy}`} fill="none" stroke={dark} strokeWidth="0.7" />
          <path d={`M${cx - pr * 0.3},${cy + pr * 0.3} Q${cx},${cy - pr * 0.4} ${cx + pr * 0.3},${cy + pr * 0.3}`} fill="none" stroke={dark} strokeWidth="0.7" />
          <path d={`M${cx},${cy - pr * 0.5} Q${cx + pr * 0.2},${cy - pr * 0.2} ${cx},${cy + pr * 0.1}`} fill="none" stroke={dark} strokeWidth="0.5" />
        </>
      );
    }
    case 'tulip': {
      return (
        <>
          <line x1={cx} y1={cy + r * 0.8} x2={cx} y2={size * 0.95} stroke="#5a8a4a" strokeWidth="1.5" />
          <path d={`M${cx - pr * 0.8},${cy + r * 0.5} Q${cx - pr * 1.0},${cy - pr * 1.2} ${cx},${cy - pr * 1.0} Q${cx + pr * 1.0},${cy - pr * 1.2} ${cx + pr * 0.8},${cy + r * 0.5} Z`}
            fill={color} stroke={dark} strokeWidth="0.7" />
          <path d={`M${cx},${cy - pr * 1.0} L${cx},${cy + r * 0.3}`} fill="none" stroke={dark} strokeWidth="0.4" />
        </>
      );
    }
    case 'lotus': {
      const petals = [];
      for (let i = 0; i < 5; i++) {
        const angle = (-90 + i * 36 - 72) * Math.PI / 180;
        const px = cx + Math.cos(angle) * pr * 0.5;
        const py = cy + Math.sin(angle) * pr * 0.5;
        petals.push(
          <ellipse key={i} cx={px} cy={py} rx={r * 0.6} ry={r * 1.3}
            fill={color} stroke={dark} strokeWidth="0.5"
            transform={`rotate(${-90 + i * 36 - 72}, ${px}, ${py})`} opacity="0.85" />
        );
      }
      return (
        <>
          <ellipse cx={cx} cy={cy + pr * 1.1} rx={pr * 1.2} ry={pr * 0.3} fill="#8fc49a" stroke="#5a8a4a" strokeWidth="0.5" />
          {petals}
          <circle cx={cx} cy={cy} r={r * 0.3} fill="#f0d060" />
        </>
      );
    }
    case 'apricot': {
      const petals = [];
      for (let i = 0; i < 5; i++) {
        const angle = (i * 72 - 90) * Math.PI / 180;
        const px = cx + Math.cos(angle) * pr * 0.7;
        const py = cy + Math.sin(angle) * pr * 0.7;
        petals.push(
          <circle key={i} cx={px} cy={py} r={r * 0.65} fill={color} stroke={dark} strokeWidth="0.5" />
        );
      }
      return (
        <>
          <line x1={cx} y1={cy + r} x2={cx} y2={size * 0.95} stroke="#8b6b3e" strokeWidth="1.5" />
          {petals}
          <circle cx={cx} cy={cy} r={r * 0.35} fill="#f0d060" stroke={dark} strokeWidth="0.5" />
        </>
      );
    }
    case 'peach': {
      const petals = [];
      for (let i = 0; i < 5; i++) {
        const angle = (i * 72 - 90) * Math.PI / 180;
        const px = cx + Math.cos(angle) * pr * 0.65;
        const py = cy + Math.sin(angle) * pr * 0.65;
        petals.push(
          <ellipse key={i} cx={px} cy={py} rx={r * 0.75} ry={r * 0.85}
            fill={color} stroke={dark} strokeWidth="0.5"
            transform={`rotate(${i * 72 - 90}, ${px}, ${py})`} />
        );
      }
      return (
        <>
          <line x1={cx} y1={cy + r} x2={cx} y2={size * 0.95} stroke="#8b6b3e" strokeWidth="1.2" />
          {petals}
          <circle cx={cx} cy={cy} r={r * 0.3} fill="#e8c040" stroke={dark} strokeWidth="0.4" />
          {[...Array(5)].map((_, i) => {
            const a = (i * 72 - 90) * Math.PI / 180;
            return <line key={`s${i}`} x1={cx} y1={cy} x2={cx + Math.cos(a) * r * 0.6} y2={cy + Math.sin(a) * r * 0.6} stroke={dark} strokeWidth="0.3" />;
          })}
        </>
      );
    }
    case 'lavender': {
      const buds = [];
      for (let i = 0; i < 6; i++) {
        const y = cy - pr + i * (pr * 0.4);
        const xOff = (i % 2 === 0 ? -1 : 1) * r * 0.3;
        buds.push(
          <ellipse key={i} cx={cx + xOff} cy={y} rx={r * 0.45} ry={r * 0.35}
            fill={color} stroke={dark} strokeWidth="0.4" />
        );
      }
      return (
        <>
          <line x1={cx} y1={cy} x2={cx} y2={size * 0.95} stroke="#5a8a4a" strokeWidth="1.5" />
          {buds}
        </>
      );
    }
    case 'sakura': {
      const petals = [];
      for (let i = 0; i < 5; i++) {
        const angle = (i * 72 - 90) * Math.PI / 180;
        const px = cx + Math.cos(angle) * pr * 0.6;
        const py = cy + Math.sin(angle) * pr * 0.6;
        petals.push(
          <path key={i}
            d={`M${cx},${cy} Q${px - r * 0.4},${py - r * 0.4} ${px},${py} Q${px + r * 0.4},${py - r * 0.4} ${cx},${cy}`}
            fill={color} stroke={dark} strokeWidth="0.4" />
        );
      }
      return (
        <>
          <line x1={cx} y1={cy + r} x2={cx} y2={size * 0.95} stroke="#8b6b3e" strokeWidth="1.2" />
          {petals}
          <circle cx={cx} cy={cy} r={r * 0.25} fill="#f0d060" />
        </>
      );
    }
    case 'sunflower': {
      const petals = [];
      for (let i = 0; i < 12; i++) {
        const angle = (i * 30) * Math.PI / 180;
        const px = cx + Math.cos(angle) * pr;
        const py = cy + Math.sin(angle) * pr;
        petals.push(
          <ellipse key={i} cx={px} cy={py} rx={r * 0.4} ry={r * 1.0}
            fill={color} stroke={dark} strokeWidth="0.4"
            transform={`rotate(${i * 30}, ${px}, ${py})`} />
        );
      }
      return (
        <>
          <line x1={cx} y1={cy + pr} x2={cx} y2={size * 0.95} stroke="#5a8a4a" strokeWidth="2" />
          {petals}
          <circle cx={cx} cy={cy} r={r * 0.7} fill="#6b4e1e" stroke="#4a3510" strokeWidth="0.5" />
        </>
      );
    }
    case 'hydrangea': {
      const flowers = [];
      for (let i = 0; i < 7; i++) {
        const angle = i === 0 ? 0 : ((i - 1) * 60) * Math.PI / 180;
        const dist = i === 0 ? 0 : pr * 0.55;
        const fx = cx + Math.cos(angle) * dist;
        const fy = cy + Math.sin(angle) * dist;
        for (let j = 0; j < 4; j++) {
          const pa = (j * 90 + 45) * Math.PI / 180;
          flowers.push(
            <circle key={`${i}-${j}`}
              cx={fx + Math.cos(pa) * r * 0.25}
              cy={fy + Math.sin(pa) * r * 0.25}
              r={r * 0.25} fill={color} stroke={dark} strokeWidth="0.3" />
          );
        }
      }
      return (
        <>
          <line x1={cx} y1={cy + pr} x2={cx} y2={size * 0.95} stroke="#5a8a4a" strokeWidth="1.5" />
          {flowers}
        </>
      );
    }
    case 'lily': {
      const petals = [];
      for (let i = 0; i < 6; i++) {
        const angle = (i * 60 - 90) * Math.PI / 180;
        const px = cx + Math.cos(angle) * pr * 0.8;
        const py = cy + Math.sin(angle) * pr * 0.8;
        petals.push(
          <ellipse key={i} cx={px} cy={py} rx={r * 0.5} ry={r * 1.2}
            fill={color} stroke={dark} strokeWidth="0.5"
            transform={`rotate(${i * 60 - 90}, ${px}, ${py})`} />
        );
      }
      return (
        <>
          <line x1={cx} y1={cy + r} x2={cx} y2={size * 0.95} stroke="#5a8a4a" strokeWidth="1.5" />
          {petals}
          <circle cx={cx} cy={cy} r={r * 0.2} fill="#f0d060" />
          {[...Array(3)].map((_, i) => {
            const a = (i * 120 - 90) * Math.PI / 180;
            return <line key={`st${i}`} x1={cx} y1={cy} x2={cx + Math.cos(a) * r * 0.8} y2={cy + Math.sin(a) * r * 0.8} stroke="#d4a030" strokeWidth="0.6" />;
          })}
        </>
      );
    }
    case 'dandelion': {
      const lines = [];
      for (let i = 0; i < 12; i++) {
        const angle = (i * 30) * Math.PI / 180;
        const ex = cx + Math.cos(angle) * pr;
        const ey = cy + Math.sin(angle) * pr;
        lines.push(
          <g key={i}>
            <line x1={cx} y1={cy} x2={ex} y2={ey} stroke={dark} strokeWidth="0.3" />
            <circle cx={ex} cy={ey} r={r * 0.2} fill={color} stroke={dark} strokeWidth="0.2" />
          </g>
        );
      }
      return (
        <>
          <line x1={cx} y1={cy + pr} x2={cx} y2={size * 0.95} stroke="#5a8a4a" strokeWidth="1" />
          {lines}
          <circle cx={cx} cy={cy} r={r * 0.25} fill={dark} />
        </>
      );
    }
    case 'peony': {
      const layers = [];
      for (let layer = 0; layer < 3; layer++) {
        const count = layer === 0 ? 8 : layer === 1 ? 6 : 4;
        const dist = pr * (0.9 - layer * 0.25);
        const rr = r * (1.0 - layer * 0.15);
        for (let i = 0; i < count; i++) {
          const angle = (i * (360 / count) + layer * 15) * Math.PI / 180;
          const px = cx + Math.cos(angle) * dist;
          const py = cy + Math.sin(angle) * dist;
          layers.push(
            <ellipse key={`${layer}-${i}`} cx={px} cy={py} rx={rr * 0.65} ry={rr * 0.85}
              fill={color} stroke={dark} strokeWidth="0.3"
              opacity={0.7 + layer * 0.1}
              transform={`rotate(${i * (360 / count) + layer * 15}, ${px}, ${py})`} />
          );
        }
      }
      return (
        <>
          <line x1={cx} y1={cy + pr} x2={cx} y2={size * 0.95} stroke="#5a8a4a" strokeWidth="1.5" />
          {layers}
          <circle cx={cx} cy={cy} r={r * 0.3} fill="#f0d060" />
        </>
      );
    }
    case 'violet': {
      const petals = [];
      for (let i = 0; i < 5; i++) {
        const angle = (i * 72 - 90) * Math.PI / 180;
        const px = cx + Math.cos(angle) * pr * 0.6;
        const py = cy + Math.sin(angle) * pr * 0.6;
        const rSz = i >= 3 ? r * 1.1 : r * 0.9;
        petals.push(
          <ellipse key={i} cx={px} cy={py} rx={rSz * 0.6} ry={rSz * 0.9}
            fill={color} stroke={dark} strokeWidth="0.5"
            transform={`rotate(${i * 72 - 90}, ${px}, ${py})`} />
        );
      }
      return (
        <>
          <line x1={cx} y1={cy + r} x2={cx} y2={size * 0.95} stroke="#5a8a4a" strokeWidth="1" />
          {petals}
          <circle cx={cx} cy={cy} r={r * 0.2} fill="#f0e068" />
        </>
      );
    }
    case 'wild_sunflower': {
      const petals = [];
      for (let i = 0; i < 10; i++) {
        const angle = (i * 36) * Math.PI / 180;
        const px = cx + Math.cos(angle) * pr * 0.9;
        const py = cy + Math.sin(angle) * pr * 0.9;
        petals.push(
          <ellipse key={i} cx={px} cy={py} rx={r * 0.4} ry={r * 0.95}
            fill={color} stroke={dark} strokeWidth="0.4"
            transform={`rotate(${i * 36}, ${px}, ${py})`} />
        );
      }
      return (
        <>
          <line x1={cx} y1={cy + pr} x2={cx} y2={size * 0.95} stroke="#5a8a4a" strokeWidth="1.5" />
          {petals}
          <circle cx={cx} cy={cy} r={r * 0.55} fill="#5a4010" />
        </>
      );
    }
    case 'frangipani': {
      const petals = [];
      for (let i = 0; i < 5; i++) {
        const angle = (i * 72 - 90) * Math.PI / 180;
        const px = cx + Math.cos(angle) * pr * 0.55;
        const py = cy + Math.sin(angle) * pr * 0.55;
        petals.push(
          <ellipse key={i} cx={px} cy={py} rx={r * 0.55} ry={r * 1.15}
            fill={color} stroke={dark} strokeWidth="0.5"
            transform={`rotate(${i * 72 - 90 + 15}, ${px}, ${py})`} />
        );
      }
      return (
        <>
          <line x1={cx} y1={cy + r} x2={cx} y2={size * 0.95} stroke="#5a8a4a" strokeWidth="1.2" />
          {petals}
          <circle cx={cx} cy={cy} r={r * 0.3} fill="#f5e080" />
        </>
      );
    }
    case 'lisianthus': {
      const petals = [];
      for (let i = 0; i < 6; i++) {
        const angle = (i * 60 - 30) * Math.PI / 180;
        const px = cx + Math.cos(angle) * pr * 0.5;
        const py = cy + Math.sin(angle) * pr * 0.5;
        petals.push(
          <ellipse key={i} cx={px} cy={py} rx={r * 0.8} ry={r * 1.1}
            fill={color} stroke={dark} strokeWidth="0.4"
            transform={`rotate(${i * 60}, ${px}, ${py})`} opacity="0.8" />
        );
      }
      return (
        <>
          <line x1={cx} y1={cy + r} x2={cx} y2={size * 0.95} stroke="#5a8a4a" strokeWidth="1.3" />
          {petals}
          <circle cx={cx} cy={cy} r={r * 0.25} fill="#e8e0a0" />
        </>
      );
    }
    case 'calla_lily': {
      return (
        <>
          <line x1={cx} y1={cy + pr * 0.3} x2={cx} y2={size * 0.95} stroke="#5a8a4a" strokeWidth="1.5" />
          <path d={`M${cx - pr * 0.8},${cy + pr * 0.5} Q${cx - pr * 1.0},${cy - pr * 1.2} ${cx},${cy - pr * 0.8} Q${cx + pr * 1.0},${cy - pr * 1.2} ${cx + pr * 0.5},${cy - pr * 0.2} Q${cx + pr * 0.1},${cy + pr * 0.1} ${cx - pr * 0.8},${cy + pr * 0.5} Z`}
            fill={color} stroke={dark} strokeWidth="0.7" />
          <ellipse cx={cx - r * 0.1} cy={cy - pr * 0.2} rx={r * 0.2} ry={r * 0.8} fill="#f0d060" />
        </>
      );
    }
    default: {
      const petals = [];
      for (let i = 0; i < 6; i++) {
        const angle = (i * 60) * Math.PI / 180;
        const px = cx + Math.cos(angle) * pr * 0.7;
        const py = cy + Math.sin(angle) * pr * 0.7;
        petals.push(
          <circle key={i} cx={px} cy={py} r={r * 0.6} fill={color} stroke={dark} strokeWidth="0.5" />
        );
      }
      return (
        <>
          <line x1={cx} y1={cy + r} x2={cx} y2={size * 0.95} stroke="#5a8a4a" strokeWidth="1.5" />
          {petals}
          <circle cx={cx} cy={cy} r={r * 0.3} fill="#f0d060" />
        </>
      );
    }
  }
}

export default function FlowerSVG({ type, color, size = 60, className }: FlowerSVGProps) {
  const dark = darkenColor(color, 0.2);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      style={{ display: 'block' }}
    >
      {renderFlower(type, color, dark, size)}
    </svg>
  );
}
