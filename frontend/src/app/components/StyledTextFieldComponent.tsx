import React from "react";
import { FormControl, TextField } from "@mui/material";

type Props = {
  inputTitle?: string;
  inputValue?: string;
  setValue: (value: string) => void;
};

const StyledTextFieldComponent = ({
  inputTitle,
  inputValue,
  setValue,
}: Props) => {
  const handleSelectionProcess = (event: any) => {
    const selectedOption = event.target.value ?? "";
    setValue(selectedOption);
  };

  const getInputValue = () => {
    return inputValue ?? "";
  }

  return (
    <FormControl fullWidth>
      <TextField 
        value={getInputValue()} 
        label={inputTitle}
        onChange={handleSelectionProcess}
        required
      />
    </FormControl>
  );
};

export default StyledTextFieldComponent;
