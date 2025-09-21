import { Button, ButtonProps } from '@mui/material';
import { IconifyIcon } from '@/components/IconifyIcon';
import Link from 'next/link';

type Props = Omit<ButtonProps, 'href'> & {
  href: string;
  children: React.ReactNode;
  icon?: string;
  target?: string;
};

export const LinkButton = ({
  href,
  children,
  variant = 'contained',
  color = 'primary',
  icon,
  target = '_self',
  ...buttonProps
}: Props) => {
  return (
    <Button
      component={Link}
      {...buttonProps}
      startIcon={icon && <IconifyIcon icon={icon} />}
      variant={variant}
      color={color}
      href={href}
      target={target}
    >
      {children}
    </Button>
  );
};
