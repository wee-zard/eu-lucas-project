package com.lucas.spring.components.folder.repository;

import com.lucas.spring.components.folder.model.entity.FolderContentDataEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository.
 */
@Repository
public interface FolderContentDataRepository extends JpaRepository<FolderContentDataEntity, Long> {
}
