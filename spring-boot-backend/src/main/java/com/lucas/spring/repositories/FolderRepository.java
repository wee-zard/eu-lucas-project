package com.lucas.spring.repositories;

import com.lucas.spring.model.entity.FolderEntity;
import com.lucas.spring.model.entity.UserEntity;
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
}
