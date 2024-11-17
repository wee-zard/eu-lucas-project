import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AppRouterProvider from './app/providers/AppRouterProvider';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const googleOAuthProviderClientId = process.env.REACT_APP_USE_GOOGLE_OAUT_PROVIDER_CLIENT_ID ?? "";

  return (
    <div>
      <header>
        <GoogleOAuthProvider clientId={googleOAuthProviderClientId}>
          <AppRouterProvider/>
        </GoogleOAuthProvider>
      </header>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={false}
        theme={"light"} 
      />
    </div>
  );
}

export default App;
