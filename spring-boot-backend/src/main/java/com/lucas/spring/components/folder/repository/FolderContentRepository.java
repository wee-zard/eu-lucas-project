package com.lucas.spring.components.folder.repository;

import com.lucas.spring.components.folder.model.entity.FolderContentEntity;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
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

  /**
   * Finds all the content inside the provided folder.
   *
   * @param folderId The id of the folder.
   * @return Returns the list of folder content.
   */
  @Query("""
          select fc
          from FolderContent fc
          where fc.folder.id = :folderId
          and fc.image.id in :imageIds
          """)
  List<FolderContentEntity> findAllContentByFolderIdAndImageIds(Long folderId, List<Long> imageIds);

  /**
   * Finds a paged list of images from a dedicated folder.
   *
   * @param folderId The id of the folder.
   * @param pageable The pagination.
   * @return Returns a list of image ids that are present inside the folder.
   */
  @Query("""
          select fc.image.id from FolderContent fc
          where fc.folder.id = :folderId
          group by fc.image.id
          """)
  Page<Long> getImageIdsByFolderId(Long folderId, Pageable pageable);
}
