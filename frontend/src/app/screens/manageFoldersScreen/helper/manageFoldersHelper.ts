import { getGenericLocalStorageItem, setLocalStorageItem } from "@helper/localStorageUtil";
import { LocalStorageKeys } from "@model/enum";
import PageableResponse from "@model/response/PageableResponse";
import { QueriedImagePropertyType } from "@model/SelectedImagesModel";
import { setFolderSelectionResponse } from "@redux/actions/folderSelectionActions";
import { Dispatch } from "redux";

const cacheKey = LocalStorageKeys.HideBoundingBoxesInsideFolder;

type FolderSelectionLocalStorageType = number[];

export const saveFolderSelectionLocalStorage = (items: FolderSelectionLocalStorageType) => {
  setLocalStorageItem(items, cacheKey);
};

export const getHiddenBoundingBoxIdsFromFolder = () => {
  return getGenericLocalStorageItem<FolderSelectionLocalStorageType>(cacheKey) ?? [];
};

export const handleFolderSelectionResponseModification = (
  res: PageableResponse<QueriedImagePropertyType>,
  dispatch: Dispatch,
) => {
  const items = getHiddenBoundingBoxIdsFromFolder();

  const modifiedRes: PageableResponse<QueriedImagePropertyType> = {
    ...res,
    content: res.content.map((content) => ({
      ...content,
      image: {
        ...content.image,
        areBoundingBoxesHidden: items.some((item) => item === content.image.id),
      },
    })),
  };

  dispatch(setFolderSelectionResponse(modifiedRes));
};
