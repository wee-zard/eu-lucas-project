import { MenuActions, SelectedImageActionTooltipTitles } from "@model/enum";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ImageSearchOutlinedIcon from "@mui/icons-material/ImageSearchOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { setSelectedImage } from "@redux/actions/imageActions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBackgroundBackdropConfig } from "@redux/actions/backgroundActions";
import i18n from "@i18n/i18nHandler";
import ImageAndPaginationCardRoot from "@cards/imageAndPaginationCard/ImageAndPaginationCardRoot";
import PageableProperties from "@model/PageableProperties";
import { defaultPaginationModel } from "@screens/filteringScreen/helper/FilteringHelper";
import {
  deleteFolderContentCommand,
  getFolderContentByFolderIdCommand,
} from "@api/command/folderContentCommands";
import { selectFolderSelectionStorage } from "@redux/selectors/folderSelectionSelectors";
import {
  getHiddenBoundingBoxIdsFromFolder,
  handleFolderSelectionResponseModification,
  saveFolderSelectionLocalStorage,
} from "@screens/manageFoldersScreen/helper/manageFoldersHelper";
import { SelectedImageAction } from "@model/types/SelectedImageActionType";
import ImageDto from "@model/dto/ImageDto";
import { setBoundingBoxDialogToOpen } from "@redux/actions/boundingBoxActions";
import { setProcedureLogSelectedProcedureLogs } from "@redux/actions/procedureLogActions";
import {
  setFolderSelectionMenuAction,
  setFolderSelectionResponse,
} from "@redux/actions/folderSelectionActions";

const contentTextObj = {
  emptyContentText: i18n.t("screens.filtering.empty-body"),
  nullResultContentText: i18n.t("screens.filtering.filtering-no-content"),
};

const FolderSelectionTableCard = () => {
  const [pageable, setPageable] = useState<PageableProperties>(defaultPaginationModel);
  const { folder, response, menuAction } = useSelector(selectFolderSelectionStorage);
  const imageActionsObj: SelectedImageAction[] = [
    {
      icon: <DeleteForeverOutlinedIcon color={"error"} />,
      tooltipTitle: i18n.t(SelectedImageActionTooltipTitles.Delete),
      onClick: async (imageDto: ImageDto) => {
        try {
          if (!folder) {
            return;
          }

          dispatch(setBackgroundBackdropConfig({ isBackdropOpen: true }));
          await deleteFolderContentCommand(folder.id, imageDto.id);
          handleMenuActionChange(MenuActions.PAGINATION_CHANGE);
        } catch (error) {
          dispatch(setBackgroundBackdropConfig({ isBackdropOpen: false }));
        }
      },
    },
    {
      icon: <VisibilityOffIcon />,
      tooltipTitle: i18n.t(SelectedImageActionTooltipTitles.Hide),
      onClick: (imageDto: ImageDto) => {
        if (!response) {
          return;
        }

        const items = getHiddenBoundingBoxIdsFromFolder();

        saveFolderSelectionLocalStorage(
          items.includes(imageDto.id)
            ? items.filter((item) => item !== imageDto.id)
            : [...items, imageDto.id],
        );

        handleFolderSelectionResponseModification(response, dispatch);
      },
    },
    {
      icon: <ImageSearchOutlinedIcon />,
      tooltipTitle: i18n.t(SelectedImageActionTooltipTitles.Search),
      onClick: (imageDto: ImageDto) => {
        if (!response) {
          return;
        }

        dispatch(setBoundingBoxDialogToOpen(true));
        dispatch(setSelectedImage(imageDto));
        dispatch(
          setProcedureLogSelectedProcedureLogs(
            response.content.find((property) => property.image.id === imageDto.id)?.logs ?? [],
          ),
        );
      },
    },
  ];
  const dispatch = useDispatch();

  useEffect(() => {
    handleFetchOfImages();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuAction, pageable, folder]);

  const handleFetchOfImages = () => {
    if (menuAction !== MenuActions.PAGINATION_CHANGE || !folder) {
      return;
    }

    dispatch(setBackgroundBackdropConfig({ isBackdropOpen: true }));
    dispatch(setFolderSelectionResponse(undefined));
    getFolderContentByFolderIdCommand(folder.id, pageable)
      .then((res) => {
        handleFolderSelectionResponseModification(res, dispatch);
      })
      .finally(() => {
        handleMenuActionChange(undefined);
        dispatch(setBackgroundBackdropConfig({ isBackdropOpen: false }));
      });
  };

  const handleMenuActionChange = (menuAction?: MenuActions) => {
    dispatch(setFolderSelectionMenuAction(menuAction));
  };

  return (
    <ImageAndPaginationCardRoot
      content={contentTextObj}
      pageableResponse={response}
      imageActions={imageActionsObj}
      setPageable={setPageable}
      setMenuAction={handleMenuActionChange}
      handleClickOnRippleImage={() => null}
      isRippleDisabled
    />
  );
};

export default FolderSelectionTableCard;
