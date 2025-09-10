import TemplateDialog from "@dialogs/template/TemplateDialog";
import { useSelector, useDispatch } from "react-redux";
import FolderCreationContent from "./FolderCreationContent";
import { setBackgroundBackdropOpen } from "@redux/actions/backgroundActions";
import { selectSelectedImagesModel } from "@redux/selectors/imageSelector";
import { openSnackbar } from "@helper/notificationUtil";
import i18n from "@i18n/i18nHandler";
import { SnackEnum } from "@model/enum/SnackEnum";
import {
  FolderCreationFormGroupModel,
  FolderCreationQueriedImage,
  FolderCreationRequest,
  FolderUpdateRequest,
} from "@model/forms/FolderCreationFormGroup";
import { createNewFolderCommand, updateFolderCommand } from "@api/command/folderCommands";
import { EventListenerIdEnum } from "@model/enum/EventListenerIdEnum";
import { getGenericFormGroupHelper } from "@hooks/useFormGroup";
import { selectFolderCreationDialogStorage } from "@redux/selectors/folderCreationSelector";
import { setFolderCreationDialogToOpen } from "@redux/actions/folderCreationActions";
import { setSelectedImagesModel } from "@redux/actions/imageActions";
import { defaultSelectedImagesModel } from "@screens/filteringScreen/helper/FilteringHelper";
import { FormGroupHelperEnum } from "@model/enum/FormGroupHelperEnum";

const FolderCreationDialog = () => {
  const helper = getGenericFormGroupHelper(FormGroupHelperEnum.FOLDER_CREATION_FORM_GROUP);
  const selectedImagesModel = useSelector(selectSelectedImagesModel);
  const { isOpen, selectedFolderId, isEmptyFolderCreated } = useSelector(
    selectFolderCreationDialogStorage,
  );
  const dispatch = useDispatch();

  const handleDialogClose = () => {
    dispatch(setFolderCreationDialogToOpen(false));
    helper.remove();
  };

  const handleOnSubmit = async () => {
    dispatch(setBackgroundBackdropOpen(true));

    if (helper.validate()) {
      dispatch(setBackgroundBackdropOpen(false));
      return;
    }

    try {
      if (!selectedFolderId) {
        await handleNonEditModeSubmit();
      } else {
        await handleEditModeSubmit(selectedFolderId);
      }

      handleDialogClose();
    } catch (error) {
      helper.refresh(); // TODO: Does this needed here?
    } finally {
      dispatch(setBackgroundBackdropOpen(false));
    }
  };

  const handleNonEditModeSubmit = async () => {
    const queriedImages: FolderCreationQueriedImage[] = isEmptyFolderCreated
      ? []
      : selectedImagesModel.queryImages.map((model) => ({
          imageId: model.image.id,
          logs: model.boundingBoxes.map((boxes) => ({
            logId: boxes.log.id,
            properties: Object.entries(boxes.properties).map((keyValue) => ({
              key: keyValue[0].toString(),
              value: keyValue[1].toString(),
            })),
          })),
        }));

    const request: FolderCreationRequest = {
      ...helper.convert<FolderCreationFormGroupModel>(),
      queriedImages: queriedImages,
    };

    await createNewFolderCommand(request);
    openSnackbar(SnackEnum.FOLDER_IS_CREATED);

    if (isEmptyFolderCreated) {
      helper.refresh(EventListenerIdEnum.PAGINATED_TABLE);
    } else {
      // Clear out the selected images model as it is saved inside the folder.
      dispatch(setSelectedImagesModel(defaultSelectedImagesModel));
    }
  };

  const handleEditModeSubmit = async (folderId: number) => {
    const request: FolderUpdateRequest = {
      ...helper.convert<FolderCreationFormGroupModel>(),
      folderId,
    };

    await updateFolderCommand(request);
    openSnackbar(SnackEnum.FOLDER_IS_UPDATED);
    helper.refresh(EventListenerIdEnum.PAGINATED_TABLE);
  };

  return (
    <TemplateDialog
      content={
        <FolderCreationContent
          helper={helper}
          isEmptyFolderCreated={isEmptyFolderCreated}
          selectedFolderId={selectedFolderId}
        />
      }
      isOpen={isOpen}
      dialogTitle={
        selectedFolderId
          ? i18n.t("screens.folders.creation-dialog.dialog-title.edit")
          : isEmptyFolderCreated
            ? i18n.t("screens.folders.creation-dialog.dialog-title.empty-folder")
            : i18n.t("screens.folders.creation-dialog.dialog-title.folder")
      }
      cancelButton={{
        text: i18n.t("components.button.cancel"),
        width: "120px",
      }}
      submitButton={{
        text: selectedFolderId
          ? i18n.t("components.button.modify")
          : i18n.t("components.button.create"),
        width: "120px",
      }}
      height={"65%"}
      width={"65%"}
      onClose={() => handleDialogClose()}
      onSubmit={handleOnSubmit}
    />
  );
};

export default FolderCreationDialog;
