import { Container } from '@mui/material';
import { PageTopBar } from '@/components/PageTopBar';
import { initializeLogger } from '@/libs/logger';
import { roadmapTabs } from '../_types/tabs';
import { ChangelogHistory } from './_components/ChangelogHistory';
import { NavigationTabs } from '@/components/tabs/NavigationTabs';

export const dynamic = 'force-dynamic';

export default async function Page() {
  initializeLogger({ name: 'page:/sales/subscriptions' });

  return (
    <Container>
      <PageTopBar heading='Ændringslog' />
      <NavigationTabs rootUrl={`/roadmap/changelog`} tabs={roadmapTabs} currentTab={'changelog'}>
        <ChangelogHistory />
      </NavigationTabs>
    </Container>
  );
}
