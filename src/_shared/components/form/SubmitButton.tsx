'use client';

import { useFormContext } from '@/providers/FormProvider';
import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';
import { CircularProgress } from '@mui/material';
import { IconifyIcon } from '@/components/IconifyIcon';

interface Props extends LoadingButtonProps {
  children: React.ReactNode;
  color?: 'primary' | 'error';
  startIcon?: string;
  icon?: string;
}

export const SubmitButton = ({
  children,
  color = 'primary',
  icon = 'mdi:content-save-outline',
  ...buttonProps
}: Props) => {
  const { formContext } = useFormContext();

  const {
    formState: { isSubmitting },
  } = formContext;

  return (
    <LoadingButton
      color={color}
      disabled={isSubmitting}
      type='submit'
      variant='contained'
      startIcon={
        isSubmitting ? (
          <CircularProgress size={18} color='inherit' />
        ) : icon ? (
          <IconifyIcon icon={icon} fontSize={18} />
        ) : null
      }
      {...buttonProps}
    >
      {children}
    </LoadingButton>
  );
};
