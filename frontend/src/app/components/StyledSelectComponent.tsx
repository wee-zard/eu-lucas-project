import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { customScrollBar, StyledComponentGap } from "@global/globalStyles";

type Props = {
  inputTitle?: string;
  options: string[];
  isDisabled?: boolean;
  inputValue?: string;
  errorMessage?: string;
  icon?: JSX.Element;
  styles?: {
    height?: number;
    isBorderLeftStyled?: boolean;
  };
  renderOption?: (option: string) => JSX.Element;
  setValue: (value: string, index: number) => void;
};

const StyledSelectComponent = ({
  icon,
  inputTitle,
  options,
  inputValue,
  isDisabled,
  errorMessage,
  styles = {},
  renderOption,
  setValue,
}: Props) => {
  const handleSelectionProcess = (event: SelectChangeEvent) => {
    const selectedOption = event.target.value ?? "";
    const index = options.findIndex((option) => option === selectedOption);
    setValue(selectedOption, index);
  };

  const getInputValue = () => {
    return inputValue && options.includes(inputValue, 0) ? inputValue : "";
  };

  const getInputIcon = (): JSX.Element | null => {
    return icon ? <StyledIconWrapper>{icon}</StyledIconWrapper> : null;
  };

  const getInputTitle = (): JSX.Element | null => {
    return inputTitle ? <InputLabel>{inputTitle}</InputLabel> : null;
  };

  const getSelectOption = (option: string): JSX.Element => {
    return !renderOption ? <>{option}</> : renderOption(option);
  };

  return (
    <FormControl
      fullWidth
      required
      sx={{
        ".MuiInputLabel-root": { top: "-5px" },
        fieldset: {
          backgroundColor: isDisabled ? "rgba(0, 0, 0, 0.2)" : undefined,
          borderLeft: styles?.isBorderLeftStyled ? "4px solid white" : undefined,
        },
      }}
    >
      <StyledComponentGap display={"grid"}>
        {getInputTitle()}
        <StyledSelect
          value={getInputValue()}
          label={inputTitle}
          onChange={(event: any) => handleSelectionProcess(event)}
          disabled={isDisabled}
          error={!!errorMessage}
          $height={styles?.height}
        >
          {options.map((option, index) => (
            <MenuItem value={option} key={index}>
              {getSelectOption(option)}
            </MenuItem>
          ))}
        </StyledSelect>
        {getInputIcon()}
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
  fontSize: 14,
}));

const StyledIconWrapper = styled("span")({
  position: "absolute",
  top: 8,
  left: 8,
});

const BaseSelect = styled(Select)<{ $height?: number }>((props) => ({
  height: props.$height ?? 40,
  borderRadius: 12,
}));

const StyledSelect = styled(({ className, ...props }: SelectProps) => (
  <BaseSelect {...props} MenuProps={{ PaperProps: { className } }} />
))<{ $height?: number }>((_) => ({
  maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
  borderRadius: 12,
  overflow: "auto",
  overflowX: "hidden",
  ...customScrollBar(),
}));
