import StyledButton from "@components/StyledButton";
import i18n from "@i18n/i18nHandler";

const FilteringImageSelectionActions = () => {
  return (
    <>
      <StyledButton
        buttonText={i18n.t("screens.filtering.selection-actions.select-all-button-title")}
        tooltipTitle={i18n.t("screens.filtering.selection-actions.select-all-button-tooltip")}
        buttonVariant={"outlined"}
        onClick={() => null}
      />
      <StyledButton
        buttonText={i18n.t("screens.filtering.selection-actions.select-on-page-button-title")}
        tooltipTitle={i18n.t("screens.filtering.selection-actions.select-on-page-button-tooltip")}
        buttonVariant={"outlined"}
        onClick={() => null}
      />
    </>
  );
};

export default FilteringImageSelectionActions;
