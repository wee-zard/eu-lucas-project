import React from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { StyledComponentGap } from "@global/globalStyles";
import styled from "@emotion/styled";
import { ButtonVariantType } from "@model/types/ButtonVariantType";
import { ButtonColorType } from "@model/types/ButtonColorType";

type Props = {
  tooltipTitle?: string;
  buttonText: string;
  buttonIcon?: JSX.Element;
  buttonVariant?: ButtonVariantType;
  buttonColor?: ButtonColorType;
  isDisabled?: boolean;
  buttonType?: "button" | "submit" | "reset" | undefined;
  applyStyle?: {
    buttonWidth?: string;
  };
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const StyledButton = ({
  tooltipTitle,
  buttonText,
  buttonIcon,
  buttonVariant,
  buttonColor,
  isDisabled,
  buttonType,
  applyStyle,
  onClick,
}: Props) => {
  return (
    <Tooltip title={tooltipTitle} placement="top">
      <span>
        <CustomButtonDesign
          variant={buttonVariant}
          color={buttonColor}
          onClick={(event) => (!isDisabled ? onClick(event) : null)}
          disabled={isDisabled}
          type={buttonType}
          button_width={applyStyle?.buttonWidth}
        >
          <CustomComponentGap>
            {buttonIcon ? <StyledIconHolder>{buttonIcon}</StyledIconHolder> : null}
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
}));

const StyledIconHolder = styled.div<{}>(() => ({
  display: "flex",
  svg: {
    width: 22,
    height: 22,
  },
}));

const CustomButtonDesign = styled(Button)<{ button_width?: string }>((props) => ({
  borderRadius: "8px",
  height: "40px",
  width: props.button_width ?? undefined,
}));
