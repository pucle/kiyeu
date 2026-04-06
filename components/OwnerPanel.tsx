'use client';

import React, { useState, useEffect, useMemo } from 'react';
import FlowerSVG, { getFlowerName } from './FlowerSVG';

const TIME_SLOTS = [
  '09:30', '09:40', '09:50', '10:00', '10:10',
  '10:20', '10:30', '10:40', '10:50', '11:10',
];

interface RsvpEntry {
  id: number;
  nickname: string;
  display_name: boolean;
  flower_type: string;
  flower_color: string;
  time_slot: string;
  created_at: string;
  message?: string;
  is_hidden?: boolean;
}

export default function OwnerPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginId, setLoginId] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [entries, setEntries] = useState<RsvpEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'schedule' | 'list'>('schedule');

  useEffect(() => {
    const token = localStorage.getItem('owner_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && isOpen) {
      fetchEntries();
    }
  }, [isLoggedIn, isOpen]);

  const fetchEntries = async () => {
    const token = localStorage.getItem('owner_token');
    if (!token) return;
    try {
      const res = await fetch('/api/rsvp/admin', {
        headers: { 'x-owner-token': token },
      });
      if (res.ok) {
        const data = await res.json();
        setEntries(data);
      } else {
        setIsLoggedIn(false);
        localStorage.removeItem('owner_token');
      }
    } catch {
      console.error('Failed to fetch admin entries');
    }
  };

  const handleLogin = async () => {
    setLoginError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/owner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: loginId, password: loginPass }),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('owner_token', data.token);
        setIsLoggedIn(true);
        setLoginId('');
        setLoginPass('');
      } else {
        setLoginError('Sai ID hoặc mật khẩu');
      }
    } catch {
      setLoginError('Lỗi kết nối');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('owner_token');
    setIsLoggedIn(false);
    setEntries([]);
    setIsOpen(false);
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('owner_token');
    if (!token) return;
    if (!confirm('Xóa mục này?')) return;
    try {
      await fetch(`/api/rsvp/${id}`, {
        method: 'DELETE',
        headers: { 'x-owner-token': token },
      });
      fetchEntries();
    } catch {
      console.error('Delete failed');
    }
  };

  // Group entries by time slot
  const entriesBySlot = useMemo(() => {
    const map: Record<string, RsvpEntry[]> = {};
    TIME_SLOTS.forEach(slot => { map[slot] = []; });
    entries.forEach(e => {
      if (map[e.time_slot]) {
        map[e.time_slot].push(e);
      }
    });
    return map;
  }, [entries]);

  const totalGuests = entries.length;

  return (
    <>
      <button
        className="owner-key-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Admin"
        id="btn-owner-key"
      >
        🔑
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="owner-panel" onClick={(e) => e.stopPropagation()}>
            {!isLoggedIn ? (
              <div className="owner-login">
                <div className="owner-login-icon">🌸</div>
                <h3>Đăng nhập quản trị</h3>
                <p className="owner-login-sub">Xem lịch trình & quản lý RSVP</p>
                <input
                  type="text"
                  placeholder="ID"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  className="owner-input"
                  id="input-owner-id"
                />
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  className="owner-input"
                  id="input-owner-pass"
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
                {loginError && <p className="owner-error">{loginError}</p>}
                <button
                  className="btn-confirm"
                  onClick={handleLogin}
                  disabled={loading}
                  id="btn-owner-login"
                >
                  {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                </button>
              </div>
            ) : (
              <div className="owner-dashboard">
                {/* Header */}
                <div className="owner-header">
                  <div className="owner-header-left">
                    <h3>📋 Bảng điều khiển</h3>
                    <span className="owner-stats">
                      Tổng: <strong>{totalGuests}</strong> khách đã RSVP
                    </span>
                  </div>
                  <div className="owner-header-actions">
                    <button
                      className="btn-refresh"
                      onClick={fetchEntries}
                      title="Làm mới"
                    >
                      🔄
                    </button>
                    <button className="btn-cancel" onClick={handleLogout} id="btn-owner-logout">
                      Đăng xuất
                    </button>
                  </div>
                </div>

                {/* Tabs */}
                <div className="owner-tabs">
                  <button
                    className={`owner-tab ${activeTab === 'schedule' ? 'owner-tab-active' : ''}`}
                    onClick={() => setActiveTab('schedule')}
                  >
                    📅 Lịch theo giờ
                  </button>
                  <button
                    className={`owner-tab ${activeTab === 'list' ? 'owner-tab-active' : ''}`}
                    onClick={() => setActiveTab('list')}
                  >
                    📋 Danh sách đầy đủ
                  </button>
                </div>

                {/* Schedule Tab */}
                {activeTab === 'schedule' && (
                  <div className="owner-schedule">
                    {TIME_SLOTS.map(slot => {
                      const slotEntries = entriesBySlot[slot];
                      const count = slotEntries.length;
                      return (
                        <div
                          key={slot}
                          className={`schedule-row ${count > 0 ? 'schedule-row-filled' : 'schedule-row-empty'}`}
                        >
                          <div className="schedule-time">
                            <span className="schedule-time-text">{slot}</span>
                            <span className={`schedule-count ${count > 0 ? 'schedule-count-active' : ''}`}>
                              {count} người
                            </span>
                          </div>
                          <div className="schedule-guests">
                            {count === 0 ? (
                              <span className="schedule-empty-text">Chưa có ai</span>
                            ) : (
                              slotEntries.map(e => (
                                <div key={e.id} className="schedule-guest-card">
                                  <div className="schedule-guest-flower">
                                    <FlowerSVG
                                      type={e.flower_type}
                                      color={e.flower_color}
                                      size={28}
                                    />
                                  </div>
                                  <div className="schedule-guest-info">
                                    <span className="schedule-guest-name">
                                      {e.nickname}
                                      {!e.display_name && <span className="owner-hidden-tag"> 👁‍🗨 ẩn</span>}
                                    </span>
                                    <span className="schedule-guest-flower-name">
                                      {getFlowerName(e.flower_type)}
                                    </span>
                                    {e.message && (
                                      <div className="schedule-guest-message">💬 "{e.message}"</div>
                                    )}
                                  </div>
                                  <button
                                    className="btn-delete-small"
                                    onClick={() => handleDelete(e.id)}
                                    title="Xóa"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* List Tab */}
                {activeTab === 'list' && (
                  <div className="owner-table-wrap">
                    <table className="owner-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Tên</th>
                          <th>Hoa</th>
                          <th>Màu</th>
                          <th>Giờ</th>
                          <th>Hiện tên</th>
                          <th>RSVP lúc</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {entries.map((entry, i) => (
                          <tr key={entry.id}>
                            <td className="owner-td-num">{i + 1}</td>
                            <td>
                              <div className="owner-name-cell">
                                {entry.nickname}
                                {!entry.display_name && <span className="owner-hidden-tag"> ẩn danh</span>}
                                {entry.message && (
                                  <div className="owner-table-message" style={{ fontSize: '0.85em', color: '#666', marginTop: 4 }}>
                                    💬 "{entry.message}"
                                  </div>
                                )}
                              </div>
                            </td>
                            <td>
                              <div className="owner-flower-cell">
                                <FlowerSVG
                                  type={entry.flower_type}
                                  color={entry.flower_color}
                                  size={24}
                                />
                                <span>{getFlowerName(entry.flower_type)}</span>
                              </div>
                            </td>
                            <td>
                              <span className="owner-color-dot" style={{
                                backgroundColor: entry.flower_color,
                              }} />
                            </td>
                            <td>
                              <span className="owner-time-badge">{entry.time_slot}</span>
                            </td>
                            <td>{entry.display_name ? '✅' : '❌'}</td>
                            <td className="owner-td-date">
                              {new Date(entry.created_at).toLocaleString('vi-VN', {
                                day: '2-digit',
                                month: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </td>
                            <td>
                              <button
                                className="btn-delete"
                                onClick={() => handleDelete(entry.id)}
                                title="Xóa"
                              >
                                ✕
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {entries.length === 0 && (
                      <p className="owner-empty">Chưa có ai RSVP 🌱</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
