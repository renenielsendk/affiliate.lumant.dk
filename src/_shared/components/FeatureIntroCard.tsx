import { Typography, Box, Stack, Card, CardContent } from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import { LinkButton } from './buttons/LinkButton';

type Props = {
  title: string;
  description: string | React.ReactElement;
  image: StaticImageData;
  callToAction?: {
    text: string;
    href: string;
    icon?: string;
    target?: string;
  };
};

export const FeatureIntroCard = ({ title, description, image, callToAction }: Props) => {
  return (
    <Card>
      <CardContent>
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
            <Stack>
              <Typography variant='h4'>{title}</Typography>

              <Typography variant='body1' sx={{ color: 'grey.400', maxWidth: '700px' }}>
                {description}
              </Typography>
            </Stack>
            {callToAction && (
              <LinkButton href={callToAction.href} icon={callToAction.icon} target={callToAction.target}>
                {callToAction.text}
              </LinkButton>
            )}
          </Stack>
        </Box>
      </CardContent>

      {image && (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Box sx={{ width: '100%', height: 'auto' }}>
            <Image
              style={{ width: '100%', height: 'auto', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
              alt={title}
              {...image}
              unoptimized
            />
          </Box>
        </Box>
      )}
    </Card>
  );
};
