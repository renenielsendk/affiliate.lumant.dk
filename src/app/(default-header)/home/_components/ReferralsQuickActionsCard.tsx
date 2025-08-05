import { CopySignupPageButton } from '@/components/buttons/CopySignupPageButton';
import { Box, Card, CardContent, CardHeader, Stack } from '@mui/material';

export const ReferralsQuickActionsCard = async () => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title='Anbefal Lumant – og tjen penge'
        subheader='Del dit link og tjen op til 1.000 kr. pr. ny bruger, der køber et abonnement.'
      />
      <CardContent>
        <Stack spacing={3} alignItems='center'>
          <CopySignupPageButton />
        </Stack>
      </CardContent>
    </Card>
  );
};
