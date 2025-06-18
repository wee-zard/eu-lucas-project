package com.lucas.spring.repositories;

import com.lucas.spring.model.entity.FolderContentEntity;
import com.lucas.spring.model.entity.embeddable.EmbeddedFolderContentKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository of the Folder Content entity.
 */
@Repository
public interface FolderContentRepository
        extends JpaRepository<FolderContentEntity, EmbeddedFolderContentKey> {
}
