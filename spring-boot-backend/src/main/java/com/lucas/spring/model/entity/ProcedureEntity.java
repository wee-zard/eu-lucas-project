package com.lucas.spring.model.entity;

import com.lucas.spring.model.entity.abstraction.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

/**
 * A procedure entity that stores the columns of the procedure table.
 * We store the necessary information about the different procedures
 * that will be used on the images to analyse them.
 */
@Getter
@Setter
@Entity(name = "Procedure")
@Table(name = "tb_procedure")
@SuperBuilder
public class ProcedureEntity extends BaseEntity {

  /**
   * The name of the procedure.
   */
  @Column(name = "name", unique = true, length = 200, nullable = false)
  private String name;

  /**
   * The user who created the procedure.
   */
  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private UserEntity initUserId;
}
