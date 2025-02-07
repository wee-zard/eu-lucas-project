import Zoom from "@mui/material/Zoom";

type Props = {
  index: number;
  zoomIn?: boolean;
  transitionDelay?: number;
  children: JSX.Element;
};

const StyledZoomMap = ({ index, zoomIn = true, transitionDelay = 350, children }: Props) => {
  const getTransitionDelayByIndex = (delay: number) => `${delay * index}ms`;

  return (
    <Zoom
      key={index}
      in={zoomIn}
      style={{
        transitionDelay: getTransitionDelayByIndex(transitionDelay),
      }}
    >
      {children}
    </Zoom>
  );
};

export default StyledZoomMap;
