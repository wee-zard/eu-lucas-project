package com.lucas.spring.components.folder.repository;

import com.lucas.spring.components.folder.model.entity.FolderContentKeyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository of the folder content key entities.
 */
@Repository
public interface FolderContentKeyRepository extends JpaRepository<FolderContentKeyEntity, Long> {
}
