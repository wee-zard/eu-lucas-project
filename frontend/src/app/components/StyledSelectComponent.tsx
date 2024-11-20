import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

type Props = {
  inputTitle?: string;
  options: string[];
  inputValue?: string;
  setValue: (value: string) => void;
};

const StyledSelectComponent = ({
  inputTitle,
  options,
  inputValue,
  setValue,
}: Props) => {
  const handleSelectionProcess = (event: any) => {
    const selectedOption = event.target.value ?? "";
    setValue(selectedOption);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };

  const getInputValue = () => {
    return inputValue && options.includes(inputValue, 0) ? inputValue : "";
  }

  return (
    <FormControl fullWidth>
      <InputLabel>{inputTitle}</InputLabel>
      <Select 
        value={getInputValue()} 
        label={inputTitle}
        MenuProps={MenuProps}
        onChange={handleSelectionProcess}
      >
        {options.map((option, index) => (
          <MenuItem
            value={option}
            key={index}
          >
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default StyledSelectComponent;
