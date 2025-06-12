import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  isBackdropOpen: boolean;
};

const StyledBackdrop = ({ isBackdropOpen }: Props) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => Math.max.apply(Math, Object.values(theme.zIndex)) + 1,
      }}
      open={isBackdropOpen}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default StyledBackdrop;
