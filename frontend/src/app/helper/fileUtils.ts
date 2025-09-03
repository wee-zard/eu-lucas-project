import ProcedureResultModel from "@model/ProcedureResultModel";
import { Buffer } from "buffer";
import { XMLParser } from "fast-xml-parser";
import ProcedureLogError from "@model/error/ProcedureLogError";
import { ProcedureFileMessages } from "@model/enum";

abstract class FileUtils {
  /**
   * Converts a base64string to a browser url.
   * If no base64string was provided, then a default image will be returned.
   */
  public static base64ToResourceUrl = (base64String?: string | null) => {
    if (!base64String) {
      return "";
    }

    const blob = this.base64ToBlob(base64String, ".jpg");
    return URL.createObjectURL(blob);
  };

  /**
   * Get the list of uploaded files from the fired event.
   *
   * @param event The react event that has been fired upon uploading
   * the files via a type upload input field.
   */
  public static getListOfUploadedFilesFromEvent = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): File[] => {
    const lisOfUploadedFiles = event.target.files;
    return lisOfUploadedFiles ? Object.values(lisOfUploadedFiles) : [];
  };

  /**
   * Converts a file to buffer.
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
      return parser.parse(buffer);
    } catch (error) {
      throw new ProcedureLogError(ProcedureFileMessages.XmlToObjectError);
    }
  };

  private static getMimeTypeFromFileExtension = (filename: string) => {
    const filenameChunks = filename.split(".");
    const extension = filenameChunks[filenameChunks.length - 1];

    switch (extension) {
      case "jpeg":
      case "jpg":
      case "jfif":
      case "pjpeg":
      case "pjp":
        return "image/jpeg";
      case "png":
        return "image/png";
      case "yml":
        return "application/x-yaml";
      default:
        return "text/plain";
    }
  };

  public static base64ToBlob = (base64String: string, filename: string): Blob => {
    const buffer = Buffer.from(base64String, "base64");
    return new Blob([buffer], { type: this.getMimeTypeFromFileExtension(filename) });
  };
}

export default FileUtils;
