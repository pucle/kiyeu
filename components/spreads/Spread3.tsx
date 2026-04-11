'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import FlowerSVG, { getFlowerName } from '../FlowerSVG';
import BasketSVG from '../BasketSVG';
import ConfirmModal from '../ConfirmModal';

const TIME_SLOTS = [
  '09:00', '09:10', '09:20', '09:30', '09:40',
  '09:50', '10:00', '10:10', '10:20', '10:30',
  '10:40', '10:50', '11:00',
];

interface RsvpEntry {
  id: number;
  nickname: string;
  flower_type: string;
  flower_color: string;
  time_slot: string;
  is_hidden?: boolean;
}

interface Spread3Props {
  nickname: string;
  displayName: boolean;
  selectedFlower: string;
  selectedColor: string;
  onSuccess: (entry: RsvpEntry) => void;
}

const fetcher = (url: string) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('owner_token') : null;
  const headers: Record<string, string> = {};
  if (token) headers['x-owner-token'] = token;
  return fetch(url, { headers }).then((r) => r.json());
};

export default function Spread3({
  nickname, displayName, selectedFlower, selectedColor, onSuccess,
}: Spread3Props) {
  const { data: entries, mutate } = useSWR<RsvpEntry[]>('/api/rsvp', fetcher, {
    refreshInterval: 10000,
  });
  const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);
  const [confirmSlot, setConfirmSlot] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [droppingSlot, setDroppingSlot] = useState<string | null>(null);
  const [showSparkle, setShowSparkle] = useState<string | null>(null);

  const hasSubmitted = typeof window !== 'undefined' && localStorage.getItem('rsvp_id');

  const entriesBySlot = (slot: string) => (entries || []).filter((e) => e.time_slot === slot);

  const handleConfirm = async (message: string) => {
    if (!confirmSlot || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nickname,
          display_name: displayName,
          flower_type: selectedFlower,
          flower_color: selectedColor,
          time_slot: confirmSlot,
          message,
        }),
      });
      if (res.ok) {
        const entry = await res.json();
        localStorage.setItem('rsvp_id', entry.id.toString());
        setDroppingSlot(confirmSlot);
        setConfirmSlot(null);
        await mutate();
        // Show sparkle after drop
        setTimeout(() => {
          setShowSparkle(confirmSlot);
        }, 700);
        setTimeout(() => {
          setDroppingSlot(null);
          setShowSparkle(null);
          onSuccess(entry);
        }, 1400);
      }
    } catch (err) {
      console.error('RSVP error:', err);
    }
    setSubmitting(false);
  };

  const flowerSize = 52;
  const previewSize = 56;

  // Create a lush bouquet layout - flowers packed in an arc, overlapping
  const getBouquetPosition = (idx: number, total: number) => {
    if (total === 1) {
      return { left: 38, bottom: 10, rotate: 0, scale: 1 };
    }
    if (total === 2) {
      const positions = [
        { left: 22, bottom: 8, rotate: -12, scale: 1 },
        { left: 52, bottom: 12, rotate: 10, scale: 0.95 },
      ];
      return positions[idx];
    }
    if (total === 3) {
      const positions = [
        { left: 10, bottom: 5, rotate: -15, scale: 0.95 },
        { left: 35, bottom: 18, rotate: 3, scale: 1.05 },
        { left: 58, bottom: 8, rotate: 12, scale: 0.92 },
      ];
      return positions[idx];
    }
    if (total === 4) {
      const positions = [
        { left: 5, bottom: 2, rotate: -18, scale: 0.9 },
        { left: 25, bottom: 20, rotate: -5, scale: 1.05 },
        { left: 48, bottom: 22, rotate: 8, scale: 1.0 },
        { left: 65, bottom: 5, rotate: 15, scale: 0.92 },
      ];
      return positions[idx];
    }
    // 5+ flowers: pack them tightly
    const row = Math.floor(idx / 4);
    const col = idx % 4;
    const inRow = Math.min(4, total - row * 4);
    const baseLeft = 5 + col * (85 / inRow);
    const jitterX = ((idx * 7 + 3) % 11) - 5;
    const jitterY = ((idx * 13 + 5) % 9) - 4;
    const rotate = ((idx * 17 + 7) % 25) - 12;
    return {
      left: baseLeft + jitterX,
      bottom: -2 + row * 26 + jitterY,
      rotate,
      scale: 0.88 + ((idx * 3) % 5) * 0.04,
    };
  };

  const renderBasket = (slot: string, index: number) => {
    const slotEntries = entriesBySlot(slot);
    const isHovered = hoveredSlot === slot;
    const isDropping = droppingSlot === slot;
    const hasSparkle = showSparkle === slot;

    return (
      <div
        key={slot}
        className={`basket-slot basket-interactive ${isHovered ? 'basket-hovered' : ''}`}
        onMouseEnter={() => setHoveredSlot(slot)}
        onMouseLeave={() => setHoveredSlot(null)}
        onClick={() => setConfirmSlot(slot)}
        id={`basket-${slot.replace(':', '')}`}
      >
        <div className="basket-flowers-area">
          {/* Existing flowers in basket */}
          {slotEntries.map((e, idx) => {
            const pos = getBouquetPosition(idx, slotEntries.length);
            return (
              <div key={e.id} className="basket-flower basket-flower-settled" style={{
                left: `${pos.left}%`,
                bottom: `${pos.bottom}%`,
                transform: `rotate(${pos.rotate}deg) scale(${pos.scale})`,
                zIndex: idx + 1,
              }}>
                <FlowerSVG type={e.flower_type} color={e.flower_color} size={flowerSize} />
              </div>
            );
          })}
          {/* Hover preview */}
          {isHovered && selectedFlower && !isDropping && (
            <div className="basket-flower basket-flower-preview">
              <FlowerSVG type={selectedFlower} color={selectedColor} size={previewSize} />
            </div>
          )}
          {/* Dropping animation */}
          {isDropping && (
            <div className="basket-flower basket-flower-dropping">
              <FlowerSVG type={selectedFlower} color={selectedColor} size={previewSize} />
            </div>
          )}
          {/* Sparkle effect */}
          {hasSparkle && (
            <div className="basket-sparkles">
              {[...Array(6)].map((_, i) => (
                <span key={i} className="sparkle" style={{
                  left: `${20 + (i * 12) % 60}%`,
                  top: `${10 + (i * 15) % 50}%`,
                  animationDelay: `${i * 0.08}s`,
                }} />
              ))}
            </div>
          )}
        </div>
        <BasketSVG width={150} height={102} />
        <span className="basket-time">{slot}</span>
        <div className="basket-names">
          {slotEntries.map((e) => (
            <span key={e.id} className="basket-name">{e.nickname}</span>
          ))}
        </div>
      </div>
    );
  };

  const renderBasketView = (slot: string) => {
    const slotEntries = entriesBySlot(slot);
    return (
      <div key={slot} className="basket-slot">
        <div className="basket-flowers-area">
          {slotEntries.map((e, idx) => {
            const total = slotEntries.length;
            const pos = total <= 4 ? (() => {
              if (total === 1) return { left: 38, bottom: 10, rotate: 0, scale: 1 };
              if (total === 2) return [{ left: 22, bottom: 8, rotate: -12, scale: 1 }, { left: 52, bottom: 12, rotate: 10, scale: 0.95 }][idx];
              if (total === 3) return [{ left: 10, bottom: 5, rotate: -15, scale: 0.95 }, { left: 35, bottom: 18, rotate: 3, scale: 1.05 }, { left: 58, bottom: 8, rotate: 12, scale: 0.92 }][idx];
              return [{ left: 5, bottom: 2, rotate: -18, scale: 0.9 }, { left: 25, bottom: 20, rotate: -5, scale: 1.05 }, { left: 48, bottom: 22, rotate: 8, scale: 1.0 }, { left: 65, bottom: 5, rotate: 15, scale: 0.92 }][idx];
            })() : (() => {
              const row = Math.floor(idx / 4), col = idx % 4, inRow = Math.min(4, total - row * 4);
              return { left: 5 + col * (85 / inRow) + ((idx * 7 + 3) % 11) - 5, bottom: -2 + row * 26 + ((idx * 13 + 5) % 9) - 4, rotate: ((idx * 17 + 7) % 25) - 12, scale: 0.88 + ((idx * 3) % 5) * 0.04 };
            })();
            return (
              <div key={e.id} className="basket-flower basket-flower-settled" style={{
                left: `${pos.left}%`,
                bottom: `${pos.bottom}%`,
                transform: `rotate(${pos.rotate}deg) scale(${pos.scale})`,
                zIndex: idx + 1,
              }}>
                <FlowerSVG type={e.flower_type} color={e.flower_color} size={flowerSize} />
              </div>
            );
          })}
        </div>
        <BasketSVG width={150} height={102} />
        <span className="basket-time">{slot}</span>
        <div className="basket-names">
          {slotEntries.map((e) => (
            <span key={e.id} className="basket-name">{e.nickname}</span>
          ))}
        </div>
      </div>
    );
  };

  if (hasSubmitted) {
    return (
      <div className="spread">
        <div className="page page-left page-paper">
          <div className="page-inner spread3-full">
            <div className="already-submitted">
              <p className="already-text">Ồ, con vợ đã chọn giờ rồi lày</p>
              <p className="already-sub">Gặp nhau ngày 25/4 nha</p>
            </div>
            <div className="baskets-grid">
              {TIME_SLOTS.slice(0, 7).map((slot) => renderBasketView(slot))}
            </div>
          </div>
        </div>
        <div className="page page-right page-paper">
          <div className="page-inner spread3-full">
            <div className="baskets-grid baskets-grid-right">
              {TIME_SLOTS.slice(7).map((slot) => renderBasketView(slot))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="spread">
      <div className="page page-left page-paper">
        <div className="page-inner spread3-full">
          <h2 className="page-heading spread3-heading">Bạn sẽ đến lúc mấy giờ?</h2>
          <p className="spread3-subtitle">Chọn giỏ hoa để đặt bông hoa của bạn vào nhé 🌼</p>
          <p className="spread3-note">(Có thể chọn chung khung giờ với người khác nhée!)</p>
          <div className="baskets-grid">
            {TIME_SLOTS.slice(0, 7).map((slot, i) => renderBasket(slot, i))}
          </div>
        </div>
      </div>
      <div className="page page-right page-paper">
        <div className="page-inner spread3-full">
          <div className="baskets-grid baskets-grid-right">
            {TIME_SLOTS.slice(7).map((slot, i) => renderBasket(slot, i + 7))}
          </div>
        </div>
      </div>

      {confirmSlot && (
        <ConfirmModal
          flowerType={getFlowerName(selectedFlower)}
          flowerColor={selectedColor}
          timeSlot={confirmSlot}
          onConfirm={handleConfirm}
          onCancel={() => setConfirmSlot(null)}
          loading={submitting}
        />
      )}
    </div>
  );
}
