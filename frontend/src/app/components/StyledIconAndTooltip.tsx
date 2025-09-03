import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";

type Props = {
  tooltip?: {
    title?: string;
    placement?: any;
  };
  icon?: JSX.Element;
};

const StyledIconAndTooltip = ({
  tooltip = {
    placement: "top",
  },
  icon,
}: Props) => {
  return (
    <Tooltip title={tooltip?.title ?? ""} placement={tooltip.placement}>
      <span>{icon ?? <InfoIcon />}</span>
    </Tooltip>
  );
};

export default StyledIconAndTooltip;
