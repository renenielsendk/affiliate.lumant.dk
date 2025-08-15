import { CopyBookDemoPageButton } from '@/components/buttons/CopyBookDemoPageButton';
import { CopySignupPageButton } from '@/components/buttons/CopySignupPageButton';
import { Card, CardContent, CardHeader, Stack } from '@mui/material';

type Props = {
  businessName: string;
};

export const ReferralsQuickActionsCard = async ({ businessName }: Props) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title='Anbefal Lumant – og tjen penge'
        subheader='Del dit link og tjen op til 1.500 kr. pr. ny bruger, der køber et abonnement.'
      />
      <CardContent>
        <Stack spacing={3} alignItems='center' flexDirection='row' justifyContent='center'>
          <CopySignupPageButton />
          <CopyBookDemoPageButton businessName={businessName} />
        </Stack>
      </CardContent>
    </Card>
  );
};
