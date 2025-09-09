import TemplateDialog from "@dialogs/template/TemplateDialog";
import { useSelector, useDispatch } from "react-redux";
import FolderCreationContent from "./FolderCreationContent";
import { useEffect } from "react";
import { FormEnums } from "@model/enum";
import { setBackgroundBackdropOpen } from "@redux/actions/backgroundActions";
import { selectSelectedImagesModel } from "@redux/selectors/imageSelector";
import { openSnackbar } from "@helper/notificationUtil";
import i18n from "@i18n/i18nHandler";
import { SnackEnum } from "@model/enum/SnackEnum";
import {
  FolderCreationFormGroup,
  FolderCreationFormGroupModel,
  FolderCreationQueriedImage,
  FolderCreationRequest,
} from "@model/forms/FolderCreationFormGroup";
import { createNewFolderCommand } from "@api/command/folderCommands";
import { EventListenerIdEnum } from "@model/enum/EventListenerIdEnum";
import { useFormGroupHelper } from "@hooks/useFormGroup";
import { selectIsFolderCreationDialogOpen } from "@redux/selectors/folderCreationSelector";
import { setFolderCreationDialogToOpen } from "@redux/actions/folderCreationActions";
import { setSelectedImagesModel } from "@redux/actions/imageActions";
import { defaultSelectedImagesModel } from "@screens/filteringScreen/helper/FilteringHelper";

type Props = {
  isEmptyFolderCreated?: boolean;
};

const FolderCreationDialog = ({ isEmptyFolderCreated = false }: Props) => {
  const cacheKey = FormEnums.FolderCreationForm;
  const eventListenerIdKey = EventListenerIdEnum.FOLDER_CREATION_DIALOG;
  const helper = useFormGroupHelper<FolderCreationFormGroup>(cacheKey, eventListenerIdKey);
  const isOpen = useSelector(selectIsFolderCreationDialogOpen);
  const selectedImagesModel = useSelector(selectSelectedImagesModel);
  const dispatch = useDispatch();

  console.log("[FolderCreationDialog]: is rendered");

  const handleDialogClose = () => {
    dispatch(setFolderCreationDialogToOpen(false));
  };

  useEffect(() => {
    helper.remove();
  }, [helper, isOpen]);

  const handleOnSubmit = async () => {
    dispatch(setBackgroundBackdropOpen(true));

    if (helper.validate()) {
      dispatch(setBackgroundBackdropOpen(false));
      return;
    }

    const queriedImages: FolderCreationQueriedImage[] = isEmptyFolderCreated
      ? []
      : selectedImagesModel.queryImages.map((model) => ({
          imageId: model.image.id,
          logs: model.boundingBoxes.map((boxes) => ({
            logId: boxes.log.id,
            properties: boxes.properties,
          })),
        }));

    const request: FolderCreationRequest = {
      ...helper.convert<FolderCreationFormGroupModel>(),
      queriedImages: queriedImages,
    };

    try {
      await createNewFolderCommand(request);
      openSnackbar(SnackEnum.FOLDER_IS_CREATED);

      if (isEmptyFolderCreated) {
        helper.refresh(EventListenerIdEnum.PAGINATED_TABLE);
      } else {
        // Clear out the selected images model as it is saved inside the folder.
        dispatch(setSelectedImagesModel(defaultSelectedImagesModel));
      }

      handleDialogClose();
    } catch (error) {
      helper.refresh(); // TODO: Does this needed here?
    } finally {
      dispatch(setBackgroundBackdropOpen(false));
    }
  };

  return (
    <TemplateDialog
      content={
        <FolderCreationContent helper={helper} isEmptyFolderCreated={isEmptyFolderCreated} />
      }
      isOpen={isOpen}
      dialogTitle={
        isEmptyFolderCreated
          ? i18n.t("screens.folders.creation-dialog.dialog-title.empty-folder")
          : i18n.t("screens.folders.creation-dialog.dialog-title.folder")
      }
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
      onClose={() => handleDialogClose()}
      onSubmit={handleOnSubmit}
    />
  );
};

export default FolderCreationDialog;
