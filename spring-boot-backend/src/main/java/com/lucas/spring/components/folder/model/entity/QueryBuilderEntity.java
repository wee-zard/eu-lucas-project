package com.lucas.spring.components.folder.model.entity;

import com.lucas.spring.commons.model.entity.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ConstraintMode;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * Defines the structure of the Query Builder Entity.
 */
@ToString
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "QueryBuilder")
@Table(name = "tb_query_builder")
public class QueryBuilderEntity extends BaseEntity {

  /**
   * Creates a new entity with just an id.
   *
   * @param id The id of the entity.
   */
  public QueryBuilderEntity(final Long id) {
    setId(id);
  }

  @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JoinColumn(name = "parent_id")
  private QueryBuilderEntity parent;

  // Reference: https://stackoverflow.com/questions/64211311/hibernate-onetomany-self-join-adds-unique-constraint
  @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
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
  @Column(name = "element_relationship", length = 1)
  private Boolean relationship;

  /**
   * Determines the type of the Query.
   *
   * <p>Possible values:
   * <strong>"QUERY_BUILDER (true)"</strong>
   * <strong>"QUERY_GROUP(false)"</strong>
   * <strong>"QUERY_COMPONENT(null)"</strong></p>
   */
  @Column(name = "type", length = 1)
  private Boolean type;

  /**
   * Tells what query elements and filters have been applied
   * to the given query by the user.
   */
  @OneToMany(fetch = FetchType.LAZY, mappedBy = "queryBuilderEntity", cascade = CascadeType.ALL)
  private Set<QueryElementEntity> elements;

  /**
   * Describes what images and folders are associated with this query builder.
   * Meaning, that one Query Builder might be fetched by multiple images and
   * stored inside similarly in multiple folders.
   */
  @OneToOne(fetch = FetchType.LAZY, mappedBy = "queryBuilder", cascade = CascadeType.ALL)
  private FolderContentEntity folderContent;
}
