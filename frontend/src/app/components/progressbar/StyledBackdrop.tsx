import Backdrop from "@mui/material/Backdrop";
import StyledCircularProgressOverlay from "./StyledCircularProgressOverlay";
import { BackdropConfigType } from "@model/types/BackdropConfigType";

type Props = {
  isBackdropOpen: boolean;
  config?: BackdropConfigType;
};

const StyledBackdrop = ({ isBackdropOpen, config }: Props) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => Math.max.apply(Math, Object.values(theme.zIndex)) + 1,
      }}
      open={(isBackdropOpen || config?.isBackdropOpen) ?? false}
    >
      <StyledCircularProgressOverlay
        progress={config?.progress}
        loadingText={config?.loadingText}
        styles={{ isBackgroundHidden: true }}
      />
    </Backdrop>
  );
};

export default StyledBackdrop;
