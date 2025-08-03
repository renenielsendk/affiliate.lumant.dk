import { Container, Grid } from '@mui/material';
import { initializeLogger } from '@/libs/logger';
import { fetchReferrals } from './_services/fetch-referrals';
import { TotalReferralsCard } from './_components/TotalReferralsCard';
import { ReferralsQuickActionsCard } from './_components/ReferralsQuickActionsCard';

export const dynamic = 'force-dynamic';

export default async function Page() {
  initializeLogger({ name: 'page:/home' });

  const referrals = await fetchReferrals();

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <TotalReferralsCard referrals={referrals} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <ReferralsQuickActionsCard />
        </Grid>
      </Grid>
    </Container>
  );
}
