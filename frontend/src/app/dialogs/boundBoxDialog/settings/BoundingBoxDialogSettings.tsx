import StyledCheckbox from "@components/StyledCheckbox";
import { StyledComponentGap } from "@global/globalStyles";
import { getGenericLocalStorageItem, setLocalStorageItem } from "@helper/localStorageUtil";
import { LocalStorageKeys } from "@model/enum";
import { styled } from "@mui/material";
import {
  setBoundingBoxDialogColors,
  setBoundingBoxDialogPercentageDisplay,
} from "@redux/actions/boundingBoxActions";
import { selectBoundingBoxColors } from "@redux/selectors/boundingBoxSelector";
import { MuiColorInput } from "mui-color-input";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

type BoundingBoxSettingsType = {
  boxColors: {
    homogenousBoxHexColor: string;
    invasiveBoxHexColor: string;
  };
  isPercentageDisplayed: boolean;
};

const BoundingBoxDialogSettings = () => {
  const cacheKey = LocalStorageKeys.BoundingBoxSettings;
  const boxColors = useSelector(selectBoundingBoxColors);
  const dispatch = useDispatch();

  const getStorageItem = (): BoundingBoxSettingsType => {
    return (
      getGenericLocalStorageItem<BoundingBoxSettingsType>(cacheKey) ?? {
        boxColors: {
          homogenousBoxHexColor: "#fabed4",
          invasiveBoxHexColor: "#e6194B",
        },
        isPercentageDisplayed: true,
      }
    );
  };

  const setStorageItem = (item: BoundingBoxSettingsType) => {
    setLocalStorageItem(item, cacheKey);
  };

  const handleHomogenousColorUpdate = (homogenousBoxHexColor: string) => {
    const item = getStorageItem();
    const colors = {
      ...item,
      boxColors: {
        ...item.boxColors,
        homogenousBoxHexColor,
      },
    };
    setStorageItem(colors);
    dispatch(setBoundingBoxDialogColors(colors.boxColors));
  };

  const handleInvasiveColorUpdate = (invasiveBoxHexColor: string) => {
    const item = getStorageItem();
    const colors = {
      ...item,
      boxColors: {
        ...item.boxColors,
        invasiveBoxHexColor,
      },
    };
    setStorageItem(colors);
    dispatch(setBoundingBoxDialogColors(colors.boxColors));
  };

  const handlePercentageDisplayUpdate = (isChecked: boolean) => {
    setStorageItem({ ...getStorageItem(), isPercentageDisplayed: isChecked });
    dispatch(setBoundingBoxDialogPercentageDisplay(isChecked));
  };

  return (
    <StyledSettingsWrapper>
      <StyledComponentGap display={"grid"}>
        <div>Homogén befoglaló téglalapok színe</div>
        <MuiColorInput
          format="hex"
          value={boxColors.homogenousBoxHexColor}
          onChange={handleHomogenousColorUpdate}
        />
      </StyledComponentGap>
      <StyledComponentGap display={"grid"}>
        <div>Invazív befoglaló téglalapok színe</div>
        <MuiColorInput
          format="hex"
          value={boxColors.invasiveBoxHexColor}
          onChange={handleInvasiveColorUpdate}
        />
      </StyledComponentGap>
      <StyledCheckbox
        label={
          "A befoglaló téglalaphoz tartozó százalékos találatok esélye megjelenítésre kerüljön?"
        }
        isDefaultChecked
        handleChange={handlePercentageDisplayUpdate}
      />
    </StyledSettingsWrapper>
  );
};

export default BoundingBoxDialogSettings;

const StyledSettingsWrapper = styled("div")({
  padding: 8,
  gap: 48,
  display: "grid",
});
