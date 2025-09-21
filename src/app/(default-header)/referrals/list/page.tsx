import { Button, Container, Link, Stack } from '@mui/material';
import { initializeLogger } from '@/libs/logger';
import { ReferralsTableCard } from './_components/ReferralsTableCard';
import { PageTopBar } from '@/components/PageTopBar';
import { CopySignupPageButton } from '@/components/buttons/CopySignupPageButton';

export const dynamic = 'force-dynamic';

export default async function Page() {
  initializeLogger({ name: 'page:/home' });

  return (
    <Container>
      <PageTopBar
        heading='Henvisninger'
        actions={
          <Stack direction='row' spacing={2}>
            <Button variant='contained' color='primary' component={Link} href='/referrals/links'>
              Opret henvisningslink
            </Button>
            <Button disabled variant='contained'>
              Inviter (Kommer snart)
            </Button>
          </Stack>
        }
      />
      <ReferralsTableCard />
    </Container>
  );
}
