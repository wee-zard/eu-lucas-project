import { StyledScrollBarHolder } from "@global/globalStyles";
import FolderCreationDialogHelper from "./FolderCreationDialogHelper";
import StyledTextFieldComponent from "@components/StyledTextFieldComponent";
import { styled } from "@mui/material/styles";
import { FolderCreationFormGroup } from "@model/forms/FolderCreationFormGroup";
import { useEventListenerRender } from "@hooks/useEventListenerRender";

const FolderCreationContent = () => {
  /**
   * Updates the title of the {@link InputFormControlEntry}'s data property by the param.
   *
   * @param value The value what the user provided on the form.
   */
  const updateTitle = (value: string): void => {
    const group = FolderCreationDialogHelper.getStorageItem();
    const newGroup: FolderCreationFormGroup = {
      ...group,
      title: {
        ...group.title,
        data: value,
      },
    };

    FolderCreationDialogHelper.save(newGroup);
    FolderCreationDialogHelper.refresh();
  };

  /**
   * Updates the description of the {@link InputFormControlEntry}'s data property by the param.
   *
   * @param value The value what the user provided on the form.
   */
  const updateDescription = (value: string): void => {
    const group = FolderCreationDialogHelper.getStorageItem();
    const newGroup: FolderCreationFormGroup = {
      ...group,
      description: {
        ...group.description,
        data: value,
      },
    };

    FolderCreationDialogHelper.save(newGroup);
    FolderCreationDialogHelper.refresh();
  };

  const renderComponent = () => {
    const formGroup = FolderCreationDialogHelper.getStorageItem();
    return (
      <StyledInputHolder>
        <div className="grid-container">
          <p>
            Hozz létre egy új mappát és mentsd el ezen mappában az általad szűrt képeket. A képek
            mellé, a képekhez tartozó szűrés is eltárolásra kerül.
          </p>
          <p>
            A mappáknak lehet egy külön leírást adni, amivel megmondhatod, hogy milyen képeket
            tervezel el tárolni a mappákban.
          </p>
        </div>
        <div className="grid-gap24">
          <div className="flex-container">
            <StyledTextFieldComponent
              inputTitle={"Mappa neve"}
              inputValue={formGroup.title.data ?? ""}
              setValue={updateTitle}
              htmlInputValidation={{ ...formGroup.title.validators }}
              helperText={`Max karakterek száma: ${formGroup?.title.data?.length ?? 0}/${formGroup?.title.validators.maxLength}`}
              errorMessage={formGroup.title.error}
            />
            <StyledTextFieldComponent
              inputTitle={"Mappa leírása"}
              inputValue={formGroup.description.data ?? ""}
              setValue={updateDescription}
              htmlInputValidation={{ ...formGroup.description.validators }}
              helperText={`Max karakterek száma: ${formGroup?.description.data?.length ?? 0}/${formGroup?.description.validators.maxLength}`}
              errorMessage={formGroup.description.error}
            />
          </div>
        </div>
      </StyledInputHolder>
    );
  };

  return useEventListenerRender(FolderCreationDialogHelper.IdKey, renderComponent);
};

export default FolderCreationContent;

const StyledInputHolder = styled(StyledScrollBarHolder)({
  margin: 3,
  padding: 12,
  width: "100%",
  alignItems: "flex-start",
});
