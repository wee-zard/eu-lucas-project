package com.lucas.spring.database.repositories;

import com.lucas.spring.model.entity.ProcedureEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Repository of the {@link ProcedureEntity}.
 */
@Repository
public interface ProcedureRepository extends CrudRepository<ProcedureEntity, Long> {

  /**
   * Fetch a procedure by name.
   *
   * @param name The name of the procedure we are searching for.
   * @return Returns the Procedure if exists.
   */
  @Query("SELECT p FROM Procedure p WHERE p.name = :name")
  Optional<ProcedureEntity> getProcedureByName(@Param("name") String name);
}
