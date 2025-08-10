import { MenuItemType } from "@model/types/MenuItemType";
import StyledButton from "./StyledButton";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import StyledIconButton from "./StyledIconButton";

type Props = {
  options: MenuItemType[];
  buttonText?: string;
  tooltipTitle?: string;
  buttonIcon?: JSX.Element;
  isDisabled?: boolean;
};

const StyledMenuComponent = ({
  options,
  tooltipTitle,
  buttonText,
  buttonIcon,
  isDisabled,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    option: MenuItemType,
  ): void => {
    handleClose();
    option.onClick(event);
  };

  const renderButton = (): JSX.Element => {
    return buttonText ? (
      <StyledButton
        tooltipTitle={tooltipTitle}
        buttonText={buttonText}
        buttonVariant="outlined"
        buttonIcon={buttonIcon}
        isDisabled={isDisabled}
        onClick={handleClick}
      />
    ) : (
      <StyledIconButton
        tooltip={{ tooltipTitle }}
        isDisabled={isDisabled}
        buttonIcon={buttonIcon}
        onClick={handleClick}
      />
    );
  };

  return (
    <div className="flex-container">
      {renderButton()}

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {options.map((option) =>
          option.isDisplayed ? (
            <MenuItem
              key={option.menuTitle}
              onClick={(event) => handleMenuItemClick(event, option)}
              disabled={option.isDisabled}
            >
              <div className="flex-container">
                {option.icon}
                <div>{option.menuTitle}</div>
              </div>
            </MenuItem>
          ) : null,
        )}
      </Menu>
    </div>
  );
};

export default StyledMenuComponent;
