package com.lucas.spring.model.entity;

import com.lucas.spring.model.entity.abstraction.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;

/**
 * An entity storing the column information of the
 * Producer logs which are logs from the run Procedures.
 */
@Getter
@SuperBuilder
public class ProcedureLogEntity extends BaseEntity {
  /**
   * The procedure that was used on the image.
   */
  @ManyToOne
  @JoinColumn(name = "id", nullable = false)
  private ProcedureEntity initUserId;

  /**
   * The image which was used with the procedure.
   */
  @ManyToMany
  @JoinColumn(name = "id", nullable = false)
  private ImageEntity imageToAnalyse;

  /**
   * The user who created the log.
   */
  @ManyToMany
  @JoinColumn(name = "user_id", nullable = false)
  private UserEntity logInitUser;

  /**
   * The creation time of the log.
   */
  @CreationTimestamp
  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt;
}
