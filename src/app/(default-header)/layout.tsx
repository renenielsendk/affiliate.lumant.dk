import React from 'react';
import { Header } from './_components/Header';
import { AuthProvider } from '@/providers/AuthProvider';
import { Box } from '@mui/material';
import { Navbar } from './_components/NavBar';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <Header />
      <Box
        component='main'
        sx={{
          display: 'flex',
          minHeight: '100vh',
          flexDirection: { xs: 'column', lg: 'row' },
          paddingTop: '65px',
        }}
      >
        <Navbar />
        <Box
          sx={{
            flexGrow: 1,
            width: { xs: '100%', lg: `calc(100% - 280px)` },
            minHeight: '100%',
            p: { xs: 2, lg: 4 },
            paddingTop: { xs: 2, lg: 4 },
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </Box>
      </Box>
    </AuthProvider>
  );
}
