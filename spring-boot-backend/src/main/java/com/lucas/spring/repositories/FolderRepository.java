package com.lucas.spring.repositories;

import com.lucas.spring.model.entity.FolderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository of the folders.
 */
@Repository
public interface FolderRepository extends JpaRepository<FolderEntity, Long> {
}
