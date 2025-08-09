import TemplateDialog from "@dialogs/template/TemplateDialog";
import { setImageToFolderAdditionDialogOpen } from "@redux/actions/dialogActions";
import { selectIsImageToFolderAdditionDialogOpen } from "@redux/selectors/dialogSelector";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { FormEnums } from "@model/enum";
import { setSettingBackdropOpen } from "@redux/actions/settingActions";
import { selectListOfSelectedImages } from "@redux/selectors/imageSelector";
import { openSnackbar } from "@helper/notificationUtil";
import i18n from "@i18n/i18nHandler";
import { SnackEnum } from "@model/enum/SnackEnum";
import {
  FolderCreationQueriedImage,
  FolderCreationRequest,
} from "@model/forms/FolderCreationFormGroup";
import { createNewFolderCommand } from "@api/command/folderCommands";
import { EventListenerIdEnum } from "@model/enum/EventListenerIdEnum";
import { useFormGroupHelper } from "@hooks/useFormGroup";
import {
  ImageToFolderAdditionFormGroup,
  ImageToFolderAdditionFormGroupModel,
} from "@model/forms/ImageToFolderAdditionFormGroup";
import ImageToFolderAdditionContent from "./ImageToFolderAdditionContent";

const ImageToFolderAdditionDialog = () => {
  const cacheKey = FormEnums.ImageToFolderAdditionForm;
  const eventListenerIdKey = EventListenerIdEnum.IMAGES_TO_FOLDER_ADDITION_DIALOG;
  const helper = useFormGroupHelper<ImageToFolderAdditionFormGroup>(cacheKey, eventListenerIdKey);
  const isOpen = useSelector(selectIsImageToFolderAdditionDialogOpen);
  const listOfSelectedImages = useSelector(selectListOfSelectedImages);
  const dispatch = useDispatch();

  const handleDialogClose = () => {
    dispatch(setImageToFolderAdditionDialogOpen(false));
  };

  useEffect(() => {
    helper.remove();

    if (isOpen && listOfSelectedImages.length === 0) {
      openSnackbar(SnackEnum.NO_IMAGE_TO_ADD_TO_FOLDER);
      handleDialogClose();
      return;
    }
  }, [helper, isOpen, listOfSelectedImages]);

  const handleOnSubmit = async () => {
    dispatch(setSettingBackdropOpen(true));

    if (helper.validate()) {
      dispatch(setSettingBackdropOpen(false));
      return;
    }

    const groupModel = helper.convert<ImageToFolderAdditionFormGroupModel>();

    const queriedImages: FolderCreationQueriedImage[] = listOfSelectedImages.map((model) => ({
      imageIds: model.images.map((imageDtoProperties) => imageDtoProperties.image.id),
      query: model.query ?? null,
    }));

    const request: FolderCreationRequest = {
      title: "",
      description: "",
      folderId: Number(groupModel.folder_id),
      queriedImages: queriedImages,
    };

    try {
      await createNewFolderCommand(request);
      openSnackbar(SnackEnum.IMAGES_TO_FOLDER, { name: groupModel.folder_name });
      handleDialogClose();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setSettingBackdropOpen(false));
    }
  };

  return (
    <TemplateDialog
      content={
        <div className="grid-gap24">
          <p>{i18n.t("screens.folders.image-to-folder-addition-dialog.content")}</p>
          <ImageToFolderAdditionContent helper={helper} />
        </div>
      }
      isOpen={isOpen}
      dialogTitle={i18n.t("screens.folders.image-to-folder-addition-dialog.dialog-title")}
      cancelButton={{
        text: i18n.t("screens.folders.creation-dialog.buttons.cancel"),
        width: "120px",
      }}
      submitButton={{
        text: i18n.t("screens.folders.creation-dialog.buttons.submit"),
        width: "120px",
      }}
      height={"65%"}
      width={"65%"}
      onClose={handleDialogClose}
      onSubmit={handleOnSubmit}
    />
  );
};

export default ImageToFolderAdditionDialog;
