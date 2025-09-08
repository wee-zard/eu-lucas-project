import {
  fetchImagesFromLocalServerCommand,
  getLocalImageServerResourcesCommand,
  getRandomImagesCommand,
} from "@api/command/imageFetcherCommands";
import StyledCheckbox from "@components/StyledCheckbox";
import StyledIconAndTooltip from "@components/StyledIconAndTooltip";
import ConfirmationDialog from "@dialogs/template/ConfirmationDialog";
import { getContentForDialogConfig } from "@helper/dialogHelper";
import { FormGroupHelper } from "@helper/formGroupHelper";
import { openSnackbar } from "@helper/notificationUtil";
import ZipHelper from "@helper/zipHelper";
import { useEventListenerRender } from "@hooks/useEventListenerRender";
import i18n from "@i18n/i18nHandler";
import { SnackEnum } from "@model/enum/SnackEnum";
import { SettingsFormGroup } from "@model/forms/SettingsFormControlGroup";
import { ConfirmationDialogConfigType } from "@model/types/ConfirmationDialogConfigType";
import { styled } from "@mui/material";
import { setBackgroundBackdropConfig } from "@redux/actions/backgroundActions";
import { useState } from "react";
import { useDispatch } from "react-redux";

const uniqueId = "localImageServerCheckbox";

const dialogConfig: ConfirmationDialogConfigType = {
  title: i18n.t("screens.settings.imageServerTitle"),
  content: getContentForDialogConfig(3, "screens.settings.imageServerContent"),
  submitButton: {
    name: i18n.t("components.button.download"),
  },
  styles: {
    isHeightDynamic: true,
  },
};

type Props = {
  helper: FormGroupHelper<SettingsFormGroup>;
};

const SettingLocalImageServer = ({ helper }: Props) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();

  /**
   * Handles the changes of the checkbox.
   *
   * @param isChecked The new value of the checkbox.
   */
  const handleLocalImageServerChange = (isChecked: boolean, isErrorMessageNull?: boolean) => {
    const errorMessage = isErrorMessageNull ? undefined : helper.get().localImageServer.error;
    helper.save(`${isChecked}`, "localImageServer", uniqueId, errorMessage);

    if (!isChecked) {
      return;
    }

    // When the checkbox is "true", then the application will try to connect to the local image server.
    handleConnectionToLocalImageServer();
  };

  /**
   * Checks whether the locally running image server is accessible by the host user.
   * If not, then display a popup about downloading the local image server.
   *
   * If accessible by a port, then validating wether the images are present on the server.
   * The method will fetch 1 random imageDto from the backend, and fetch the corresponding
   * images from the locally running server for the purpose to see if those random images
   * are there or not.
   */
  const handleConnectionToLocalImageServer = async () => {
    dispatch(setBackgroundBackdropConfig({ isBackdropOpen: true }));

    try {
      const randomPageableImageDto = await getRandomImagesCommand();

      try {
        const localImages = await fetchImagesFromLocalServerCommand({
          images: randomPageableImageDto.content,
        });

        const errorImageModel = localImages.images.find((image) => image.isError);

        if (errorImageModel) {
          helper.saveError("localImageServer", uniqueId, errorImageModel.base64String);
          handleLocalImageServerChange(false);
        } else {
          openSnackbar(SnackEnum.IMAGE_SERVER_IS_TURNED_ON);
        }
      } catch (error) {
        console.log("Error", error);
        helper.saveError(
          "localImageServer",
          uniqueId,
          i18n.t("screens.settings.imageServerNotRun"),
        );
        setDialogOpen(true);
      }
    } catch (error) {
      // Reset the checkbox due to an error from the server.
      handleLocalImageServerChange(false);
    } finally {
      dispatch(setBackgroundBackdropConfig({ isBackdropOpen: false }));
    }
  };

  /**
   * Downloads the local image server resources from the server
   * and compress them into a zip, so the user could view them.
   */
  const handleDownloadOfLocalImageServerResources = async () => {
    dispatch(setBackgroundBackdropConfig({ isBackdropOpen: true }));
    setDialogOpen(false);

    try {
      const resources = await getLocalImageServerResourcesCommand();
      await new ZipHelper(dispatch).downloadBase64Strings(resources);
    } finally {
      // Every time the download is finished (even when error is occurred), reset the checkbox.
      handleLocalImageServerChange(false);
    }
  };

  const renderComponent = () => {
    return (
      <StyledComponentsWrap>
        <StyledCheckbox
          label={i18n.t("screens.settings.imageServerCheckbox")}
          errorMessage={helper.get().localImageServer.error}
          isChecked={JSON.parse(helper.get().localImageServer.data) ?? false}
          handleChange={(isChecked: boolean) => handleLocalImageServerChange(isChecked, true)}
        />
        <StyledIconAndTooltip
          tooltip={{ title: i18n.t("screens.settings.imageServerCheckboxTooltip") }}
        />
      </StyledComponentsWrap>
    );
  };

  return (
    <>
      {useEventListenerRender(helper.getRefreshKey(), renderComponent, uniqueId)}
      <ConfirmationDialog
        isOpen={isDialogOpen}
        config={dialogConfig}
        handleOnClose={() => {
          handleLocalImageServerChange(false);
          setDialogOpen(false);
        }}
        handleOnSubmit={handleDownloadOfLocalImageServerResources}
      />
    </>
  );
};

export default SettingLocalImageServer;

const StyledComponentsWrap = styled("div")({
  display: "flex",
  gap: 8,
  alignItems: "center",
});
