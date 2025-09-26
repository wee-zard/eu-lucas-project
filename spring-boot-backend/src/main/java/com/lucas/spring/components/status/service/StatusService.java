package com.lucas.spring.components.status.service;

import com.lucas.spring.components.status.model.entity.StatusEntity;
import java.util.List;

/**
 * An interface service where we store methods
 * related to the User Statue.
 */
public interface StatusService {
  /**
   * Fetches the list of status entities.
   *
   * @return Returns the list of status entities from the db.
   */
  List<StatusEntity> getStatuses();

  /**
   * Fetches a specific status entity from the db by id.
   *
   * @param statusId The user status we want to fetch.
   * @return Returns a StatusEntity.
   */
  StatusEntity getStatusById(Long statusId);
}
