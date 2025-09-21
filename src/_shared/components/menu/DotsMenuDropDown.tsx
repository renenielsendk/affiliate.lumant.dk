'use client';

import { Button, List, Popover } from '@mui/material';
import { createContext, useContext, useState } from 'react';
import { IconifyIcon } from '../IconifyIcon';

type DotsMenuContextProps = {
  onMenuItemClick: () => void;
};

const DotsMenuContext = createContext<DotsMenuContextProps | undefined>(undefined);

export const useDotsMenuDropdown = () => {
  const ctx = useContext(DotsMenuContext);
  if (!ctx) {
    throw new Error('useDotsMenuDropdown must be used within a DotsMenuDropDown');
  }
  return ctx;
};

type Props = {
  children?: React.ReactNode;
};

export const DotsMenuDropDown = ({ children }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onMenuItemClick = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        onClick={handleClick}
        sx={{
          border: 'none',
          background: 'transparent',
          px: 0,
          minWidth: 40,
          width: 'auto',
          cursor: 'pointer',
        }}
      >
        <IconifyIcon fontSize={22} icon='mdi:dots-horizontal' />
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <DotsMenuContext.Provider value={{ onMenuItemClick }}>
          <List sx={{ width: 200 }}>{children}</List>
        </DotsMenuContext.Provider>
      </Popover>
    </>
  );
};
