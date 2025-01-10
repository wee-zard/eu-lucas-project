import React from "react";
import { FormControl, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { StyledErrorMessageHolder } from "./StyledSelectComponent";
import { StyledComponentGap } from "@global/globalStyles";

type Props = {
  inputTitle?: string;
  inputValue?: string;
  isMultilineActive?: boolean;
  multilineRows?: number;
  helperText?: string;
  errorMessage?: string;
  setValue: (value: string) => void;
};

const StyledTextFieldComponent = ({
  inputTitle,
  inputValue,
  isMultilineActive,
  multilineRows,
  helperText,
  errorMessage,
  setValue,
}: Props) => {
  const handleSelectionProcess = (event: any) => {
    setValue(event.target.value ?? "");
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  return (
    <CustomFormControl
      fullWidth
      required
      $isMultilineActive={isMultilineActive}
    >
      <StyledComponentGap display={"grid"}>
        <TextField
          value={inputValue}
          label={inputTitle}
          onChange={handleSelectionProcess}
          onKeyDown={handleOnKeyDown}
          helperText={helperText}
          multiline={isMultilineActive}
          rows={multilineRows}
          error={!!errorMessage}
          required
        />
        {errorMessage ? (
          <StyledErrorMessageHolder>{errorMessage}</StyledErrorMessageHolder>
        ) : null}
      </StyledComponentGap>
    </CustomFormControl>
  );
};

export default StyledTextFieldComponent;

const CustomFormControl = styled(FormControl)<{ $isMultilineActive?: boolean }>(
  (props) => ({
    "& .MuiFormLabel-root": {
      top: "-5px",
    },
    "& .MuiInputBase-root": {
      height: props.$isMultilineActive ? undefined : "40px",
    },
    fieldset: {
      borderRadius: "12px",
      height: props.$isMultilineActive ? undefined : "45px",
    },
  })
);
