'use client';

import { useState } from 'react';
import { Button, Snackbar } from '@mui/material';
import { useSnackbar } from 'notistack';

type Props = {
  businessName: string;
};

export const CopyBookDemoPageButton = ({ businessName }: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const handleCopy = async () => {
    const url = `https://calendly.com/lumant-dk/gratis-30-minutters-demo-mode?a3=${encodeURIComponent(`Henvist via ${businessName}`)}`;
    try {
      await navigator.clipboard.writeText(url);
      enqueueSnackbar('Link kopieret', { variant: 'success' });
    } catch (err) {
      // Optionally handle error
    }
  };

  return (
    <>
      <Button variant='outlined' sx={{ maxWidth: '200px' }} color='primary' onClick={handleCopy}>
        Kopier demomøde link
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
