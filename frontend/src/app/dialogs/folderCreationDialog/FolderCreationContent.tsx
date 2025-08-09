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
};

const FolderCreationContent = ({ helper, isEmptyFolderCreated }: Props) => {
  const handleMaxCharacterHelper = (length: number, maxLength: number) => {
    return i18n.t("screens.components.helper-text-max-characters", { length, maxLength });
  };

  const renderComponent = () => {
    const formGroup = helper.get();

    return (
      <StyledInputHolder className="grid-container">
        <div className="grid-container">
          <p>
            {i18n.t(`screens.folders.creation-dialog.content.type${isEmptyFolderCreated ? 1 : 2}`)}
          </p>
        </div>
        <div className="grid-gap24">
          <div className="flex-container">
            <StyledTextFieldComponent
              inputTitle={i18n.t("components.input-title.type1")}
              inputValue={formGroup.title.data ?? ""}
              setValue={(value) => helper.save(value, "title")}
              htmlInputValidation={{ ...formGroup.title.validators }}
              helperText={handleMaxCharacterHelper(
                formGroup?.title.data?.length ?? 0,
                formGroup?.title.validators.maxLength ?? 0,
              )}
              errorMessage={formGroup.title.error}
            />
            <StyledTextFieldComponent
              inputTitle={i18n.t("components.input-title.type2")}
              inputValue={formGroup.description.data ?? ""}
              setValue={(value) => helper.save(value, "description")}
              htmlInputValidation={{ ...formGroup.description.validators }}
              helperText={handleMaxCharacterHelper(
                formGroup?.description.data?.length ?? 0,
                formGroup?.description.validators.maxLength ?? 0,
              )}
              errorMessage={formGroup.description.error}
            />
          </div>
        </div>
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
  alignItems: "flex-start",
});
