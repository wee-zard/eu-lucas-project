import React from "react";
import { FormControl, TextField } from "@mui/material";
import styled from "@emotion/styled";

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
    <FormControl fullWidth sx={{ 
      ".MuiInputBase-root": { 
        height: "40px",
        top: "5px"
      }}}
    >
      <StyledSelectHolder 
        value={getInputValue()} 
        label={inputTitle}
        onChange={handleSelectionProcess}
        required
      />
    </FormControl>
  );
};

export default StyledTextFieldComponent;

const StyledSelectHolder = styled(TextField)<{}>((props) => ({
  height: "40px",
}));

