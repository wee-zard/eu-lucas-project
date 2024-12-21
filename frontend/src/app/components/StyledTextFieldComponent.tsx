import React, { useEffect, useState } from "react";
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
  const [inputFieldValue, setInputFieldValue] = useState("");

  const handleSelectionProcess = (event: any) => {
    setInputFieldValue(event.target.value ?? "");
  };

  useEffect(() => {
    setInputFieldValue(inputValue ?? "");
  }, [inputValue])

  return (
    <CustomFormControl fullWidth required>
      <TextField
        value={inputFieldValue}
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
