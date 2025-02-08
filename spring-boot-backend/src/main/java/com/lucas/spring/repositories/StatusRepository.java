package com.lucas.spring.repositories;

import com.lucas.spring.model.entity.StatusEntity;
import java.util.ArrayList;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

/**
 * The Crud repository of the Status entities.
 */
public interface StatusRepository extends CrudRepository<StatusEntity, Long> {

  /**
   * Selects all the statuses from the db.
   *
   * @return Returns the list of statues from the db.
   */
  @Query("SELECT new com.lucas.spring.model.entity.StatusEntity(status.id, status.statusName)"
          + " FROM Status status")
  ArrayList<StatusEntity> getStatuses();
}
