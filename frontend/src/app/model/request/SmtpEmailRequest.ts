import { ReportTypes } from "@model/enum";

export default class SmtpEmailRequest {
  constructor(
    /**
     * The title of the message.
     */
    public title?: string,
    /**
     * The type of the report that was sent to the server.
     */
    public reportType?: ReportTypes,
    /**
     * The main content of the report.
     */
    public message?: string
  ) {}
}

export class SmtpEmailRequestError {
  constructor(
    public title?: string,
    public reportType?: string,
    public message?: string
  ) {}
}