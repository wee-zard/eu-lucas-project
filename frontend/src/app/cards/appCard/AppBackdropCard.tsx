import StyledBackdrop from "@components/StyledBackdrop";
import { selectIsBackdropOpen } from "@redux/selectors/settingSelector";
import { useSelector } from "react-redux";

/**
 * A React component that will display a backdrop component when the state stored
 * inside the redux storage is true. The backdrop will be displayed until the
 * state inside the redux storage is not set to false.
 */
const AppBackdropCard = () => {
  const isBackdropOpen = useSelector(selectIsBackdropOpen);

  return <StyledBackdrop isBackdropOpen={isBackdropOpen} />;
};

export default AppBackdropCard;
