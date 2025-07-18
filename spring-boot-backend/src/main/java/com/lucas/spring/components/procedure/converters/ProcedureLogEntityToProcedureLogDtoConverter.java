package com.lucas.spring.components.procedure.converters;

import com.lucas.spring.components.plant.model.dto.PlantDto;
import com.lucas.spring.components.procedure.model.dto.BoundingBoxDto;
import com.lucas.spring.components.procedure.model.dto.ProcedureLogDto;
import com.lucas.spring.components.procedure.model.entity.ProcedureLogEntity;
import java.util.List;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * Defines a conversion from {@link ProcedureLogEntity} to {@link ProcedureLogDto}.
 */
@Component
public class ProcedureLogEntityToProcedureLogDtoConverter
        implements Converter<ProcedureLogEntity, ProcedureLogDto> {

  /**
   * {@inheritDoc}
   */
  @Override
  public ProcedureLogDto convert(final ProcedureLogEntity source) {
    final List<String> params = source.getProcedureParams().stream()
            .map(param -> param.getProcedureLogParam().getProcedureParamName())
            .toList();

    final List<BoundingBoxDto> boxes = source.getBoundingBoxes().stream()
            .map(box ->
              BoundingBoxDto.builder()
                      .id(box.getId())
                      .isHomogenous(box.getHomogenous())
                      .maxCoordinateX(box.getMaxCoordinateX())
                      .maxCoordinateY(box.getMaxCoordinateY())
                      .minCoordinateX(box.getMinCoordinateX())
                      .minCoordinateY(box.getMinCoordinateY())
                      .probabilityOfDetection(box.getProbabilityOfDetection())
                      .plant(PlantDto.builder()
                              .isPlantInvasive(box.getPlant().getIsPlantInvasive())
                              .plantScientificName(box.getPlant().getPlantScientificName())
                              .build())
                      .build())
            .toList();

    return ProcedureLogDto.builder()
            .id(source.getId())
            .createdAt(source.getCreatedAt().toString())
            .user(source.getUser().getUserName())
            .procedure(source.getProcedure().getName())
            .params(params)
            .boundingBoxes(boxes)
            .build();
  }
}
