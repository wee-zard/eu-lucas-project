import { getLocalStorageItem } from "@helper/localStorageUtil";
import { LocalStorageKeys } from "@model/enum";
import Box from "@mui/material/Box";
import CircularProgress, { CircularProgressProps } from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

type Props = {
  size?: number;
  progress?: number;
  variant?: CircularProgressProps["variant"];
};

const CircularProgressWithLabel = ({ size = 64, progress, variant = "indeterminate" }: Props) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress size={size} variant={variant} color="inherit" />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color={getLocalStorageItem(LocalStorageKeys.ToolPadMode) === "dark" ? "white" : "black"}
        >
          {progress ? `${Math.round(progress)}%` : ""}
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularProgressWithLabel;
