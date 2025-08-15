import { AlertTitle } from "@mui/material";
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
      <Alert variant={variant} severity={severity}>
        {alertTitle && <AlertTitle sx={{ fontWeight: "bold" }}>{alertTitle}</AlertTitle>}
        {message}
      </Alert>
    </Stack>
  );
};

export default StyledAlert;
