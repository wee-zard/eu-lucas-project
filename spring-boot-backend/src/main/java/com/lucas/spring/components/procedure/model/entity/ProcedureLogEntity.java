package com.lucas.spring.components.procedure.model.entity;

import com.lucas.spring.commons.model.entity.BaseEntity;
import com.lucas.spring.components.folder.model.entity.FolderContentEntity;
import com.lucas.spring.components.image.model.entity.ImageEntity;
import com.lucas.spring.components.user.model.entity.UserEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
public class ProcedureLogEntity extends BaseEntity {

  /**
   * Initializes the entity with an id.
   *
   * @param id The id of the log.
   */
  public ProcedureLogEntity(final Long id) {
    setId(id);
  }

  /**
   * The author of the procedure log.
   */
  @Column(name = "author", length = 200)
  private String author;

  /**
   * The name of the initial file which was used to generate the procedure log.
   */
  @Column(name = "filename", nullable = false)
  private String filename;

  /**
   * The procedure that was used on the image.
   */
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "procedure_id", nullable = false)
  private ProcedureEntity procedure;

  /**
   * The image which was used with the procedure.
   */
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "image_to_analyse", nullable = false)
  private ImageEntity image;

  /**
   * The user who created the log.
   */
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "log_init_user_id", nullable = false)
  private UserEntity user;

  /**
   * The creation time of the log.
   */
  @Column(name = "created_at", nullable = false)
  private Instant createdAt;

  /**
   * The list of params associated with the given procedure.
   */
  @OneToMany(mappedBy = "procedureLogParam.procedureLog", fetch = FetchType.LAZY)
  private Set<ProcedureLogParamEntity> procedureParams;

  /**
   * List of bounding boxes associated with this procedure log.
   */
  @OneToMany(mappedBy = "procedureLog", fetch = FetchType.LAZY)
  private Set<BoundingBoxEntity> boundingBoxes;

  /**
   * Tells in which folders are present the given bounding box.
   */
  @OneToMany(fetch = FetchType.LAZY, mappedBy = "log")
  private Set<FolderContentEntity> folderContents;
}
