import { Card, CardContent } from '@mui/material';
import featureImage from './feature-image.png';
import { fetchReferrals } from './fetch-referrals';
import { FeatureIntroBox } from '@/components/FeatureIntroBox';
import { ReferralsTable } from './ReferralsTable';

export const ReferralsTableCard = async () => {
  const referrals = await fetchReferrals();

  if (referrals.length === 0) {
    return (
      <Card>
        <CardContent>
          <FeatureIntroBox
            title='Ingen affiliate-henvisninger endnu'
            description='Her kan du se alle de affiliate-henvisninger, du har oprettet. Når du inviterer instruktører, vil de blive vist her.'
            image={featureImage}
          />
        </CardContent>
      </Card>
    );
  }

  return <ReferralsTable referrals={referrals} />;
};
