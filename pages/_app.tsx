import { AuthProvider } from '@services/Auth.context';
import { GlobalMessagingProvider } from '@services/GlobalMessaging.context';
import type { AppProps } from 'next/app';

import '../styles/index.css';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <AuthProvider>
      <GlobalMessagingProvider>
        <Component {...pageProps} />
      </GlobalMessagingProvider>
    </AuthProvider>
  );
};
export default MyApp;
