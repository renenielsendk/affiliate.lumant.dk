'use client';

import { Icon, IconProps } from '@iconify/react';
import Box, { BoxProps } from '@mui/material/Box';
import { forwardRef } from 'react';

type IconifyProps = IconProps | string;

interface Props extends BoxProps {
  icon: IconifyProps;
  fontSize?: number;
}

export const IconifyIcon = forwardRef<SVGElement, Props>(({ icon, fontSize = 24, sx, ...other }, ref) => (
  <Box
    ref={ref}
    component={Icon}
    className='component-iconify'
    icon={icon}
    sx={{ width: `${fontSize}px`, height: `${fontSize}px`, ...sx }}
    {...other}
  />
));
