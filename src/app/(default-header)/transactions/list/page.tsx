import { Alert, Button, Container, Stack } from '@mui/material';
import { initializeLogger } from '@/libs/logger';
import { PageTopBar } from '@/components/PageTopBar';
import { TransactionsTableCard } from './_components/TransactionsTableCard';

export const dynamic = 'force-dynamic';

export default async function Page() {
  initializeLogger({ name: 'page:/home' });

  return (
    <Container>
      <PageTopBar
        heading='Transaktioner'
        actions={
          <Stack direction='row' spacing={2}>
            <Button disabled variant='contained'>
              Udbetal (Kommer snart)
            </Button>
          </Stack>
        }
      />
      <Stack spacing={3}>
        <Alert severity='info'>
          Udbetalinger kan ske tidligst 7 dage efter en konvertering – dette er for at tage højde for eventuelle
          refunderinger.
        </Alert>
        <Alert severity='info'>
          Automatisk udbetaling er på vej. Indtil da skal du kontakte os, hvis du ønsker at få dine optjente beløb
          udbetalt.
        </Alert>
        <TransactionsTableCard />
      </Stack>
    </Container>
  );
}
