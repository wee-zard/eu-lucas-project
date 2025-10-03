package com.lucas.spring.components.report.model.entity;

import com.lucas.spring.commons.model.entity.AuditedEntity;
import com.lucas.spring.components.user.model.entity.UserEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * Entity for the uploaded reports.
 */
@ToString
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "Report")
@Table(name = "tb_report")
public class ReportEntity extends AuditedEntity {
  public static final int REPORT_TYPE_MAX_LENGTH = 100;
  public static final int REPORT_TITLE_MAX_LENGTH = 200;
  public static final int REPORT_DESCRIPTION_MAX_LENGTH = 4000;

  /**
   * The type of the report.
   */
  @Column(name = "type", nullable = false, length = REPORT_TYPE_MAX_LENGTH)
  private String type;

  /**
   * The title of the report.
   */
  @Column(name = "title", nullable = false, length = REPORT_TITLE_MAX_LENGTH)
  private String title;

  /**
   * The title of the report.
   */
  @Column(name = "description", nullable = false, length = REPORT_DESCRIPTION_MAX_LENGTH)
  private String description;

  /**
   * The user who created the report.
   */
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private UserEntity reporter;

  /**
   * The status of the uploaded report.
   */
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "status", nullable = false)
  private ReportStatusEntity status;
}