import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

type Props = {
  inputTitle?: string;
  options?: string[];
  inputValue?: string;
  setValue: (value: string) => void;
};

const StyledSelectComponent = ({
  inputTitle = "Age",
  options = [],
  inputValue = "",
  setValue,
}: Props) => {

  const [componentValue, setComponentValue] = useState("");

  const handleSelectionProcess = (event: any) => {
    const selectedOption = event.target.value ?? "";
    setValue(selectedOption);
    setComponentValue(selectedOption);
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

  useEffect(() => {
    setComponentValue(inputValue);
  }, [inputValue])

  return (
    <FormControl fullWidth>
      <InputLabel>{inputTitle}</InputLabel>
      <Select 
        value={componentValue} 
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
