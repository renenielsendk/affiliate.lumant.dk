'use client';

import { useState } from 'react';
import { Button, Snackbar } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCurrentUser } from '@/providers/AuthProvider/AuthProviderContent';

export const CopySignupPageButton = () => {
  const { user } = useCurrentUser();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const handleCopy = async () => {
    const url = `https://login.lumant.dk/tilmeld/referral/${user.affiliate.referralCode}`;
    try {
      await navigator.clipboard.writeText(url);
      enqueueSnackbar('Link kopieret', { variant: 'success' });
    } catch (err) {
      // Optionally handle error
    }
  };

  return (
    <>
      <Button variant='contained' sx={{ maxWidth: '200px' }} color='primary' onClick={handleCopy}>
        Kopier tilmeldingslink
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        message='Link kopieret!'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
};
