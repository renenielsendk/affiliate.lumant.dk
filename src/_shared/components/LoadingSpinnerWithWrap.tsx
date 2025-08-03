'use client';

import { CircularProgress, styled } from '@mui/material';

const LoadingSpinnerWrapper = styled('div')(() => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  zIndex: 999,
  left: 0,
  top: 0,
  background: 'transparent',
}));

const LoadingSpinnerInnerWrap = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
}));

export default function LoadingSpinnerWithWrap() {
  return (
    <LoadingSpinnerWrapper>
      <LoadingSpinnerInnerWrap>
        <CircularProgress size={20} />
      </LoadingSpinnerInnerWrap>
    </LoadingSpinnerWrapper>
  );
}
