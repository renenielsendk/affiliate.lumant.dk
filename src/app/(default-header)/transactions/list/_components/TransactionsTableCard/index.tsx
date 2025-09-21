import featureImage from './feature-image.png';
import { fetchTransactions } from './fetch-transactions';
import { FeatureIntroCard } from '@/components/FeatureIntroCard';
import { TransactionsTable } from './TransactionsTable';

export const TransactionsTableCard = async () => {
  const transactions = await fetchTransactions();

  if (transactions.length === 0) {
    return (
      <FeatureIntroCard
        title='Ingen transaktioner endnu'
        description='Her kan du se alle de transaktioner, du har via Lumant.'
        image={featureImage}
      />
    );
  }

  return <TransactionsTable transactions={transactions} />;
};
