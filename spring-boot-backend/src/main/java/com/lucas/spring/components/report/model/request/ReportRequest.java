package com.lucas.spring.components.report.model.request;

import com.lucas.spring.components.email.enums.ReportTypes;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import static com.lucas.spring.components.report.model.entity.ReportEntity.REPORT_TITLE_MAX_LENGTH;
import static com.lucas.spring.components.report.model.entity.ReportEntity.REPORT_TYPE_MAX_LENGTH;
import static com.lucas.spring.components.report.model.entity.ReportEntity.REPORT_DESCRIPTION_MAX_LENGTH;

/**
 * Stores information related to the emails that we are sending
 * out to the admin about the application bugs and their details.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReportRequest {
  /**
   * The title of the message.
   */
  @NotNull
  @Length(max = REPORT_TITLE_MAX_LENGTH)
  private String title;
  /**
   * The type of the report that was sent to the server.
   */
  @NotNull
  @Length(max = REPORT_TYPE_MAX_LENGTH)
  private ReportTypes reportType;
  /**
   * The main content of the report.
   */
  @NotNull
  @Length(max = REPORT_DESCRIPTION_MAX_LENGTH)
  private String message;
}
