package com.lucas.spring.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * Describes the role table and it's properties.
 */
@ToString
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "Role")
@Table(name = "tb_role")
public class RoleEntity {
  @Id
  @Column(name = "id")
  private int id;
  @Column(name = "role_name", nullable = false)
  private String roleName;
}
