export default class UserDto {
  constructor(
    public id: number,
    public email: string,
    public userName: string,
    public creationTime: string,
    public statusName: string,
    public roleName: string,
    public profilePicture: string,
  ) {}
}
