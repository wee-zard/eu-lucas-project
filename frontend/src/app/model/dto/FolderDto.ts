export default class FolderDto {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public folderContentSize: number,
    public createdAt: string,
    public updatedAt: string,
  ) {}
}
