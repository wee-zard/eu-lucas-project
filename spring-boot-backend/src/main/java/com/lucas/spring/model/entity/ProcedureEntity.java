package com.lucas.spring.model.entity;

import com.lucas.spring.model.entity.abstraction.BaseComparatorEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.util.Objects;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * A procedure entity that stores the columns of the procedure table.
 * We store the necessary information about the different procedures
 * that will be used on the images to analyse them.
 */
@ToString
@Getter
@Setter
@Builder
@Entity(name = "Procedure")
@Table(name = "tb_procedure")
@AllArgsConstructor
@NoArgsConstructor
public class ProcedureEntity extends BaseComparatorEntity<ProcedureEntity> {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;
  /**
   * The name of the procedure.
   */
  @Column(name = "name", unique = true, length = 200, nullable = false)
  private String name;
  /**
   * The user who created the procedure.
   */
  @ManyToOne
  @JoinColumn(name = "init_user_id", nullable = false)
  private UserEntity initUserId;

  /**
   * {@inheritDoc}
   */
  @Override
  public int compareTo(final ProcedureEntity o) {
    return String.CASE_INSENSITIVE_ORDER.compare(getName(), o.getName());
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    final ProcedureEntity that = (ProcedureEntity) o;
    return Objects.equals(name, that.name);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public int hashCode() {
    return Objects.hash(name);
  }
}
