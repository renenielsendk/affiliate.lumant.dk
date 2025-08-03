import { CopySignupPageButton } from '@/components/buttons/CopySignupPageButton';
import { Box, Card, CardContent, CardHeader, Stack } from '@mui/material';

export const ReferralsQuickActionsCard = async () => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title='Hurtige handlinger' />
      <CardContent>
        <Stack spacing={3} alignItems='center'>
          <CopySignupPageButton />
        </Stack>
      </CardContent>
    </Card>
  );
};
