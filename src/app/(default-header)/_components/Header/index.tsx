import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image';
import Logo from './logo.png';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';

export const Header = () => {
  return (
    <AppBar
      sx={{
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: 'grey.700',
        backgroundColor: 'grey.900',
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        <Stack flexDirection='row' alignItems='center'>
          <Link href='/'>
            <Image alt='lumant logo' {...Logo} style={{ maxWidth: 150, height: 'auto', marginRight: '1rem' }} />
          </Link>
        </Stack>
        <Stack flexGrow={1} direction='row' alignItems='center' justifyContent='flex-end' spacing={{ xs: 0.5, sm: 1 }}>
          <UserButton />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
