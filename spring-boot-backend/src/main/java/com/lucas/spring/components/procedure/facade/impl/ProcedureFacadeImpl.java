package com.lucas.spring.components.procedure.facade.impl;

import com.lucas.spring.commons.utils.DateTimeUtil;
import com.lucas.spring.components.image.model.entity.ImageEntity;
import com.lucas.spring.components.image.service.ImageService;
import com.lucas.spring.components.plant.service.PlantService;
import com.lucas.spring.components.procedure.facade.ProcedureFacade;
import com.lucas.spring.components.procedure.model.entity.BoundingBoxEntity;
import com.lucas.spring.components.procedure.model.entity.ProcedureEntity;
import com.lucas.spring.components.procedure.model.entity.ProcedureLogEntity;
import com.lucas.spring.components.procedure.model.entity.ProcedureLogParamEntity;
import com.lucas.spring.components.procedure.model.entity.embeddable.EmbeddedProcedureLogParam;
import com.lucas.spring.components.procedure.model.model.ProcedureResultRequest;
import com.lucas.spring.components.procedure.service.BoundingBoxService;
import com.lucas.spring.components.procedure.service.ProcedureLogParamService;
import com.lucas.spring.components.procedure.service.ProcedureLogService;
import com.lucas.spring.components.procedure.service.ProcedureService;
import com.lucas.spring.components.user.model.entity.UserEntity;
import com.lucas.spring.components.user.service.UserService;
import jakarta.transaction.Transactional;
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
  @Transactional
  public void uploadLog(final ProcedureResultRequest request, final Long userId) {
    // In one request file, multiple image results could be present at once.
    request.getImages().forEach(image -> {
      // Get image entity, or throw error if not present in the db.
      final ImageEntity imageEntity = imageService.getImageByNameAndYear(
              image.getFile().getFileName(),
              image.getFile().getYear()
      );

      // Get user entity.
      final UserEntity userEntity = userService.getUserById(userId);

      // Sve procedure entity.
      final ProcedureEntity procedureEntity = procedureService.getProcedureByNameAndInitIfNotExists(
              request.getMethod(),
              userEntity,
              request.getAuthor()
      );

      // Save the procedure log entity.
      final ProcedureLogEntity procedureLogEntity = procedureLogService.save(
              ProcedureLogEntity.builder()
                      .procedure(procedureEntity)
                      .image(imageEntity)
                      .user(userEntity)
                      .author(request.getAuthor())
                      .filename(request.getFilename())
                      .createdAt(DateTimeUtil.toInstant(request.getTimestamp()))
                      .build());

      // Save the procedure log params.
      request.getParams().forEach(param ->
              procedureLogParamService.saveProcedureLogParam(
                      ProcedureLogParamEntity.builder()
                              .procedureLogParam(
                                      EmbeddedProcedureLogParam.builder()
                                              .procedureParamName(param)
                                              .procedureLog(procedureLogEntity)
                                              .build())
                              .build()));

      // Save the bounding boxes.
      image.getObjects().forEach(object ->
              boundingBoxService.saveBoundingBox(
                      BoundingBoxEntity.builder()
                              .probabilityOfDetection(object.getConfidence())
                              .minCoordinateX(object.getBoundingBox().getXmin())
                              .minCoordinateY(object.getBoundingBox().getYmin())
                              .maxCoordinateX(object.getBoundingBox().getXmax())
                              .maxCoordinateY(object.getBoundingBox().getYmax())
                              .homogenous(object.getPlant().getIsInvasive())
                              .plant(plantService.addImageEntityToPlant(
                                      plantService.getPlantByNameAndInitIfNotExists(
                                              object.getPlant().getPlantName(),
                                              object.getPlant().getIsInvasive()),
                                      imageEntity))
                              .image(imageEntity)
                              .procedureLog(procedureLogEntity)
                              .build()));
    });
  }
}
