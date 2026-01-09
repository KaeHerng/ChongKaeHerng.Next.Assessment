'use client';

import { useState, useEffect } from 'react';
import { AppBar, Box, Toolbar, Typography, Button, Avatar } from '@mui/material';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/authSlice';

export default function Topbar({ pageTitle }: { pageTitle?: string }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const user = useAppSelector((s) => s.auth.user);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.replace('/Login');
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={2}
        sx={{
          bgcolor: '#ffffffff',
          color: '#333',
          zIndex: 1200,
        }}>
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
            <div className='text-lg'>
              {pageTitle || 'Admin Panel'}
            </div>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {user && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  bgcolor: '#f5f5f5',
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
      </AppBar>

      {isMobile && (
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      )}
    </>
  );
}