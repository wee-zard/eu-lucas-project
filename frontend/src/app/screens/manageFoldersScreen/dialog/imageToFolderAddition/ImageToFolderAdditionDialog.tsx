import TemplateDialog from "@dialogs/template/TemplateDialog";
import { setImageToFolderAdditionDialogOpen } from "@redux/actions/dialogActions";
import { selectIsImageToFolderAdditionDialogOpen } from "@redux/selectors/dialogSelector";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { FormEnums } from "@model/enum";
import { setBackgroundBackdropOpen } from "@redux/actions/backgroundActions";
import { selectSelectedImagesModel } from "@redux/selectors/imageSelector";
import { openSnackbar } from "@helper/notificationUtil";
import i18n from "@i18n/i18nHandler";
import { SnackEnum } from "@model/enum/SnackEnum";
import { FolderImageAdditionRequest } from "@model/forms/FolderCreationFormGroup";
import { EventListenerIdEnum } from "@model/enum/EventListenerIdEnum";
import { useFormGroupHelper } from "@hooks/useFormGroup";
import {
  ImageToFolderAdditionFormGroup,
  ImageToFolderAdditionFormGroupModel,
} from "@model/forms/ImageToFolderAdditionFormGroup";
import ImageToFolderAdditionContent from "./ImageToFolderAdditionContent";
import { setSelectedImagesModel } from "@redux/actions/imageActions";
import { defaultSelectedImagesModel } from "@screens/filteringScreen/helper/FilteringHelper";
import { imageToFolderCommand } from "@api/command/folderContentCommands";

const ImageToFolderAdditionDialog = () => {
  const cacheKey = FormEnums.ImageToFolderAdditionForm;
  const eventListenerIdKey = EventListenerIdEnum.IMAGES_TO_FOLDER_ADDITION_DIALOG;
  const helper = useFormGroupHelper<ImageToFolderAdditionFormGroup>(cacheKey, eventListenerIdKey);
  const isOpen = useSelector(selectIsImageToFolderAdditionDialogOpen);
  const selectedImagesModel = useSelector(selectSelectedImagesModel);
  const dispatch = useDispatch();

  const handleDialogClose = () => {
    dispatch(setImageToFolderAdditionDialogOpen(false));
  };

  useEffect(() => {
    helper.remove();

    if (isOpen && selectedImagesModel.queryImages.length === 0) {
      openSnackbar(SnackEnum.NO_IMAGE_TO_ADD_TO_FOLDER);
      handleDialogClose();
      return;
    }
  }, [helper, isOpen, selectedImagesModel]);

  const handleOnSubmit = async () => {
    dispatch(setBackgroundBackdropOpen(true));

    if (helper.validate()) {
      dispatch(setBackgroundBackdropOpen(false));
      return;
    }

    const groupModel = helper.convert<ImageToFolderAdditionFormGroupModel>();

    const request: FolderImageAdditionRequest = {
      title: "",
      description: "",
      folderId: Number(groupModel.folder_id),
      queriedImages: selectedImagesModel.queryImages.map((model) => ({
        imageId: model.image.id,
        logs: model.logs.map((boxes) => ({
          logId: boxes.log.id,
          properties: Object.entries(boxes.properties).map((keyValue) => ({
            key: keyValue[0].toString(),
            value: keyValue[1].toString(),
          })),
        })),
      })),
    };

    try {
      await imageToFolderCommand(request);
      openSnackbar(SnackEnum.IMAGES_TO_FOLDER, { name: groupModel.folder_name });
      // Clear out the selected images model as it is saved inside the folder.
      dispatch(setSelectedImagesModel(defaultSelectedImagesModel));
      handleDialogClose();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setBackgroundBackdropOpen(false));
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
        text: i18n.t("components.button.cancel"),
        width: "120px",
      }}
      submitButton={{
        text: i18n.t("components.button.save"),
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
