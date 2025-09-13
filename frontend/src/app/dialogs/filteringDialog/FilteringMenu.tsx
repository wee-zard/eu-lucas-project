import { useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import StyledIconButton from "@components/StyledIconButton";
import styled from "@emotion/styled";
import FilteringMenuDialog from "./FilteringMenuDialog";

const FilteringMenu = () => {
  console.log("[FilteringMenu]: RENDERED");

  const [isOpen, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <StyledIconButton onClick={handleClick} buttonIcon={<FilterListIcon />} />
      <FilteringMenuDialog isOpen={isOpen} handleClose={handleClose} />
    </div>
  );
};

export default FilteringMenu;

export const StyledInputHolder = styled.div<{ $elementWidth?: string }>((props) => ({
  width: props.$elementWidth ?? "100%",
}));
