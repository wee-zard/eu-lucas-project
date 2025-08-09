import { FormGroupHelper } from "@helper/formGroupHelper";
import { ImageToFolderAdditionFormGroup } from "@model/forms/ImageToFolderAdditionFormGroup";
import { useEffect, useState } from "react";
import FolderDtoSlice from "@model/dto/FolderDtoSlice";
import { getOwnedAndSharedFoldersCommand } from "@api/command/folderCommands";
import ImageToFolderAdditionSelectOptions from "./ImageToFolderAdditionSelectOptions";

type Props = {
  helper: FormGroupHelper<ImageToFolderAdditionFormGroup>;
};

const ImageToFolderAdditionContent = ({ helper }: Props) => {
  const [folders, setFolders] = useState<FolderDtoSlice[]>([]);

  useEffect(() => {
    getOwnedAndSharedFoldersCommand().then((res) => {
      setFolders(res);
    });
  }, []);

  return (
    folders.length > 0 && <ImageToFolderAdditionSelectOptions helper={helper} folders={folders} />
  );
};

export default ImageToFolderAdditionContent;
