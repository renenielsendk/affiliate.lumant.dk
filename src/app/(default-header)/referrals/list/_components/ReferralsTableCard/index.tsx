import featureImage from './feature-image.png';
import { fetchReferrals } from './fetch-referrals';
import { ReferralsTable } from './ReferralsTable';
import { FeatureIntroCard } from '@/components/FeatureIntroCard';

export const ReferralsTableCard = async () => {
  const referrals = await fetchReferrals();

  if (referrals.length === 0) {
    return (
      <FeatureIntroCard
        title='Ingen affiliate-henvisninger endnu'
        description='Her kan du se alle de affiliate-henvisninger, du har oprettet. Når du inviterer instruktører, vil de blive vist her.'
        image={featureImage}
      />
    );
  }

  return <ReferralsTable referrals={referrals} />;
};
