package com.lucas.spring.components.folder.repository;

import com.lucas.spring.components.folder.model.entity.ShareFolderEntity;
import com.lucas.spring.components.folder.model.entity.embeddable.EmbeddedSharedFolderKey;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository for the {@link ShareFolderEntity}.
 */
@Repository
public interface ShareFolderRepository
        extends JpaRepository<ShareFolderEntity, EmbeddedSharedFolderKey> {
  /**
   * Finds the folders which are shared with the given user.
   *
   * @param id The user whose folders is requested.
   * @return Returns the folders that has been shared by the user.
   */
  List<ShareFolderEntity> findAllByIdSharedWithUserId(final Long id);
}
