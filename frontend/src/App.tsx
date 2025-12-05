import { GoogleOAuthProvider } from "@react-oauth/google";
import AppRouterProvider from "@providers/AppRouterProvider";
import AppBackgroundProcessCard from "@cards/appCard/AppBackgroundProcessCard";
import { styled } from "@mui/material";

const App = () => {
  const googleOAuthProviderClientId = process.env.REACT_APP_USE_GOOGLE_OAUTH_CLIENT_ID ?? "";

  return (
    <StyledRootAppHolder>
      <GoogleOAuthProvider clientId={googleOAuthProviderClientId}>
        <AppRouterProvider />
      </GoogleOAuthProvider>
      <AppBackgroundProcessCard />
    </StyledRootAppHolder>
  );
};

export default App;

const StyledRootAppHolder = styled("div")({
  display: "flex",
  padding: "0px 5px",
});
