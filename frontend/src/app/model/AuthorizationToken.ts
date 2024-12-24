export default class AuthorizationToken {
  constructor(public authToken: string) {}

  public toString(): string {
    return `Bearer ${this.authToken}`;
  }

  public getHeader = () => ({ Authorization: this.toString() });
}
