package com.lucas.spring.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

/**
 * An entity storing the column information of the
 * Producer logs which are logs from the run Procedures.
 */
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "ProcedureLog")
@Table(name = "tb_procedure_log")
public class ProcedureLogEntity {
  /**
   * The unique identifier of the log.
   */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;
  /**
   * The procedure that was used on the image.
   */
  @ManyToOne
  @JoinColumn(name = "procedure_id", nullable = false)
  private ProcedureEntity procedure;
  /**
   * The image which was used with the procedure.
   */
  @ManyToOne
  @JoinColumn(name = "image_to_analyse", nullable = false)
  private ImageEntity image;
  /**
   * The user who created the log.
   */
  @ManyToOne
  @JoinColumn(name = "log_init_user_id", nullable = false)
  private UserEntity user;
  /**
   * The creation time of the log.
   */
  @CreationTimestamp
  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt;
}
