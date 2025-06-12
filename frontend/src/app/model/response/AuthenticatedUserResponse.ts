export default class AuthenticatedUserResponse {
  constructor(
    public userId: number,
    public roleId: number,
  ) {}
}
