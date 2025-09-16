import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import CircularProgressWithLabel from "./StyledCircularProgressWithLabel";
import { CircularProgressProps } from "@mui/material";

type Props = {
  size?: number;
  progress?: number;
  variant?: CircularProgressProps["variant"];
  loadingText?: string;
  styles?: {
    isBackgroundHidden?: boolean;
  };
};

const StyledCircularProgressOverlay = ({ size, progress, variant, loadingText, styles }: Props) => {
  return (
    <StyledGridOverlay $hidden={styles?.isBackgroundHidden}>
      <CircularProgressWithLabel size={size} progress={progress} variant={variant} />
      {loadingText && <Box sx={{ mt: 2 }}>{loadingText}</Box>}
    </StyledGridOverlay>
  );
};

export default StyledCircularProgressOverlay;

const StyledGridOverlay = styled("div")<{ $hidden?: boolean }>((props) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  backgroundColor: props.$hidden ? undefined : "rgba(18, 18, 18, 0.17)",
}));
