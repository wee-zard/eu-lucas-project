import { StyledScrollBarHolder } from "@global/globalStyles";
import StyledTextFieldComponent from "@components/StyledTextFieldComponent";
import { styled } from "@mui/material/styles";
import { useEventListenerRender } from "@hooks/useEventListenerRender";
import { FormGroupHelper } from "@helper/formGroupHelper";
import { FolderCreationFormGroup } from "@model/forms/FolderCreationFormGroup";

type Props = {
  helper: FormGroupHelper<FolderCreationFormGroup>;
  isEmptyFolderCreated?: boolean;
};

const FolderCreationContent = ({ helper, isEmptyFolderCreated }: Props) => {
  const renderComponent = () => {
    const formGroup = helper.get();

    return (
      <StyledInputHolder className="grid-container">
        <div className="grid-container">
          {isEmptyFolderCreated ? (
            <p>
              Hozz létre egy új mappát és mentsd el az általad kiválasztott képeket a különböző
              szűrési feltételek alapján. A képek mellé a képekhez tartozó szűrés is, illetve a
              legutoljára kiválasztott befoglaló téglalapok is eltárolásra kerülnek.
            </p>
          ) : (
            <p>
              Hozz létre egy új üres mappát, amiben a későbbiekben eltárolhatod az általad
              kiválasztott képeket a különböző szűrési feltételek alapján. A képek mellé a képekhez
              tartozó szűrés is, illetve a legutoljára kiválasztott befoglaló téglalapok is
              eltárolásra kerülnek.
            </p>
          )}
        </div>
        <div className="grid-gap24">
          <div className="flex-container">
            <StyledTextFieldComponent
              inputTitle={"Mappa neve"}
              inputValue={formGroup.title.data ?? ""}
              setValue={(value) => helper.save(formGroup, value, "title")}
              htmlInputValidation={{ ...formGroup.title.validators }}
              helperText={`Max karakterek száma: ${formGroup?.title.data?.length ?? 0}/${formGroup?.title.validators.maxLength}`}
              errorMessage={formGroup.title.error}
            />
            <StyledTextFieldComponent
              inputTitle={"Mappa leírása"}
              inputValue={formGroup.description.data ?? ""}
              setValue={(value) => helper.save(formGroup, value, "description")}
              htmlInputValidation={{ ...formGroup.description.validators }}
              helperText={`Max karakterek száma: ${formGroup?.description.data?.length ?? 0}/${formGroup?.description.validators.maxLength}`}
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
