'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Spread1 from './spreads/Spread1';
import Spread4 from './spreads/Spread4';

export default function Book() {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');

  // Drag/swipe state
  const dragRef = useRef<{ startX: number; startY: number; isDragging: boolean; startTime: number }>({
    startX: 0, startY: 0, isDragging: false, startTime: 0,
  });
  const [dragDelta, setDragDelta] = useState(0);
  const bookRef = useRef<HTMLDivElement>(null);

  const totalSpreads = 2; // Only Cover/Letter and Countdown/Location

  const flipTo = useCallback((target: number) => {
    if (isFlipping || target === currentSpread || target < 0 || target >= totalSpreads) return;
    setFlipDirection(target > currentSpread ? 'next' : 'prev');
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentSpread(target);
      setIsFlipping(false);
    }, 600);
  }, [isFlipping, currentSpread]);

  const goNext = useCallback(() => flipTo(currentSpread + 1), [flipTo, currentSpread]);
  const goPrev = useCallback(() => flipTo(currentSpread - 1), [flipTo, currentSpread]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev]);

  // ===== MOUSE DRAG =====
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    // Don't capture drag on interactive elements
    const tag = (e.target as HTMLElement).tagName.toLowerCase();
    if (['input', 'button', 'textarea', 'select', 'label', 'a'].includes(tag)) return;
    if ((e.target as HTMLElement).closest('button, input, textarea, select, label, a')) return;

    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      isDragging: true,
      startTime: Date.now(),
    };
    setDragDelta(0);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current.isDragging) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    // Only horizontal drag
    if (Math.abs(dy) > Math.abs(dx) && Math.abs(dx) < 30) return;
    setDragDelta(dx);
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!dragRef.current.isDragging) return;
    const dx = dragDelta;
    const elapsed = Date.now() - dragRef.current.startTime;

    // Quick flick (high velocity) or sufficient distance
    const velocity = Math.abs(dx) / elapsed;
    const threshold = velocity > 0.5 ? 30 : 80;

    if (Math.abs(dx) > threshold) {
      if (dx < 0) goNext();
      else goPrev();
    }

    dragRef.current.isDragging = false;
    setDragDelta(0);
  }, [dragDelta, goNext, goPrev]);

  // Touch swipe (native)
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let startTime = 0;
    const onStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startTime = Date.now();
    };
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      // Ignore vertical scrolling
      if (Math.abs(dy) > Math.abs(dx)) return;
      const elapsed = Date.now() - startTime;
      const velocity = Math.abs(dx) / elapsed;
      const threshold = velocity > 0.5 ? 30 : 60;
      if (Math.abs(dx) > threshold) {
        if (dx < 0) goNext();
        else goPrev();
      }
    };
    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchend', onEnd);
    };
  }, [goNext, goPrev]);

  const flipClass = isFlipping
    ? flipDirection === 'next' ? 'book-flipping-next' : 'book-flipping-prev'
    : '';

  // Drag visual feedback — partial rotation
  const dragRotate = dragRef.current.isDragging && Math.abs(dragDelta) > 10
    ? `rotateY(${Math.max(-15, Math.min(15, dragDelta * -0.05))}deg)`
    : '';

  return (
    <div className="book-container">
      <div
        ref={bookRef}
        className={`book ${flipClass}`}
        id="book-main"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{ cursor: dragRef.current.isDragging ? 'grabbing' : 'grab' }}
      >
        {/* Spine shadow */}
        <div className="book-spine" aria-hidden="true" />

        {/* Spreads */}
        <div
          className="spread-container"
          style={dragRotate ? { transform: dragRotate, transition: 'none' } : undefined}
        >
          {currentSpread === 0 && <Spread1 onNext={goNext} />}
          {currentSpread === 1 && <Spread4 onBack={goPrev} />}
        </div>

        {/* Page dots indicator */}
        <div className="page-dots">
          {[...Array(totalSpreads)].map((_, i) => (
            <button
              key={i}
              className={`page-dot ${i === currentSpread ? 'page-dot-active' : ''}`}
              onClick={() => flipTo(i)}
              aria-label={`Trang ${i + 1}`}
            />
          ))}
        </div>

        {/* Swipe hint on first spread */}
        {currentSpread === 0 && !isFlipping && (
          <div className="swipe-hint" aria-hidden="true">
            <span className="swipe-hint-text">Vuốt để lật trang →</span>
          </div>
        )}
      </div>

      <div className="book-nav">
        {currentSpread > 0 && (
          <button className="nav-arrow nav-prev" onClick={goPrev} title="Trang trước" id="btn-prev">
            ◀
          </button>
        )}
        {currentSpread < totalSpreads - 1 && (
          <button className="nav-arrow nav-next" onClick={goNext} title="Trang sau" id="btn-next">
            ▶
          </button>
        )}
      </div>
    </div>
  );
}
