package com.lucas.spring.components.role.repository;

import com.lucas.spring.components.role.model.entity.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository of the User roles.
 */
@Repository
public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
}
