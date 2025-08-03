import { ReactNode } from 'react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { IconifyIcon } from './IconifyIcon';
import Link from 'next/link';

type Props = {
  heading?: string;
  subHeading?: string;
  actions?: ReactNode;
  backButtonRoute?: string;
  headingCaption?: string;
};

export const PageTopBar = ({ heading, subHeading, actions, backButtonRoute, headingCaption }: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: { xs: 'column', lg: 'center' },
        flexDirection: { xs: 'column', lg: 'row' },
        mb: 3,
      }}
    >
      <Box sx={{ flexGrow: 1 }} flexDirection='row' display='flex' alignItems='center'>
        {backButtonRoute && (
          <IconButton LinkComponent={Link} href={backButtonRoute} sx={{ mr: 1 }}>
            <IconifyIcon fontSize={28} color='white' icon='akar-icons:arrow-left' />
          </IconButton>
        )}
        <Stack direction='column' alignItems='start' justifyContent='start'>
          {headingCaption && (
            <Typography variant='body2' textTransform='uppercase'>
              {headingCaption}
            </Typography>
          )}
          <Typography sx={{ mb: 0 }} variant='h5' gutterBottom>
            {heading}
          </Typography>
          {subHeading && (
            <Typography sx={{ mb: 0, mt: 1 }} variant='body1' gutterBottom>
              {subHeading}
            </Typography>
          )}
        </Stack>
      </Box>

      {actions && <Box sx={{ padding: 1 }}>{actions}</Box>}
    </Box>
  );
};
