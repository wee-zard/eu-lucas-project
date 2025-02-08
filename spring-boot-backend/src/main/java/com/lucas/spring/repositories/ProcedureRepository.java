package com.lucas.spring.repositories;

import com.lucas.spring.model.entity.ProcedureEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Repository of the {@link ProcedureEntity}.
 */
@Repository
public interface ProcedureRepository extends JpaRepository<ProcedureEntity, Long> {

  /**
   * Fetch a procedure by name.
   *
   * @param name The name of the procedure we are searching for.
   * @return Returns the Procedure if exists.
   */
  Optional<ProcedureEntity> getNameByName(@Param("name") String name);
}
