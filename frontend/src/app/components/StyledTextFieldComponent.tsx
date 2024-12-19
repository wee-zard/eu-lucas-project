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
  };

  return (
    <CustomFormControl fullWidth required>
      <TextField
        value={getInputValue()}
        label={inputTitle}
        onChange={handleSelectionProcess}
        required
      />
    </CustomFormControl>
  );
};

export default StyledTextFieldComponent;

const CustomFormControl = styled(FormControl)<{}>((props) => ({
  "& .MuiFormLabel-root": {
    top: "-5px",
  },
  "& .MuiInputBase-root": {
    height: "40px",
  },
  "fieldset": {
    borderRadius: "12px",
    height: "45px",
  }
}));
