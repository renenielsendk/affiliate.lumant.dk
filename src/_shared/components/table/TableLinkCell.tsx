import { TableCell, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { IconifyIcon } from '../IconifyIcon';

type Props = {
  href: string;
  text?: string;
  subText?: string;
};

export const LinkTableCell = ({ href, text, subText }: Props) => {
  return (
    <TableCell
      align='left'
      sx={{
        '&:hover': {
          '& .MuiTypography-root': {
            textDecoration: 'underline',
          },
          cursor: 'pointer',
        },
      }}
    >
      <Link href={href} style={{ textDecoration: 'none' }}>
        <Stack sx={{ '&:hover': { textDecoration: 'underline', textDecorationColor: 'white' } }}>
          <Stack direction='row' alignItems='center' spacing={1}>
            {text && (
              <Typography color='white' variant='body2' fontWeight={700}>
                {text}
              </Typography>
            )}
            <IconifyIcon
              icon='mdi:external-link'
              fontSize={14}
              sx={{
                color: 'text.secondary',
                display: { xs: 'none', sm: 'block' },
              }}
            />
          </Stack>

          {subText && (
            <Typography color='text.secondary' variant='body2' fontWeight={700}>
              {subText}
            </Typography>
          )}
        </Stack>
      </Link>
    </TableCell>
  );
};
