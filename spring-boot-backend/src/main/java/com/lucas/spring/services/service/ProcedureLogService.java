package com.lucas.spring.services.service;

import com.lucas.spring.model.entity.ImageEntity;
import com.lucas.spring.model.entity.ProcedureEntity;
import com.lucas.spring.model.entity.ProcedureLogEntity;
import com.lucas.spring.model.entity.UserEntity;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 * Stores methods related to the {@link ProcedureLogEntity}.
 */
@Service
public interface ProcedureLogService {

  /**
   * Fetches the procedure logs associated with the requested image.
   *
   * @param imageId The id of the image.
   * @return Returns the list of procedure logs that are associated with the requested image.
   */
  List<ProcedureLogEntity> getProcedureLogsByImageId(Number imageId);

  /**
   * Creates a new {@link ProcedureLogEntity}.
   *
   * @param procedure The procedure that have been used.
   * @param image The image that have been analyzed.
   * @param user The user who initiated the procedure.
   * @return Returns a new root {@link ProcedureLogEntity} object.
   */
  ProcedureLogEntity createProcedureLog(
          ProcedureEntity procedure,
          ImageEntity image,
          UserEntity user);

  /**
   * Saves and updates the provided entity.
   *
   * @param entity The procedure log entity to save and update.
   * @return Returns the saved entity.
   */
  ProcedureLogEntity saveProcedureLog(ProcedureLogEntity entity);
}
