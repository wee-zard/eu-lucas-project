import React, { useRef } from "react";
import { useCreationYearStorageInit } from "../../../../hooks/useStorageInit";
import Slider from "@mui/material/Slider";
import { Mark } from "@mui/material/Slider/useSlider.types";
import { StyledTextHolder } from "../../selectionColumn/FilterSelectionColumn";
import styled from "@emotion/styled";
import StyledButton from "../../../../components/StyledButton";
import { FilteringDialogTexts } from "../../../../model/enum";
import { StyledComponentGap } from "../../../../global/globalStyles";
import { useDispatch } from "react-redux";
import { setImageFilteringForm } from "../../../../redux/actions/imageActions";
import { useSelector } from "react-redux";
import { selectImageFilteringForm } from "../../../../redux/selectors/imageSelector";

const CreationYearsFormHeader = () => {
  const getYearsMark = (): Mark[] => {
    const filteredListOfCreationYears = listOfCreationYears.filter((yearObj) => imageFilteringForm &&
      imageFilteringForm.creationYearForm.every(
        (yearForm) => yearObj.year !== yearForm.year
      )
    );

    return filteredListOfCreationYears.map((obj, index) => ({
      value:
        filteredListOfCreationYears.length > 1
          ? (index / (filteredListOfCreationYears.length - 1)) * 100
          : 50,
      label: obj.year,
    }));
  };

  const dispatch = useDispatch();
  const sliderRef = useRef<HTMLSpanElement | null>(null);
  const imageFilteringForm = useSelector(selectImageFilteringForm);
  const listOfCreationYears = useCreationYearStorageInit();
  const yearsMark = getYearsMark();

  const handleOnClick = () => {
    const childNode = sliderRef.current?.lastChild;
    if (!childNode) {
      return;
    }
    const nodeList: any = childNode.childNodes[0];
    if (
      !nodeList &&
      !(nodeList.ariaValueNow && Number(nodeList.ariaValueNow))
    ) {
      return;
    }
    const selectedYearMark = yearsMark.find(
      (yearObj) => yearObj.value === Number(nodeList.ariaValueNow)
    );
    if (!selectedYearMark) {
      return;
    }
    const selectedCreationYear = listOfCreationYears.find(
      (yearObj) => yearObj.year === selectedYearMark.label
    );
    if (!selectedCreationYear) {
      return;
    }
    if (imageFilteringForm) {
      dispatch(
        setImageFilteringForm({
          ...imageFilteringForm,
          creationYearForm: [
            ...imageFilteringForm.creationYearForm,
            selectedCreationYear,
          ],
        })
      );
    }
  };

  return (
    <StyledFormHeaderHolder>
      <StyledSliderHolder>
        <StyledTextHolder>Kép készítés éve</StyledTextHolder>
        <CustomComponentGap>
          <Slider
            ref={sliderRef}
            defaultValue={yearsMark[0]?.value}
            step={null}
            track={false}
            marks={yearsMark}
            disabled={yearsMark.length === 0}
          />
          <StyledButtonHolder>
            <StyledButton
              buttonText={FilteringDialogTexts.AgreeButtonText}
              buttonColor="success"
              buttonVariant="outlined"
              onClick={handleOnClick}
            />
          </StyledButtonHolder>
        </CustomComponentGap>
      </StyledSliderHolder>
    </StyledFormHeaderHolder>
  );
};

export default CreationYearsFormHeader;

const CustomComponentGap = styled(StyledComponentGap)<{}>(() => ({
  gap: "32px",
  padding: "16px 0 16px 0",
}));

const StyledButtonHolder = styled.div<{}>(() => ({
  display: "flex",
  alignItems: "center",
}));

const StyledSliderHolder = styled.div<{}>(() => ({
  width: "80%",
}));

const StyledFormHeaderHolder = styled.div<{}>({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  padding: "16px 0 16px 0",
});
