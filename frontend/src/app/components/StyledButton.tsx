import React from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { StyledComponentGap } from "../global/globalStyles";
import styled from "@emotion/styled";

type Props = {
  tooltipTitle?: string;
  buttonText: string;
  buttonIcon?: JSX.Element;
  buttonVariant?: "text" | "outlined" | "contained";
  buttonColor?:
    | "inherit"
    | "error"
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "warning";
  isDisabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const StyledButton = ({
  tooltipTitle,
  buttonText,
  buttonIcon,
  buttonVariant,
  buttonColor,
  isDisabled,
  onClick,
}: Props) => {
  return (
    <Tooltip title={tooltipTitle} placement="top">
      <span>
        <CustomButtonDesign
          variant={buttonVariant}
          color={buttonColor}
          onClick={onClick}
          disabled={isDisabled}
          type="submit"
        >
          <CustomComponentGap>
            { buttonIcon ? <StyledIconHolder>{buttonIcon}</StyledIconHolder> : null }
            <div>{buttonText}</div>
          </CustomComponentGap>
        </CustomButtonDesign>
      </span>
    </Tooltip>
  );
};

export default StyledButton;

const CustomComponentGap = styled(StyledComponentGap)<{}>(() => ({
  gap: "8px",
  padding: "8px",
}))

const StyledIconHolder = styled.div<{}>(() => ({
  display: "flex"
}));

const CustomButtonDesign = styled(Button)<{}>(() => ({
  borderRadius: "8px",
  height: "40px",
}));
