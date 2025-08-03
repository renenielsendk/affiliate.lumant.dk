export type AuthUser = {
  id: string;
  firstName?: string | null;
  email: string;
  affiliate: {
    id: string;
    referralCode: string;
  };
};
