'use client';

import { IconButton, Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NavSection } from './NavbarSection';
import { Scrollbar } from '@/components/Scrollbar';
import { IconifyIcon } from '@/components/IconifyIcon';

export const NAV = {
  W_VERTICAL: 280,
};

const navLinks = [
  {
    subheader: 'Kontrolpanel',
    items: [
      {
        title: 'Hjem',
        path: '/home',
        icon: 'mdi:monitor-dashboard',
      },
      {
        title: 'Henvisninger',
        path: '/referrals/list',
        icon: 'mdi:share-all-outline',
      },
      {
        title: 'Transaktioner',
        path: '/transactions/list',
        icon: 'mdi:cash-multiple',
      },
    ],
  },
  {
    subheader: 'Support',
    items: [
      {
        title: 'Ændringslog',
        path: '/roadmap/changelog',
        icon: 'mdi:history',
      },
    ],
  },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    if (showNav) {
      setShowNav(!showNav);
    }
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        paddingBottom: {
          xs: 6,
          lg: 0,
        },
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box sx={{ py: 4 }}>
        <NavSection navData={navLinks} />
      </Box>
    </Scrollbar>
  );

  return (
    <>
      <Toolbar
        sx={{
          px: { lg: 5 },
          display: { lg: 'none' },
        }}
      >
        <Stack flexGrow={1} direction='row' alignItems='center' justifyContent='flex-end'>
          <IconButton onClick={() => setShowNav(!showNav)}>
            <IconifyIcon color='#fff' fontSize={28} icon='mdi:menu' />
          </IconButton>
        </Stack>
      </Toolbar>
      <Box
        sx={{
          height: 1,
          flexShrink: { lg: 0 },
          width: { lg: NAV.W_VERTICAL },
        }}
      >
        <Stack
          sx={{
            height: 1,
            position: 'fixed',
            display: { xs: 'none', lg: 'block' },
            width: NAV.W_VERTICAL,
            borderRightWidth: 1,
            borderRightStyle: 'solid',
            borderRightColor: 'grey.700',
          }}
        >
          {renderContent}
        </Stack>
        <Drawer
          open={showNav}
          onClose={() => setShowNav(false)}
          PaperProps={{
            sx: {
              width: NAV.W_VERTICAL,
            },
          }}
        >
          {renderContent}
        </Drawer>
      </Box>
    </>
  );
};
