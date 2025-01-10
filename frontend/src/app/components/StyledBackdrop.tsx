import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  isBackdropOpen: boolean;
};

const StyledBackdrop = ({ isBackdropOpen }: Props) => {
  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={isBackdropOpen}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default StyledBackdrop;
