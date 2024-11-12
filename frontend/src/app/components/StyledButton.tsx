import React from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { StyledComponentGap } from "../global/globalStyles";
import styled from "@emotion/styled";

type Props = {
  tooltopTitle?: string;
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
  tooltopTitle,
  buttonText,
  buttonIcon,
  buttonVariant,
  buttonColor,
  isDisabled,
  onClick,
}: Props) => {
  return (
    <Tooltip title={tooltopTitle} placement="top">
      <CustomButtonDesign
        variant={buttonVariant}
        color={buttonColor}
        onClick={onClick}
        disabled={isDisabled}
      >
        <StyledComponentGap gap={"8px"}>
          <div style={{ display: "flex" }}>{buttonIcon}</div>
          <div>{buttonText}</div>
        </StyledComponentGap>
      </CustomButtonDesign>
    </Tooltip>
  );
};

export default StyledButton;

const CustomButtonDesign = styled(Button)<{}>((props) => ({
  borderRadius: "8px",
}));
