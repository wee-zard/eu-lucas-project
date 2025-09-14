import { StyledComponentGap } from "@global/globalStyles";
import { setLocalStorageItem } from "@helper/localStorageUtil";
import { LocalStorageKeys } from "@model/enum";
import { Divider, styled, Typography } from "@mui/material";
import { setBoundingBoxDialogColors } from "@redux/actions/boundingBoxActions";
import { selectBoundingBoxColors } from "@redux/selectors/boundingBoxSelector";
import { MuiColorInput } from "mui-color-input";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const BoundingBoxDialogSettings = () => {
  const boxColors = useSelector(selectBoundingBoxColors);
  const dispatch = useDispatch();

  const handleHomogenousColorUpdate = (homogenousBoxHexColor: string) => {
    const colors = { ...boxColors, homogenousBoxHexColor };
    setLocalStorageItem(colors, LocalStorageKeys.BoundingBoxColors);
    dispatch(setBoundingBoxDialogColors(colors));
  };

  const handleInvasiveColorUpdate = (invasiveBoxHexColor: string) => {
    const colors = { ...boxColors, invasiveBoxHexColor };
    setLocalStorageItem(colors, LocalStorageKeys.BoundingBoxColors);
    dispatch(setBoundingBoxDialogColors(colors));
  };

  return (
    <StyledSettingsWrapper>
      <StyledComponentGap display="grid">
        <Typography>Homogén befoglaló téglalapok színe</Typography>
        <MuiColorInput
          format="hex"
          value={boxColors.homogenousBoxHexColor}
          onChange={handleHomogenousColorUpdate}
        />
      </StyledComponentGap>
      <StyledDivider />
      <StyledComponentGap display="grid">
        <Typography>Invazív befoglaló téglalapok színe</Typography>
        <MuiColorInput
          format="hex"
          value={boxColors.invasiveBoxHexColor}
          onChange={handleInvasiveColorUpdate}
        />
      </StyledComponentGap>
    </StyledSettingsWrapper>
  );
};

export default BoundingBoxDialogSettings;

const StyledDivider = styled(Divider)({
  margin: "32px 0 32px 0",
});

const StyledSettingsWrapper = styled("div")({
  height: "100%",
  padding: 8,
});
