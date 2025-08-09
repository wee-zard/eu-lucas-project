export default class FolderDtoSlice {
  constructor(
    public id: number,
    public title: string,
    public ownerName: string,
    public isEditable: boolean,
    public updatedAt: string,
  ) {}
}
