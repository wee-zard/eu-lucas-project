package com.lucas.spring.components.role.service;

import com.lucas.spring.components.role.model.entity.RoleEntity;
import java.util.List;

/**
 * An interface service where we store methods related to the User Roles.
 */
public interface RoleService {
  /**
   * Fetch a role by id.
   *
   * @param id The role to fetch.
   * @return Gives back the entity of the role.
   */
  RoleEntity getById(final Long id);

  /**
   * Fetch all the roles from the server.
   *
   * @return Returns a list of roles.
   */
  List<RoleEntity> getAll();
}
