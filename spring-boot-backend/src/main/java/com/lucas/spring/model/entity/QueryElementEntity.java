package com.lucas.spring.model.entity;

import com.lucas.spring.model.entity.abstraction.BaseEntity;
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
import lombok.Setter;

/**
 * Defines the structure of the Query Element Entity.
 */
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "QueryElement")
@Table(name = "tb_query_element")
public class QueryElementEntity extends BaseEntity {

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "query_builder_id")
  private QueryBuilderEntity queryBuilderEntity;

  @Column(name = "filter_tab", length = 2, nullable = false)
  private byte filterTab;

  @Column(name = "operator", length = 2, nullable = false)
  private byte operator;

  @Column(name = "select_input", length = 255, nullable = true)
  private String selectInput;

  @Column(name = "text_field", length = 255, nullable = true)
  private String textFieldInput;
}
