import { ButtonColorType } from "@model/types/ButtonColorType";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { StyledErrorMessageHolder } from "./StyledSelectComponent";

type Props = {
  label: string;
  errorMessage?: string;
  color?: ButtonColorType;
  size?: number;
  isRequired?: boolean;
  isDefaultChecked?: boolean;
  isDisabled?: boolean;
  isIntermediate?: boolean;
  isChecked?: boolean;
  handleChange: (isChecked: boolean) => void;
};

const StyledCheckbox = ({
  label,
  errorMessage,
  color = "primary",
  size = 28,
  isRequired,
  isDefaultChecked,
  isDisabled,
  isIntermediate,
  isChecked,
  handleChange,
}: Props) => {
  const handleComponentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event.target.checked);
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            required={isRequired}
            defaultChecked={isDefaultChecked}
            disabled={isDisabled}
            indeterminate={isIntermediate}
            onChange={handleComponentChange}
            checked={isChecked}
            sx={{
              color: color,
              "& .MuiSvgIcon-root": { fontSize: size },
              "& .Mui-checked": { color: color },
            }}
          />
        }
        label={label}
        color={color}
      />
      {errorMessage ? <StyledErrorMessageHolder>{errorMessage}</StyledErrorMessageHolder> : null}
    </FormGroup>
  );
};

export default StyledCheckbox;
