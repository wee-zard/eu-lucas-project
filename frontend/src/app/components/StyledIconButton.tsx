import React from "react";
import Tooltip from "@mui/material/Tooltip";
import { IconButton } from "@mui/material";

type Props = {
  tooltopTitle?: string;
  buttonIcon?: JSX.Element;
  isDisabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const StyledIconButton = ({
  tooltopTitle,
  buttonIcon = <React.Fragment></React.Fragment>,
  isDisabled,
  onClick,
}: Props) => {
  return (
    <Tooltip title={tooltopTitle} placement="top">
      <IconButton onClick={onClick} disabled={isDisabled}>
        {buttonIcon}
      </IconButton>
    </Tooltip>
  );
};

export default StyledIconButton;
