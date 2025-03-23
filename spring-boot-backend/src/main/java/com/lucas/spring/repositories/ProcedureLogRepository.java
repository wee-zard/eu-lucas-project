package com.lucas.spring.repositories;

import com.lucas.spring.model.entity.ProcedureLogEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository of the {@link ProcedureLogEntity}.
 */
public interface ProcedureLogRepository extends JpaRepository<ProcedureLogEntity, Long> {

  /**
   * Fetches the procedure logs associated with the requested image.
   *
   * @param imageId The id of the image.
   * @return Returns the list of procedure logs that are associated with the requested image.
   */
  List<ProcedureLogEntity> findByImageId(Number imageId);
}
