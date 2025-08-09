import TemplateDialog from "@dialogs/template/TemplateDialog";
import { setFolderCreationDialogOpen } from "@redux/actions/dialogActions";
import { selectIsFolderCreationDialogOpen } from "@redux/selectors/dialogSelector";
import { useSelector, useDispatch } from "react-redux";
import FolderCreationContent from "./FolderCreationContent";
import { useEffect } from "react";
import { FormEnums } from "@model/enum";
import { setSettingBackdropOpen } from "@redux/actions/settingActions";
import { selectListOfSelectedImages } from "@redux/selectors/imageSelector";
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

type Props = {
  isEmptyFolderCreated?: boolean;
};

const FolderCreationDialog = ({ isEmptyFolderCreated = false }: Props) => {
  const cacheKey = FormEnums.FolderCreationForm;
  const eventListenerIdKey = EventListenerIdEnum.FOLDER_CREATION_DIALOG;
  const helper = useFormGroupHelper<FolderCreationFormGroup>(cacheKey, eventListenerIdKey);
  const isOpen = useSelector(selectIsFolderCreationDialogOpen);
  const listOfSelectedImages = useSelector(selectListOfSelectedImages);
  const dispatch = useDispatch();

  const handleDialogClose = () => {
    dispatch(setFolderCreationDialogOpen(false));
  };

  useEffect(() => {
    helper.remove();
  }, [helper, isOpen]);

  const handleOnSubmit = async () => {
    dispatch(setSettingBackdropOpen(true));

    if (helper.validate()) {
      dispatch(setSettingBackdropOpen(false));
      return;
    }

    const groupModel = helper.convert<FolderCreationFormGroupModel>();

    const queriedImages: FolderCreationQueriedImage[] = !isEmptyFolderCreated
      ? []
      : listOfSelectedImages.map((model) => ({
          imageIds: model.images.map((imageDtoProperties) => imageDtoProperties.image.id),
          query: model.query ?? null,
        }));

    const request: FolderCreationRequest = {
      ...groupModel,
      queriedImages: queriedImages,
    };

    try {
      await createNewFolderCommand(request);
      openSnackbar(SnackEnum.FOLDER_IS_CREATED);

      if (isEmptyFolderCreated) {
        helper.refresh(EventListenerIdEnum.PAGINATED_TABLE);
      }

      handleDialogClose();
    } catch (error) {
      helper.refresh(); // TODO: Does this needed here?
    } finally {
      dispatch(setSettingBackdropOpen(false));
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
