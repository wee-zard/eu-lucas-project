import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";

type Props = {
  tooltip?: {
    title?: string | JSX.Element;
    placement?: any;
  };
  icon?: JSX.Element;
};

const StyledIconAndTooltip = ({ tooltip, icon }: Props) => {
  return (
    <Tooltip title={tooltip?.title ?? ""} placement={tooltip?.placement ?? "top"}>
      <span>{icon ?? <InfoIcon />}</span>
    </Tooltip>
  );
};

export default StyledIconAndTooltip;
