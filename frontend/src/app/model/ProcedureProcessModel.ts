import { ProcedureFileMessages } from "./enum";

export default class ProcedureProcessModel {
  constructor(
    /**
     * The file what the user uploaded.
     */
    public file: File,
    /**
     * Defines the error message of the file,
     * if something unexpected happen during the parse
     * of the xml file.
     */
    public message?: ProcedureFileMessages,
  ) {}
}
