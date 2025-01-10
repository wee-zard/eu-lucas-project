export default class AuthorizedUserModel {
  constructor(
    public email: string,
    public family_name: string,
    public given_name: string,
    public hd: string,
    public id: string,
    public locale: string,
    public name: string,
    public picture: string,
    public verified_email: false
  ) {}
}
