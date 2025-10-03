package com.lucas.spring.components.report.model.entity;

import com.lucas.spring.commons.model.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * Entity for the uploaded report's status.
 */
@ToString
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "ReportStatus")
@Table(name = "tb_report_status")
public class ReportStatusEntity extends BaseEntity {

  /**
   * Sets the id of the report by the provided param.
   *
   * @param id The id of the report.
   */
  public ReportStatusEntity(Long id) {
    setId(id);
  }

  /**
   * The status of the uploaded reports.
   */
  @Column(name = "status", nullable = false, length = 20)
  private String status;
}
