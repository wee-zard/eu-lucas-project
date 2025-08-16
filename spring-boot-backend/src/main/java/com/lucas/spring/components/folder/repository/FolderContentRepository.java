package com.lucas.spring.components.folder.repository;

import com.lucas.spring.components.folder.model.entity.FolderContentEntity;
import com.lucas.spring.components.folder.model.model.FolderContentCreationModel;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Repository of the Folder Content entity.
 */
@Repository
public interface FolderContentRepository extends JpaRepository<FolderContentEntity, Long> {

  /**
   * Checks whether the provided image indie the provided folder is existed.
   *
   * @param folderId The id of the folder.
   * @param imageId The id of the image.
   * @param boundingBoxId The id of the bounding box.
   * @return Returns true if the provided image inside the provided folder already exists.
   */
  boolean existsFolderIdAndImageIdAndBoundingBoxIdByFolderIdAndImageIdAndBoundingBoxId(Long folderId, Long imageId, Long boundingBoxId);

  /**
   * Finds all the content inside the provided folder.
   *
   * @param folderId Folder id.
   * @return Returns the list of folder content.
   */
  @Query("""
          select new com.lucas.spring.components.folder.model.model.FolderContentCreationModel(
            fc.folder.id, fc.image.id, fc.boundingBox.id
          ) from FolderContent fc
          where fc.folder.id = :folderId
          """)
  List<FolderContentCreationModel> findFolderContentCreationModelByFolderId(Long folderId);

  /**
   * Finds all the content inside the provided folder.
   *
   * @param folderId The id of the folder.
   * @return Returns the list of folder content.
   */
  List<FolderContentEntity> findFolderContentEntityByFolderId(Long folderId);
}
