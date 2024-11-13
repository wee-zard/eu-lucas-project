import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AppRouterProvider from './app/providers/AppRouterProvider';
import { NotificationsProvider } from '@toolpad/core/useNotifications';

const App = () => {
  const googleOAuthProviderClientId = process.env.REACT_APP_USE_GOOGLE_OAUT_PROVIDER_CLIENT_ID ?? "";

  return (
    <div>
      <header>
        <GoogleOAuthProvider clientId={googleOAuthProviderClientId}>
          <NotificationsProvider>
            <AppRouterProvider/>
          </NotificationsProvider>
        </GoogleOAuthProvider>
      </header>
    </div>
  );
}

export default App;
