export default class UserStatusChangeRequest {
  constructor(
    /**
     * The new status of the user.
     */
    public status: number,
    /**
     * The username or full name of the user.
     */
    public username: string,
    /**
     * Url to the user's profile picture.
     */
    public imageUrl?: string,
  ) {}
}
