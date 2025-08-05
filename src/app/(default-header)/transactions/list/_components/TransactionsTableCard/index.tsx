import { Card, CardContent } from '@mui/material';
import featureImage from './feature-image.png';
import { fetchTransactions } from './fetch-transactions';
import { FeatureIntroBox } from '@/components/FeatureIntroBox';
import { TransactionsTable } from './TransactionsTable';

export const TransactionsTableCard = async () => {
  const transactions = await fetchTransactions();

  if (transactions.length === 0) {
    return (
      <Card>
        <CardContent>
          <FeatureIntroBox
            title='Ingen transaktioner endnu'
            description='Her kan du se alle de transaktioner, du har via Lumant.'
            image={featureImage}
          />
        </CardContent>
      </Card>
    );
  }

  return <TransactionsTable transactions={transactions} />;
};
