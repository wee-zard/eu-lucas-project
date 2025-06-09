package com.lucas.spring.repositories;

import com.lucas.spring.model.entity.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository of the User roles.
 */
@Repository
public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
}
