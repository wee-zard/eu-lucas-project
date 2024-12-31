export default class RequestCommandError extends Error {
  constructor(message: string) {
    super(message);
  }
}
