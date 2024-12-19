import React from "react";
import Tooltip from "@mui/material/Tooltip";
import { IconButton } from "@mui/material";

type Props = {
  tooltip?: {
    tooltipTitle?: string;
    tooltipPlacement?: "top" | "bottom-end" | "bottom-start" | "bottom" | "left-end" | "left-start" | "left" | "right-end" | "right-start" | "right" | "top-end" | "top-start" | undefined;
  }
  buttonIcon?: JSX.Element;
  isDisabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const StyledIconButton = ({
  tooltip = {
    tooltipPlacement: "top",
  },
  buttonIcon = <React.Fragment></React.Fragment>,
  isDisabled,
  onClick,
}: Props) => {
  return (
    <Tooltip title={tooltip.tooltipTitle} placement={tooltip.tooltipPlacement}>
      <span>
        <IconButton onClick={onClick} disabled={isDisabled}>
          {buttonIcon}
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default StyledIconButton;
