import { styled } from "@mui/material/styles";
import { FormGroupHelper } from "@helper/formGroupHelper";
import StyledSelectComponent from "@components/StyledSelectComponent";
import i18n from "@i18n/i18nHandler";
import { ImageToFolderAdditionFormGroup } from "@model/forms/ImageToFolderAdditionFormGroup";
import { useMemo } from "react";
import FolderDtoSlice from "@model/dto/FolderDtoSlice";
import DateHelper from "@helper/dateHelper";
import ShareIcon from "@mui/icons-material/Share";
import { useEventListenerRender } from "@hooks/useEventListenerRender";

type Props = {
  helper: FormGroupHelper<ImageToFolderAdditionFormGroup>;
  folders: FolderDtoSlice[];
};

const ImageToFolderAdditionSelectOptions = ({ helper, folders }: Props) => {
  const options: string[] = useMemo(() => folders.map((folder) => folder.id.toString()), [folders]);

  const handleFolderPermissionDisplay = (folder: FolderDtoSlice): JSX.Element => {
    if (folder.isEditable === null) {
      return <>{i18n.t("screens.folders.image-to-folder-addition-dialog.permissions.owner")}</>;
    }

    return (
      <>
        <ShareIcon />
        {folder.isEditable
          ? i18n.t("screens.folders.image-to-folder-addition-dialog.permissions.read-write")
          : i18n.t("screens.folders.image-to-folder-addition-dialog.permissions.read-only")}
      </>
    );
  };

  const handleSelectOptionRender = (option: string): JSX.Element => {
    const folder = folders.find((folder) => folder.id === Number(option));

    if (!folder) {
      return <></>;
    }

    return (
      <StyledOptionWrapper>
        <StyledOptionItemWrapper>
          <StyledOptionItemHeaderWrapper>
            {i18n.t("screens.folders.image-to-folder-addition-dialog.select-input")}:
          </StyledOptionItemHeaderWrapper>
          <StyledOptionValueWrapper>{folder.title}</StyledOptionValueWrapper>
        </StyledOptionItemWrapper>
        <StyledOptionItemWrapper>
          <StyledOptionItemHeaderWrapper>
            {i18n.t("screens.folders.image-to-folder-addition-dialog.permission")}:
          </StyledOptionItemHeaderWrapper>
          <StyledOptionValueWrapper>
            {handleFolderPermissionDisplay(folder)}
          </StyledOptionValueWrapper>
        </StyledOptionItemWrapper>
        <StyledOptionItemWrapper>
          <StyledOptionItemHeaderWrapper>
            {i18n.t("screens.folders.image-to-folder-addition-dialog.lastly-edited")}:
          </StyledOptionItemHeaderWrapper>
          <StyledOptionValueWrapper>
            {DateHelper.convertISOStringToDateTimeFormat(folder.updatedAt)}
          </StyledOptionValueWrapper>
        </StyledOptionItemWrapper>
      </StyledOptionWrapper>
    );
  };

  const fetchOptionByFormGroupFolderId = (formGroup: ImageToFolderAdditionFormGroup) => {
    return folders.length === 0
      ? ""
      : options[folders.findIndex((folder) => folder.id === Number(formGroup.folder_id.data))];
  };

  const renderComponent = () => {
    const formGroup = helper.get();

    return (
      <StyledSelectComponent
        inputTitle={i18n.t("components.input-title.type1")}
        options={options}
        renderOption={handleSelectOptionRender}
        inputValue={fetchOptionByFormGroupFolderId(formGroup)}
        setValue={(_, index) =>
          helper.saveAll([
            {
              newValue: folders[index]?.id.toString(),
              propertyToUpdate: "folder_id",
            },
            {
              newValue: folders[index]?.title,
              propertyToUpdate: "folder_name",
            },
          ])
        }
        styles={{ height: 80 }}
        errorMessage={formGroup.folder_id?.error}
      />
    );
  };

  return useEventListenerRender(helper.getRefreshKey(), renderComponent);
};

export default ImageToFolderAdditionSelectOptions;

const StyledOptionWrapper = styled("div")({
  width: "100%",
});

const StyledOptionItemWrapper = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const StyledOptionValueWrapper = styled("div")({
  fontWeight: "bold",
  width: "70%",
  wordWrap: "break-word",
  display: "flex",
  gap: 8,
});

const StyledOptionItemHeaderWrapper = styled("div")({
  width: "30%",
});
