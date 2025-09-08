import StyledBackdrop from "@components/progressbar/StyledBackdrop";
import { selectBackdropConfig, selectIsBackdropOpen } from "@redux/selectors/backgroundSelector";
import { useSelector } from "react-redux";

/**
 * A React component that will display a backdrop component when the state stored
 * inside the redux storage is true. The backdrop will be displayed until the
 * state inside the redux storage is not set to false.
 */
const AppBackdropCard = () => {
  const isBackdropOpen = useSelector(selectIsBackdropOpen);
  const config = useSelector(selectBackdropConfig);

  return <StyledBackdrop isBackdropOpen={isBackdropOpen} config={config} />;
};

export default AppBackdropCard;
