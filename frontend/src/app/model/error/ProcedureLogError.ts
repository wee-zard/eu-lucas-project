export default class ProcedureLogError extends Error {
  obj?: {};

  constructor(message: string, obj?: {}) {
    super(message);
    this.obj = obj;
  }
}
