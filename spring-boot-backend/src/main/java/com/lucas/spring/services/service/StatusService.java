package com.lucas.spring.services.service;

import com.lucas.spring.model.entity.StatusEntity;
import java.util.ArrayList;
import org.springframework.stereotype.Service;

/**
 * An interface service where we store methods
 * related to the User Statue.
 */
@Service
public interface StatusService {
  /**
   * Fetches the list of status entities.
   *
   * @return Returns the list of status entities from the db.
   */
  ArrayList<StatusEntity> getStatuses();

  /**
   * Fetches a specific status entity from the db by id.
   *
   * @param statusId The user status we want to fetch.
   * @return Returns a StatusEntity.
   */
  StatusEntity getStatusById(Long statusId);
}
