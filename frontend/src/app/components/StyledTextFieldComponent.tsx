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
    setValue(event.target.value ?? "");
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
  }

  return (
    <CustomFormControl fullWidth required>
      <TextField
        value={inputValue}
        label={inputTitle}
        onChange={handleSelectionProcess}
        onKeyDown={handleOnKeyDown}
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
