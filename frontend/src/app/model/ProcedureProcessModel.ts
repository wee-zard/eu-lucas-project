import { ProcedureFileMessages } from "./enum";

export default class ProcedureProcessModel {
  constructor(
    /**
     * The name of the file what the user uploaded.
     */
    public filename: string,
    /**
     * Defines the error message of the file,
     * if something unexpected happen during the parse
     * of the xml file.
     */
    public message?: ProcedureFileMessages,
    public options?: {},
  ) {}
}
