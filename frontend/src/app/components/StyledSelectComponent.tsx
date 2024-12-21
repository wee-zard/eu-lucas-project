import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { customScrollBar } from "app/global/globalStyles";

type Props = {
  inputTitle?: string;
  options: string[];
  isDisabled?: boolean;
  inputValue?: string;
  setValue: (value: string) => void;
};

const StyledSelectComponent = ({
  inputTitle,
  options,
  inputValue,
  isDisabled,
  setValue,
}: Props) => {
  const handleSelectionProcess = (event: any) => {
    const selectedOption = event.target.value ?? "";
    setValue(selectedOption);
  };

  const getInputValue = () => {
    return inputValue && options.includes(inputValue, 0) ? inputValue : "";
  };

  return (
    <FormControl
      fullWidth
      required
      sx={{ ".MuiInputLabel-root": { top: "-5px" } }}
    >
      <InputLabel>{inputTitle}</InputLabel>
      <StyledSelect
        value={getInputValue()}
        label={inputTitle}
        onChange={handleSelectionProcess}
        disabled={isDisabled}
      >
        {options.map((option, index) => (
          <MenuItem value={option} key={index}>
            {option}
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
};

export default StyledSelectComponent;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const BaseSelect = styled(Select)(({ theme }) => ({
  height: "40px",
  borderRadius: "12px",
}));

const StyledSelect = styled(({ className, ...props }: SelectProps) => (
  <BaseSelect {...props} MenuProps={{ PaperProps: { className } }} />
))(({ theme }) => ({
  maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
  borderRadius: "12px",
  overflow: "auto",
  overflowX: "hidden",
  ...customScrollBar(),
}));
