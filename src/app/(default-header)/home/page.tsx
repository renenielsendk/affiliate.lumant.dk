import { Container, Grid2 as Grid } from '@mui/material';
import { initializeLogger } from '@/libs/logger';
import { fetchReferrals } from './_services/fetch-referrals';
import { fetchTransactions } from './_services/fetch-transactions';
import { ReferralsQuickActionsCard } from './_components/ReferralsQuickActionsCard';
import { HistoricReferralsChartCard } from './_components/HistoricReferralsChartCard';
import { TotalConvertedReferralsCard } from './_components/TotalConvertedReferralsCard';
import { TotalTrialsReferralsCard } from './_components/TotalTrialsReferralsCard';
import { HistoricRevenueChartCard } from './_components/HistoricRevenueChartCard';
import { TotalRevenueReferralsCard } from './_components/TotalRevenueReferralsCard';

export const dynamic = 'force-dynamic';

export default async function Page() {
  initializeLogger({ name: 'page:/home' });

  const [referrals, transactions] = await Promise.all([fetchReferrals(), fetchTransactions()]);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <ReferralsQuickActionsCard />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TotalConvertedReferralsCard referrals={referrals} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TotalTrialsReferralsCard referrals={referrals} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TotalRevenueReferralsCard transactions={transactions} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <HistoricReferralsChartCard referrals={referrals} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <HistoricRevenueChartCard transactions={transactions} />
        </Grid>
      </Grid>
    </Container>
  );
}
