import { IconifyIcon } from '@/components/IconifyIcon';
import { Button, Card, CardContent, CardHeader, Stack } from '@mui/material';
import Link from 'next/link';

export const ReferralsQuickActionsCard = async () => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title='Anbefal Lumant – og tjen penge'
        subheader='Del dine links og tjen op til 1.500 kr. pr. ny bruger, der køber et abonnement.'
      />
      <CardContent>
        <Stack spacing={3} alignItems='center' flexDirection='row' justifyContent='center'>
          <Button
            variant='contained'
            startIcon={<IconifyIcon icon='mdi:share' />}
            LinkComponent={Link}
            href='/referrals/links'
            sx={{ maxWidth: '200px', width: '100%' }}
            color='primary'
          >
            Del nu
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
