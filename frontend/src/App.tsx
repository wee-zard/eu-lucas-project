import { GoogleOAuthProvider } from "@react-oauth/google";
import AppRouterProvider from "./app/providers/AppRouterProvider";
import AppBackgroundProcessCard from "@cards/appCard/AppBackgroundProcessCard";

const App = () => {
  const googleOAuthProviderClientId = process.env.REACT_APP_USE_GOOGLE_OAUTH_CLIENT_ID ?? "";

  return (
    <div>
      <GoogleOAuthProvider clientId={googleOAuthProviderClientId}>
        <AppRouterProvider />
      </GoogleOAuthProvider>
      <AppBackgroundProcessCard />
    </div>
  );
};

export default App;
