'use client';

import { IconifyIcon } from '@/components/IconifyIcon';
import { SnackbarProvider as NotistackProvider, MaterialDesignContent } from 'notistack';
import { useRef } from 'react';
import { styled } from '@mui/material/styles';

const StyledNotistack = styled(MaterialDesignContent)(({ theme }) => ({
  '& #notistack-snackbar': {
    ...theme.typography.subtitle2,
    padding: 0,
    flexGrow: 1,
  },
  '&.notistack-MuiContent': {
    color: theme.palette.text.primary,
    boxShadow: theme.customShadows.z8,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1, 2, 1, 0.5),
    backgroundColor: theme.palette.background.paper,
  },
  '&.notistack-MuiContent-default': {
    padding: theme.spacing(1, 2, 1, 1),
    color: theme.palette.grey[800],
    backgroundColor: theme.palette.common.white,
  },
}));

type StyledIconProps = {
  color: 'info' | 'success' | 'warning' | 'error';
};

const StyledIcon = styled('span')<StyledIconProps>(({ color, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(1),
  marginLeft: theme.spacing(1.5),
  color: theme.palette[color].main,
}));

type Props = {
  children: React.ReactNode;
};

export const SnackbarProvider = ({ children }: Props) => {
  const notistackRef = useRef<any>(null);

  return (
    <NotistackProvider
      ref={notistackRef}
      maxSnack={5}
      preventDuplicate
      autoHideDuration={3000}
      variant='success'
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      iconVariant={{
        info: (
          <StyledIcon color='info'>
            <IconifyIcon fontSize={16} icon='mdi:information-outline' />
          </StyledIcon>
        ),
        success: (
          <StyledIcon color='success'>
            <IconifyIcon fontSize={16} icon='mdi:check-circle-outline' />
          </StyledIcon>
        ),
        warning: (
          <StyledIcon color='warning'>
            <IconifyIcon fontSize={16} icon='mdi:alert-outline' />
          </StyledIcon>
        ),
        error: (
          <StyledIcon color='error'>
            <IconifyIcon fontSize={16} icon='mdi:close-circle-outline' />
          </StyledIcon>
        ),
      }}
      Components={{
        default: StyledNotistack,
        info: StyledNotistack,
        success: StyledNotistack,
        warning: StyledNotistack,
        error: StyledNotistack,
      }}
    >
      {children}
    </NotistackProvider>
  );
};
