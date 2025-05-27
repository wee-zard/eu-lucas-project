import { styled } from "@mui/material";
import Slide from "@mui/material/Slide";
import Fade from "@mui/material/Fade";
import GoogleAuthCard from "./GoogleAuthCard";

const LoginScreen = () => {
  return (
    <StyledGoogleAuthHolder className="grid-container">
      <Fade in={true} mountOnEnter unmountOnExit timeout={2800}>
        <div>
          <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={900}>
            <StyledGoogleAuthCard className="grid-container">
              <GoogleAuthCard />
            </StyledGoogleAuthCard>
          </Slide>
        </div>
      </Fade>
    </StyledGoogleAuthHolder>
  );
};

export default LoginScreen;

const StyledGoogleAuthCard = styled("div")({
  height: "50vh",
  borderRadius: 4,
  padding: "32px 64px",
});

const StyledGoogleAuthHolder = styled("div")({
  height: "80vh",
  overflow: "hidden",
});
