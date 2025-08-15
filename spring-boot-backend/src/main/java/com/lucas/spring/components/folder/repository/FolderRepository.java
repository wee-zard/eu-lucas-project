package com.lucas.spring.components.folder.repository;

import com.lucas.spring.components.folder.model.dto.FolderDtoSlice;
import com.lucas.spring.components.folder.model.entity.FolderEntity;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Repository of the folders.
 */
@Repository
public interface FolderRepository extends JpaRepository<FolderEntity, Long> {

  /**
   * Lists only those folders of a specific user, what the user owns,
   * or what has been shared with them.
   *
   * @param userId The user's id.
   * @return Returns folder dto slices that contains the folders which
   *     are accessible for the user.
   */
  @Query("""
      select new com.lucas.spring.components.folder.model.dto.FolderDtoSlice(
        tf.id,
        tf.title,
        tf.description,
        tf.owner.userName,
        (
          select count(*) from FolderContent fc
          where fc.folder.id = tf.id
        ) as folderContentSize,
        tsf.isEditable,
        tf.createdAt,
        tf.updatedAt
      ) from Folder tf left join ShareFolder tsf on tf.id = tsf.id.folderId
      where tf.owner.id = :userId
      or tsf.id.sharedWithUserId = :userId
      """)
  Page<FolderDtoSlice> listOwnedAndSharedWithFoldersOfUser(Long userId, Pageable pageable);

  /**
   * Checks whether the provided title is stored under the user.
   *
   * @param title The title of the folder to check.
   * @param ownerId The id of the user to check.
   * @return Returns true if the provided title, under the user exists, else false.
   */
  boolean existsFolderEntityByTitleAndOwnerId(String title, Long ownerId);

  /**
   * Finds the list of folders which are owned by the given user.
   *
   * @param id The user whose folders is requested.
   * @return Returns the user's owned folders.
   */
  List<FolderEntity> findAllByOwnerId(Long id);

  /**
   * Finds the list of folders which are owned by the given user.
   *
   * @param id The user whose folders is requested.
   * @return Returns the user's owned folders.
   */
  Page<FolderEntity> findAllByOwnerId(Long id, Pageable pageable);
}
