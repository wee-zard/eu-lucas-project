import React, { InputHTMLAttributes } from "react";
import { FormControl, InputAdornment, styled, TextField } from "@mui/material";
import { StyledErrorMessageHolder } from "./StyledSelectComponent";

type Props = {
  inputTitle?: string;
  inputValue?: string;
  isMultilineActive?: boolean;
  multilineRows?: number;
  helperText?: string;
  errorMessage?: string;
  inputAdornment?: {
    position: "end" | "start";
    icon: JSX.Element;
  };
  htmlInputValidation?: InputHTMLAttributes<HTMLInputElement>;
  setValue: (value: string) => void;
};

const StyledTextFieldComponent = ({
  inputTitle,
  inputValue,
  isMultilineActive = false,
  multilineRows,
  helperText,
  errorMessage,
  inputAdornment,
  htmlInputValidation,
  setValue,
}: Props) => {
  const handleSelectionProcess = (event: any) => {
    setValue(event.target.value ?? "");
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  return (
    <CustomFormControl fullWidth required is_multiline_active={+isMultilineActive}>
      <div style={{ display: "grid" }}>
        <TextField
          value={inputValue}
          label={inputTitle}
          onChange={handleSelectionProcess}
          onKeyDown={handleOnKeyDown}
          helperText={helperText}
          multiline={isMultilineActive}
          rows={multilineRows}
          error={!!errorMessage}
          slotProps={{
            htmlInput: {
              required: htmlInputValidation?.required,
              maxLength: htmlInputValidation?.maxLength,
            },
            input: {
              endAdornment: inputAdornment ? (
                <InputAdornment position={inputAdornment.position}>
                  {inputAdornment.icon}
                </InputAdornment>
              ) : null,
            },
          }}
          required
        />
        {errorMessage ? <StyledErrorMessageHolder>{errorMessage}</StyledErrorMessageHolder> : null}
      </div>
    </CustomFormControl>
  );
};

export default StyledTextFieldComponent;

const CustomFormControl = styled(FormControl)<{ is_multiline_active?: number }>((props) => ({
  "& .MuiFormLabel-root": {
    top: "-5px",
  },
  "& .MuiInputBase-root": {
    height: props.is_multiline_active ? undefined : "40px",
  },
  fieldset: {
    borderRadius: "12px",
    height: props.is_multiline_active ? undefined : "45px",
  },
}));
