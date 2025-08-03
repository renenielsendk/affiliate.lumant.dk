import { Typography, Box, Stack } from '@mui/material';
import Image, { StaticImageData } from 'next/image';

type Props = {
  title: string;
  description: string | React.ReactElement;
  image: StaticImageData;
};

export const FeatureIntroBox = ({ title, description, image }: Props) => {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 4,
      }}
    >
      <Stack spacing={2} alignItems={'center'}>
        {image && <Image alt={title} {...image} unoptimized />}

        <Typography variant='h5'>{title}</Typography>

        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      </Stack>
    </Box>
  );
};
