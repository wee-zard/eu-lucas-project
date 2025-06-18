export type MenuItemType = {
  icon: JSX.Element;
  menuTitle: string;
  isDisabled?: boolean;
  color?: string;
  isDisplayed?: boolean;
  onClick: (obj?: any) => void;
};
