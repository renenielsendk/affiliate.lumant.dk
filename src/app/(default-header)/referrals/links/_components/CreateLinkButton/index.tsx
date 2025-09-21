'use client';

import { IconifyIcon } from '@/components/IconifyIcon';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { CreateLinkModal } from './CreateLinkModal';

type Props = {
  affiliateName: string;
  totalLinks: number;
};

export const CreateLinkButton = ({ affiliateName, totalLinks }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant='contained'
        startIcon={<IconifyIcon icon='mdi:add' />}
        color='primary'
        onClick={() => setOpen(true)}
      >
        <Typography variant='button'>Opret henvisningslink</Typography>
      </Button>
      <CreateLinkModal
        onClose={() => setOpen(false)}
        open={open}
        affiliateName={affiliateName}
        totalLinks={totalLinks}
      />
    </>
  );
};
