export default class AuthorizationModel {
  constructor(
    public access_token: string,
    public expires_in: number,
    public id_token: string,
    public refresh_token: string,
    public scope: string,
    public token_type: string
  ) {}
}
