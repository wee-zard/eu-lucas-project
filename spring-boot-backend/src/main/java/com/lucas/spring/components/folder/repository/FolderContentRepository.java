package com.lucas.spring.components.folder.repository;

import com.lucas.spring.components.folder.model.entity.FolderContentEntity;
import com.lucas.spring.components.folder.model.entity.embeddable.EmbeddedFolderContentKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository of the Folder Content entity.
 */
@Repository
public interface FolderContentRepository
        extends JpaRepository<FolderContentEntity, EmbeddedFolderContentKey> {
}
