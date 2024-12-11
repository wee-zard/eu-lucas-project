package com.lucas.spring.model.request;

import com.lucas.spring.model.enums.ReportTypes;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Stores information related to the emails that we are sending
 * out to the admin about the application bugs and their details.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SmtpEmailRequest {
  /**
   * The title of the message.
   */
  private String title;
  /**
   * The type of the report that was sent to the server.
   */
  private ReportTypes reportType;
  /**
   * The reporting user.
   */
  private Long user;
  /**
   * The main content of the report.
   */
  private String message;
}
