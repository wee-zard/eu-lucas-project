import { AlertTitle, styled } from "@mui/material";
import Alert, { AlertColor } from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

type Props = {
  variant: "filled" | "standard" | "outlined";
  severity: AlertColor;
  message: string;
  alertTitle?: string;
};

const StyledAlert = ({ variant, severity, message, alertTitle }: Props) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <StyledAlertComponent variant={variant} severity={severity}>
        {alertTitle && <AlertTitle sx={{ fontWeight: "bold" }}>{alertTitle}</AlertTitle>}
        {message}
      </StyledAlertComponent>
    </Stack>
  );
};

export default StyledAlert;

const StyledAlertComponent = styled(Alert)({
  borderRadius: 8,
});
