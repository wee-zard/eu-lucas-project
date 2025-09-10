import { StyledScrollBarHolder } from "@global/globalStyles";
import StyledTextFieldComponent from "@components/StyledTextFieldComponent";
import { styled } from "@mui/material/styles";
import { useEventListenerRender } from "@hooks/useEventListenerRender";
import { FormGroupHelper } from "@helper/formGroupHelper";
import { FolderCreationFormGroup } from "@model/forms/FolderCreationFormGroup";
import i18n from "@i18n/i18nHandler";

type Props = {
  helper: FormGroupHelper<FolderCreationFormGroup>;
  isEmptyFolderCreated?: boolean;
  selectedFolderId?: number;
};

const FolderCreationContent = ({ helper, isEmptyFolderCreated, selectedFolderId }: Props) => {
  const translatePrefix = "screens.folders.creation-dialog.content.type";

  const handleMaxCharacterHelper = (
    formGroup: FolderCreationFormGroup,
    element: keyof FolderCreationFormGroup,
  ) => {
    return i18n.t("components.helper-text.max-characters", {
      length: formGroup[element].data?.length ?? 0,
      maxLength: formGroup[element].validators?.maxLength ?? 0,
    });
  };

  const renderComponent = () => {
    const formGroup = helper.get();

    return (
      <StyledInputHolder>
        <StyledContentMessageWrapper className="grid-container">
          <p>
            {i18n.t(`${translatePrefix}${selectedFolderId ? 3 : isEmptyFolderCreated ? 1 : 2}`)}
          </p>
        </StyledContentMessageWrapper>
        <StyledFormWrapper className="grid-gap24">
          <div className="flex-container">
            <StyledTextFieldComponent
              inputTitle={i18n.t("components.input-title.type1")}
              inputValue={formGroup.title.data ?? ""}
              setValue={(value) => helper.save(value, "title")}
              htmlInputValidation={{ ...formGroup.title.validators }}
              helperText={handleMaxCharacterHelper(formGroup, "title")}
              errorMessage={formGroup.title.error}
            />
            <StyledTextFieldComponent
              inputTitle={i18n.t("components.input-title.type2")}
              inputValue={formGroup.description.data ?? ""}
              setValue={(value) => helper.save(value, "description")}
              htmlInputValidation={{ ...formGroup.description.validators }}
              helperText={handleMaxCharacterHelper(formGroup, "description")}
              errorMessage={formGroup.description.error}
            />
          </div>
        </StyledFormWrapper>
      </StyledInputHolder>
    );
  };

  return useEventListenerRender(helper.getRefreshKey(), renderComponent);
};

export default FolderCreationContent;

const StyledInputHolder = styled(StyledScrollBarHolder)({
  margin: 3,
  padding: 12,
  width: "100%",
  height: "90%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "flex-start",
});

const StyledContentMessageWrapper = styled("div")({
  height: "100%",
});

const StyledFormWrapper = styled("div")({
  width: "100%",
});
