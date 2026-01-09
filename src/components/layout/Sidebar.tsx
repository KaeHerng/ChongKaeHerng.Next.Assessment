'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // ← 1. 添加这个导入
import { useAppSelector } from '@/store/hooks';

const menuItems = [
  { label: 'Dashboard', path: '/Dashboard', icon: '🏠' },
  { label: 'Products', path: '/Products', icon: '📦' },
  { label: 'Orders', path: '/Orders', icon: '🛒' },
  { label: 'Users', path: '/users', role: 'admin', icon: '👤' },
];

type SidebarProps = {
  mobileOpen?: boolean;
  onClose?: () => void;
};

export default function Sidebar({ mobileOpen = false, onClose }: SidebarProps) {
  const user = useAppSelector((s) => s.auth.user);
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setCollapsed(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLinkClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <>
      {isMobile && mobileOpen && <div className="sidebar-overlay" onClick={onClose}></div>}

      <div
        className={`sidebar ${collapsed ? 'collapsed' : ''} ${
          isMobile ? (mobileOpen ? 'open' : 'hidden-mobile') : ''
        }`}
      >
        <div className="sidebar-title text-base">
          {!collapsed ? 'Admin Panel' : 'AP'}
          {!isMobile && (
            <button
              className="sidebar-toggle-btn"
              onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? '▶' : '◀'}
            </button>
          )}
        </div>

        <ul>
          {menuItems.map((item) => {
            if (item.role && item.role !== user?.role) return null;
            const isActive = pathname === item.path;
            return (
              <li key={item.path}>
                <Link 
                  href={item.path}
                  onClick={handleLinkClick}
                  className={isActive ? 'active' : ''}>
                  <span style={{ marginRight: collapsed ? 0 : 8 }}>{item.icon}</span>
                  <span className="label text-sm">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}