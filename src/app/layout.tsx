'use client';

import { CssBaseline } from '@mui/material';
// import { theme } from '@/theme/theme';
import { Provider } from 'react-redux';
import { store, persistor } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <CssBaseline />
            {children}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
