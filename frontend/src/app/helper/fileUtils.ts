import ProcedureResultModel from "@model/ProcedureResultModel";
import { Buffer } from "buffer";
import { XMLParser } from "fast-xml-parser";
import ProcedureLogError from "@model/error/ProcedureLogError";
import { ProcedureFileMessages } from "@model/enum";

abstract class FileUtils {
  /**
   * Get the list of uploaded files from the fired event.
   *
   * @param event The react event that have been fired upon uploading
   * the files via a type upload input field.
   */
  public static getListOfUploadedFilesFromEvent = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): File[] => {
    const lisOfUploadedFiles = event.target.files;
    return lisOfUploadedFiles ? Object.values(lisOfUploadedFiles) : [];
  };

  /**
   * Converts file to buffer.
   *
   * @param file The file we want to convert to buffer.
   * @returns A promise that the file is converted to a {@link Buffer}, else an undefined.
   */
  public static fileToBuffer = (file: File): Promise<Buffer> => {
    return new Promise((resolve, reject) =>
      file
        .arrayBuffer()
        .then((arrayBuffer) => resolve(Buffer.from(arrayBuffer)))
        .catch(() => reject()),
    );
  };

  public static parseBufferToModel = (buffer: Buffer): ProcedureResultModel => {
    try {
      const parser = new XMLParser();
      const result: ProcedureResultModel = parser.parse(buffer);
      return result;
    } catch (error) {
      throw new ProcedureLogError(ProcedureFileMessages.XmlToObjectError);
    }
  };
}

export default FileUtils;
