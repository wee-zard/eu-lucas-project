package com.lucas.spring.components.folder.repository;

import com.lucas.spring.components.folder.model.entity.FolderContentEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository of the Folder Content entity.
 */
@Repository
public interface FolderContentRepository extends JpaRepository<FolderContentEntity, Long> {

  /**
   * Finds all the content inside the provided folder.
   *
   * @param folderId The id of the folder.
   * @return Returns the list of folder content.
   */
  List<FolderContentEntity> findFolderContentEntityByFolderId(Long folderId);
}
