export default class FolderDtoSlice {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public ownerName: string,
    public folderContentSize: number,
    public isEditable: boolean,
    public updatedAt: string,
    public createdAt: string,
  ) {}
}
