'use client';

import { useState, useEffect } from 'react';
import { AppBar, Box, Toolbar, Typography, Button, Avatar } from '@mui/material';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useTheme } from '@/context/ThemeContext';
import { logout } from '@/store/authSlice';

export default function Topbar({ pageTitle }: { pageTitle?: string }) {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const user = useAppSelector((s) => s.auth.user);

  useEffect(() => {
    const handleSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleSize();
    window.addEventListener('resize', handleSize);
    return () => window.removeEventListener('resize', handleSize);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.replace('/Pages/Login');
  };

  return (
    <>
      <div className='Topbar'>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <button
              className="menu-btn"
              onClick={() => setMobileOpen(true)}
              style={{
                background: '#4cafef',
                border: 'none',
                borderRadius: 6,
                color: '#fff',
                width: 36,
                height: 36,
                cursor: 'pointer',
              }}>
              ☰
            </button>
            <div className='text-lg' style={{ color: 'white' }}>
              {pageTitle || 'Admin Panel'}
            </div>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <button
              onClick={toggleTheme}
              style={{
                padding: '4px 12px',
                borderRadius: 6,
                border: '1px solid #333',
                color: 'white',
                backgroundColor: 'transparent',
                cursor: 'pointer',
              }}>
              {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </button>
            {user && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: 'black',
                  bgcolor: '#d7d7d7',
                  p: '4px 8px',
                  borderRadius: 2,
                }}>
                <Avatar sx={{ width: 28, height: 28, bgcolor: '#4cafef' }}>
                  {user.email.charAt(0).toUpperCase()}
                </Avatar>
                <div className='text-sm'>
                  {user.username}
                </div>
              </Box>
            )}
            <Button
              color="error"
              variant="outlined"
              size="small"
              onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </div>

      {isMobile && (
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      )}
    </>
  );
}