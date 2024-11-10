export default class AuthorizationToken {
    constructor (
        public authtoken: string
    ) {}

    public toString(): string {
        return `Bearer ${this.authtoken}`;
    }

    public getHeader = () => ({ headers: { Authorization: this.toString() }})
}