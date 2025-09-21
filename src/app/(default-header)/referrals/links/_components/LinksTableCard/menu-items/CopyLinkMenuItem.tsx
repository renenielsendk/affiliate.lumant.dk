'use client';

import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { IconifyIcon } from '@/components/IconifyIcon';
import { useDotsMenuDropdown } from '@/components/menu/DotsMenuDropDown';
import { useSnackbar } from 'notistack';
import copy from 'copy-to-clipboard';

type Props = {
  slug: string;
};

export const CopyLinkMenuItem = ({ slug }: Props) => {
  const { onMenuItemClick } = useDotsMenuDropdown();
  const { enqueueSnackbar } = useSnackbar();

  const handleCopyLink = () => {
    copy(`https://lumant.dk/p/${slug}`);
    enqueueSnackbar('Linket blev kopieret', { variant: 'success' });
    onMenuItemClick();
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleCopyLink}>
        <IconifyIcon icon={'mdi:content-copy'} sx={{ color: 'grey.500', mr: 2 }} />
        <ListItemText primary='Kopiér link' />
      </ListItemButton>
    </ListItem>
  );
};
