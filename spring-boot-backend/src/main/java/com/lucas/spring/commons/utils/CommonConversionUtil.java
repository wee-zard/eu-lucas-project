package com.lucas.spring.commons.utils;

import com.lucas.spring.commons.model.model.KeyValueModel;
import com.lucas.spring.components.exif.model.dto.ExifDataDto;
import com.lucas.spring.components.exif.model.entity.ExifDataEntity;
import com.lucas.spring.components.folder.model.entity.FolderContentDataEntity;
import com.lucas.spring.components.image.model.dto.ImageDto;
import com.lucas.spring.components.image.model.entity.ImageEntity;
import com.lucas.spring.components.plant.model.dto.PlantDto;
import com.lucas.spring.components.plant.model.entity.PlantEntity;
import com.lucas.spring.components.procedure.model.dto.BoundingBoxDto;
import com.lucas.spring.components.procedure.model.dto.ProcedureLogDto;
import com.lucas.spring.components.procedure.model.entity.BoundingBoxEntity;
import com.lucas.spring.components.procedure.model.entity.ProcedureLogEntity;
import lombok.experimental.UtilityClass;

/**
 * Utility class for the common conversion components.
 */
@UtilityClass
public class CommonConversionUtil {

  /**
   * Converts the provided data to the another.
   *
   * @param source The data to convert.
   * @return Returns the requested object.
   */
  public KeyValueModel toKeyValueModel(final FolderContentDataEntity source) {
    if (source == null) {
      return null;
    }

    return KeyValueModel.builder()
            .key(source.getKey().getName())
            .value(source.getValue())
            .build();
  }

  /**
   * Converts the provided data to the another.
   *
   * @param source The data to convert.
   * @return Returns the requested object.
   */
  public ProcedureLogDto toProcedureLogDto(final ProcedureLogEntity source) {
    if (source == null) {
      return null;
    }

    return ProcedureLogDto.builder()
            .id(source.getId())
            .createdAt(source.getCreatedAt().toString())
            .user(source.getUser().getUserName())
            .procedure(source.getProcedure().getName())
            .params(source.getProcedureParams().stream()
                    .map(param -> param.getProcedureLogParam().getProcedureParamName())
                    .toList())
            .boundingBoxes(source.getBoundingBoxes().stream()
                    .map(CommonConversionUtil::toBoundingBoxDto)
                    .toList())
            .filename(source.getFilename())
            .image(toImageDtoWithoutExifHeader(source.getImage()))
            .build();
  }

  /**
   * Converts the provided data to the another.
   *
   * @param source The data to convert.
   * @return Returns the requested object.
   */
  public PlantDto toPlantDto(final PlantEntity source) {
    if (source == null) {
      return null;
    }

    return PlantDto.builder()
            .isPlantInvasive(source.getIsPlantInvasive())
            .plantSpeciesName(source.getPlantSpeciesName() != null
                    ? source.getPlantSpeciesName().getPlantScientificName()
                    : null)
            .plantScientificName(source.getPlantScientificName())
            .build();
  }

  /**
   * Converts the provided data to the another.
   *
   * @param source The data to convert.
   * @return Returns the requested object.
   */
  public BoundingBoxDto toBoundingBoxDto(final BoundingBoxEntity source) {
    if (source == null) {
      return null;
    }

    return BoundingBoxDto.builder()
            .id(source.getId())
            .isHomogenous(source.getHomogenous())
            .maxCoordinateX(source.getMaxCoordinateX())
            .maxCoordinateY(source.getMaxCoordinateY())
            .minCoordinateX(source.getMinCoordinateX())
            .minCoordinateY(source.getMinCoordinateY())
            .probabilityOfDetection(source.getProbabilityOfDetection())
            .plant(CommonConversionUtil.toPlantDto(source.getPlant()))
            .build();
  }

  /**
   * Converts the provided data to the another.
   *
   * @param source The data to convert.
   * @return Returns the requested object.
   */
  public ExifDataDto toExifDataDto(final ExifDataEntity source) {
    if (source == null) {
      return null;
    }

    return ExifDataDto.builder()
            .exifValue(source.getExifValue())
            .exifKey(source.getExifKey().getExifKeyName())
            .build();
  }

  /**
   * Converts the provided data to the another.
   *
   * @param source The data to convert.
   * @return Returns the requested object.
   */
  public ImageDto toImageDto(final ImageEntity source) {
    if (source == null) {
      return null;
    }

    final ImageDto imageDto = toImageDtoWithoutExifHeader(source);
    imageDto.setExifDataList(source.getExifData().stream()
            .map(CommonConversionUtil::toExifDataDto)
            .toList());
    return imageDto;
  }

  /**
   * Converts the provided data to the another.
   *
   * @param source The data to convert.
   * @return Returns the requested object.
   */
  public ImageDto toImageDtoWithoutExifHeader(final ImageEntity source) {
    if (source == null) {
      return null;
    }

    return ImageDto.builder()
            .id(source.getId())
            .year(source.getYear().getYear())
            .imageName(source.getImageName())
            .country(source.getCountry().getCountryCode())
            .direction(source.getDirection().getDirectionName())
            .coordinateX(source.getCoordinateX().getCoordinateX())
            .coordinateY(source.getCoordinateY().getCoordinateY())
            .build();
  }
}
