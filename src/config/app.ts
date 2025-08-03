const domainName = 'affiliate.lumant.dk';

export const APP_CONFIG = {
  NAME: 'Lumant',
  DOMAIN_NAME: domainName,
  BASE_URL:
    (process.env.NODE_ENV || process.env.VERCEL_ENV) === 'development'
      ? 'http://localhost:3100'
      : `https://app.${domainName}`,
};
