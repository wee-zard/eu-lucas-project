package com.lucas.spring.components.folder.repository;

import com.lucas.spring.components.folder.model.entity.FolderEntity;
import com.lucas.spring.components.user.model.entity.UserEntity;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository of the folders.
 */
@Repository
public interface FolderRepository extends JpaRepository<FolderEntity, Long> {

  /**
   * Checks whether the provided title is stored under the user.
   *
   * @param title The title of the folder to check.
   * @param user The user to check.
   * @return Returns true if the provided title, under the user exists, else false.
   */
  boolean existsFolderEntityByTitleAndOwner(String title, UserEntity user);

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
