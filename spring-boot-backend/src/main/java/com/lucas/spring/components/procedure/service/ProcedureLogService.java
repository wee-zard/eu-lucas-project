package com.lucas.spring.components.procedure.service;

import com.lucas.spring.components.image.model.entity.ImageEntity;
import com.lucas.spring.components.procedure.model.entity.ProcedureEntity;
import com.lucas.spring.components.procedure.model.entity.ProcedureLogEntity;
import com.lucas.spring.components.user.model.entity.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Stores methods related to the {@link ProcedureLogEntity}.
 */
public interface ProcedureLogService {

  /**
   * Fetches the procedure logs.
   *
   * @param pageable Properties the page the records.
   * @return Returns the list of procedure logs.
   */
  Page<ProcedureLogEntity> findAll(Pageable pageable);

  /**
   * Fetches the procedure logs associated with the requested image.
   *
   * @param imageId The id of the image.
   * @param pageable Properties the page the records.
   * @return Returns the list of procedure logs that are associated with the requested image.
   */
  Page<ProcedureLogEntity> findAllByImageId(Number imageId, Pageable pageable);

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
  ProcedureLogEntity save(ProcedureLogEntity entity);
}
