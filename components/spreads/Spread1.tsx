'use client';

import React, { useState, useEffect } from 'react';

interface Spread1Props {
  onNext: () => void;
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11.5) return 'Chào đằng ấy buổi sáng! ☀️';
  if (hour >= 11.5 && hour < 13.5) return 'Chào đằng ấy buổi trưa! 🍜';
  if (hour >= 13.5 && hour < 18) return 'Chào đằng ấy buổi chiều! 🌤️';
  if (hour >= 18 && hour < 22) return 'Chào đằng ấy buổi tối! 🌙';
  return 'Ủa sao còn thức vậy? 🦉';
}

export default function Spread1({ onNext }: Spread1Props) {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  return (
    <div className="spread">
      {/* Page 1 - Cover */}
      <div className="page page-left page-cover">
        {/* Clouds */}
        <svg className="cover-clouds" viewBox="0 0 300 80" aria-hidden="true">
          <ellipse cx="50" cy="50" rx="40" ry="20" fill="white" opacity="0.85" />
          <ellipse cx="80" cy="45" rx="35" ry="18" fill="white" opacity="0.75" />
          <ellipse cx="65" cy="55" rx="30" ry="15" fill="white" opacity="0.65" />
          <ellipse cx="200" cy="40" rx="45" ry="22" fill="white" opacity="0.8" />
          <ellipse cx="235" cy="35" rx="30" ry="16" fill="white" opacity="0.7" />
          <ellipse cx="215" cy="48" rx="35" ry="15" fill="white" opacity="0.55" />
        </svg>

        {/* Hot air balloon */}
        <svg className="cover-balloon" viewBox="0 0 100 150" aria-hidden="true">
          {/* Balloon */}
          <path d="M50,10 Q20,10 15,45 Q10,75 50,90 Q90,75 85,45 Q80,10 50,10 Z" fill="#d95f4b" />
          <path d="M50,10 Q50,50 50,90" stroke="white" strokeWidth="1" fill="none" opacity="0.6" />
          <path d="M30,20 Q50,55 70,20" stroke="white" strokeWidth="0.8" fill="none" opacity="0.4" />
          <path d="M20,40 Q50,70 80,40" stroke="white" strokeWidth="0.8" fill="none" opacity="0.4" />
          {/* Stripes */}
          <path d="M35,12 Q25,40 30,80" stroke="white" strokeWidth="2" fill="none" opacity="0.5" />
          <path d="M65,12 Q75,40 70,80" stroke="white" strokeWidth="2" fill="none" opacity="0.5" />
          {/* Basket ropes */}
          <line x1="42" y1="90" x2="38" y2="115" stroke="#8b6914" strokeWidth="1" />
          <line x1="58" y1="90" x2="62" y2="115" stroke="#8b6914" strokeWidth="1" />
          {/* Basket */}
          <rect x="35" y="115" width="30" height="18" rx="2" fill="#8b6914" stroke="#6b4e0a" strokeWidth="0.8" />
          <line x1="35" y1="120" x2="65" y2="120" stroke="#b8860b" strokeWidth="0.8" />
          <line x1="35" y1="125" x2="65" y2="125" stroke="#b8860b" strokeWidth="0.8" />
        </svg>

        {/* Title */}
        <div className="cover-title">
          <h1 className="cover-line1">Thiệp Mời</h1>
          <h1 className="cover-line2">Kỉ Yếu</h1>
          <p className="cover-subtitle">Lúc Đình Pê · 2026</p>
        </div>

        {/* Bottom leaf border */}
        <svg className="cover-leaf-border" viewBox="0 0 300 50" aria-hidden="true">
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

      {/* Page 2 - Invitation Letter */}
      <div className="page page-right page-paper">
        <div className="letter-content">
          <p className="letter-greeting">{greeting}</p>

          <div className="letter-body">
            <p>
              Chào cả nhà mình, nhân cái sự kiện trọng đại nghìn năm có một là ngày lớp thằng Púc đẹp trai s1tg này đi chụp ảnh kỉ yếu thì em trân trọng kính mời toàn thể anh chị em họ hàng gần xa đúng chín giờ ba mươi đến mười một giờ mười sáng Chủ nhật ngày mười tám tháng tư năm hai nghìn không trăm hai mươi sáu có mặt tại trường trung học phổ thông chuyên Lê Quý Đôn số một Vũ Văn Dũng để cùng em bắt trọn cái khoảnh khắc hiếm hoi mà em trông tử tế và sáng sủa (tối chưa chắc sủa) nhất trong suốt mười hai năm đèn sách này với triết lý sâu sắc là bạn gái thì có thể simp cô này không hợp thì simp cô khác chứ kỉ yếu đời người chỉ có đúng một lần duy nhất thôi đã qua là không bao giờ quay lại được nên quý giá vô cùng kính mong anh em nhà mình bớt chút thời gian vàng ngọc để có mặt đông đủ chụp cùng em một tấm hình để đời làm kỉ niệm và hãy đến đúng giờ để chung zui trọn vẹn nhất có thể với púc nhế.
            </p>

            <div className="letter-details">
              <p>Địa điểm:THPT Chuyên Lê Quý Đôn</p>
              <p className="letter-detail-sub">(số 1 Vũ Văn Dũng, Đà Nẵng)</p>
              <p>Ngày 18/4/2026 · Thứ Bảy</p>
              <p>Từ 9g30 đến 11g10</p>
            </div>

            <p>
              Không cần mang quà, không cần mặc đẹp<br />
              (thật ra mặc đẹp thì càng vui hehe),<br />
              chỉ cần mang theo mặt mình là đủ rui
            </p>


            <p className="letter-sign">
              Trân trọng & yêu thương,<br />
              <strong>Đình Púc</strong>
            </p>
          </div>

          <button className="wax-seal-btn" onClick={onNext} id="btn-go-spread2">
            <span className="wax-seal-text">Chọn giờ chụp<br />của bạn →</span>
          </button>
        </div>
      </div>
    </div>
  );
}
