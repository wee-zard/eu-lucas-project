package com.lucas.spring.components.folder.model.entity.embeddable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.stereotype.Component;

/**
 * Defines a compact primary key that holds two columns of a table
 * while one of them is in relation with the table
 * via a foreign key relation.
 */
@Builder
@Getter
@ToString
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Component
public class EmbeddedSharedFolderKey {
  /**
   * The folder that has been shared with the user.
   */
  @Column(name = "folder_id")
  private Long folderId;

  /**
   * The user who has access alongside the owner of the folder
   * to access and read the content of the folder. Mostly,
   * the owner is not necessary needs to be shared the folder,
   * as they own the folder.
   */
  @Column(name = "shared_with_user_id")
  private Long sharedWithUserId;
}
