import { ClerkProvider, SignedIn } from '@clerk/nextjs';
import { Nunito } from 'next/font/google';
import NextJSTopLoader from 'nextjs-toploader';
import ThemeProvider from '../theme';
import { daDK } from '@clerk/localizations';
import './globals.css';
import { SnackbarProvider } from '@/providers/SnackbarProvider';
import Script from 'next/script';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { IntercomChat } from './_components/Intercom';
dayjs.extend(isSameOrBefore);
require('dayjs/locale/da');
dayjs.locale('da');

const nunito = Nunito({ subsets: ['latin'] });

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <Script defer data-domain='lumant.dk' src='https://plausible.io/js/plausible.js' />

      <body className={`${nunito.className} min-h-screen overflow-hidden`}>
        <NextJSTopLoader showSpinner={false} />
        <ClerkProvider localization={daDK}>
          <ThemeProvider>
            <SnackbarProvider>
              <SignedIn>
                <IntercomChat />
                {children}
              </SignedIn>
            </SnackbarProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
