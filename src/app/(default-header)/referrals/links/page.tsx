import { Container, Stack } from '@mui/material';
import { initializeLogger } from '@/libs/logger';
import { PageTopBar } from '@/components/PageTopBar';
import { CreateLinkButton } from './_components/CreateLinkButton';
import { fetchAffiliate } from './_services/fetch-affiliate';
import { fetchAffiliateLinks } from './_services/fetch-affiliate-links';
import { LinksTableCard } from './_components/LinksTableCard';

export const dynamic = 'force-dynamic';

export default async function Page() {
  initializeLogger({ name: 'page:/home' });

  const [affiliate, affiliateLinks] = await Promise.all([fetchAffiliate(), fetchAffiliateLinks()]);

  return (
    <Container>
      <PageTopBar
        heading='Henvisningslinks'
        actions={
          <Stack direction='row' spacing={2}>
            <CreateLinkButton affiliateName={affiliate.businessInfo.name} totalLinks={affiliateLinks.length} />
          </Stack>
        }
      />
      <LinksTableCard affiliateLinks={affiliateLinks} />
    </Container>
  );
}
