package com.lucas.spring.model.entity;

import com.lucas.spring.model.entity.abstraction.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.ConstraintMode;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Defines the structure of the Query Builder Entity.
 */
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "QueryBuilder")
@Table(name = "tb_query_builder")
public class QueryBuilderEntity extends BaseEntity {

  @ManyToOne
  @JoinColumn(name = "parent_id")
  private QueryBuilderEntity parent;

  // Reference: https://stackoverflow.com/questions/64211311/hibernate-onetomany-self-join-adds-unique-constraint
  @OneToMany
  @JoinColumn(
          name = "parent_id",
          referencedColumnName = "id",
          foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT)
  )
  private Set<QueryBuilderEntity> children;

  /**
   * Tells whether the components are connected with "OR",
   * or "AND" logical formulas.
   * false = "OR"
   * true = "AND"
   */
  @Column(name = "element_relationship", nullable = false)
  private Boolean relationship;

  /**
   * Determines the type of the Query.
   *
   * <p>Possible values:
   * <strong>"QUERY_BUILDER (NULL)"</strong>
   * <strong>"QUERY_GROUP(0)"</strong>
   * <strong>"QUERY_COMPONENT(1)"</strong></p>
   */
  @Column(name = "type", nullable = false)
  private Boolean type;

  @OneToMany(fetch = FetchType.LAZY, mappedBy = "queryBuilderEntity")
  private Set<QueryElementEntity> elements;

  // TODO:
  // @OneToMany(fetch = FetchType.LAZY, mappedBy = ???)
  // private Set<FolderContentEntity???> folderContents;
}
