import { FormControl, InputLabel, MenuItem, Select, SelectProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { customScrollBar, StyledComponentGap } from "@global/globalStyles";

type Props = {
  inputTitle?: string;
  options: string[];
  isDisabled?: boolean;
  inputValue?: string;
  errorMessage?: string;
  setValue: (value: string) => void;
};

const StyledSelectComponent = ({
  inputTitle,
  options,
  inputValue,
  isDisabled,
  errorMessage,
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
    <FormControl fullWidth required sx={{ ".MuiInputLabel-root": { top: "-5px" } }}>
      <StyledComponentGap display={"grid"}>
        <InputLabel>{inputTitle}</InputLabel>
        <StyledSelect
          value={getInputValue()}
          label={inputTitle}
          onChange={handleSelectionProcess}
          disabled={isDisabled}
          error={!!errorMessage}
        >
          {options.map((option, index) => (
            <MenuItem value={option} key={index}>
              {option}
            </MenuItem>
          ))}
        </StyledSelect>
        {errorMessage ? <StyledErrorMessageHolder>{errorMessage}</StyledErrorMessageHolder> : null}
      </StyledComponentGap>
    </FormControl>
  );
};

export default StyledSelectComponent;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export const StyledErrorMessageHolder = styled("div")<{}>((_) => ({
  color: "red",
  fontSize: "14px",
}));

const BaseSelect = styled(Select)((_) => ({
  height: "40px",
  borderRadius: "12px",
}));

const StyledSelect = styled(({ className, ...props }: SelectProps) => (
  <BaseSelect {...props} MenuProps={{ PaperProps: { className } }} />
))((_) => ({
  maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
  borderRadius: "12px",
  overflow: "auto",
  overflowX: "hidden",
  ...customScrollBar(),
}));
