package com.lucas.spring.services.facade.impl;

import com.lucas.spring.model.entity.BoundingBoxEntity;
import com.lucas.spring.model.entity.ImageEntity;
import com.lucas.spring.model.entity.ProcedureEntity;
import com.lucas.spring.model.entity.ProcedureLogEntity;
import com.lucas.spring.model.entity.ProcedureLogParamEntity;
import com.lucas.spring.model.entity.UserEntity;
import com.lucas.spring.model.entity.embeddable.EmbeddedProcedureLogParam;
import com.lucas.spring.model.request.procedures.ProcedureResultRequest;
import com.lucas.spring.services.facade.ProcedureFacade;
import com.lucas.spring.services.service.BoundingBoxService;
import com.lucas.spring.services.service.ImageService;
import com.lucas.spring.services.service.PlantService;
import com.lucas.spring.services.service.ProcedureLogParamService;
import com.lucas.spring.services.service.ProcedureLogService;
import com.lucas.spring.services.service.ProcedureService;
import com.lucas.spring.services.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Implements the methods of {@link ProcedureFacade}.
 */
@Service
@AllArgsConstructor
public class ProcedureFacadeImpl implements ProcedureFacade {
  private final ProcedureService procedureService;
  private final UserService userService;
  private final PlantService plantService;
  private final ImageService imageService;
  private final ProcedureLogService procedureLogService;
  private final ProcedureLogParamService procedureLogParamService;
  private final BoundingBoxService boundingBoxService;

  /**
   * {@inheritDoc}
   */
  @Override
  public void uploadLog(final ProcedureResultRequest request, final Long userId) {
    // Get image entity, or throw error is not present in the db.
    final ImageEntity imageEntity = imageService.getImageByNameAndYear(
            request.getFile().getFileName(),
            request.getFile().getYear()
    );

    // Get user entity.
    final UserEntity userEntity = userService.getUserById(userId);

    // Sve procedure entity.
    final ProcedureEntity procedureEntity = procedureService.getProcedureByNameAndInitIfNotExists(
            request.getMethod(),
            userEntity);

    // Save the procedure log entity.
    final ProcedureLogEntity procedureLogEntity = procedureLogService.saveProcedureLog(
            ProcedureLogEntity.builder()
                    .procedure(procedureEntity)
                    .image(imageEntity)
                    .user(userEntity)
                    .build());

    // Save the procedure log params.
    request.getParams().forEach((param) ->
        procedureLogParamService.saveProcedureLogParam(
              ProcedureLogParamEntity.builder()
                .procedureLogParam(
                  EmbeddedProcedureLogParam.builder()
                    .procedureParamName(param)
                    .procedureLog(procedureLogEntity)
                    .build())
                .build()));

    // Save the bounding boxes.
    request.getObjects().forEach(object ->
        boundingBoxService.saveBoundingBox(
          BoundingBoxEntity.builder()
            .probabilityOfDetection(object.getConfidence())
            .minCoordinateX(object.getBoundingBox().getXmin())
            .minCoordinateY(object.getBoundingBox().getYmin())
            .maxCoordinateX(object.getBoundingBox().getXmax())
            .maxCoordinateY(object.getBoundingBox().getYmax())
            .homogenous(object.getIsInvasive())
            .plant(plantService.addImageEntityToPlant(
                            plantService.getPlantByNameAndInitIfNotExists(
                                    object.getPlantName(),
                                    object.getIsInvasive()),
                            imageEntity))
            .image(imageEntity)
            .procedureLog(procedureLogEntity)
            .build()));
  }
}
