package com.lucas.spring.helper.helpers;

import com.lucas.spring.model.entity.CoordinateXEntity;
import com.lucas.spring.model.entity.CoordinateYEntity;
import com.lucas.spring.model.entity.CreationCountryEntity;
import com.lucas.spring.model.entity.CreationDirectionEntity;
import com.lucas.spring.model.entity.CreationYearEntity;
import com.lucas.spring.model.enums.ImageFilteringEnum;
import com.lucas.spring.model.enums.InputFormatErrors;
import com.lucas.spring.model.expection.ImageFilteringException;
import com.lucas.spring.model.expection.InputFormatException;
import com.lucas.spring.model.request.filtering.QueryComponent;
import lombok.experimental.UtilityClass;

/**
 * Creates entity builders based on the provided {@link QueryComponent}
 * from the Query Builder for the purpose of comparing objects.
 */
@UtilityClass
public class BuildEntityUtil {

  /**
   * Init a {@link CreationDirectionEntity} with the provided filter values.
   *
   * @param component The user provided {@link QueryComponent} that.
   * @return a {@link CreationDirectionEntity} built object.
   */
  public CreationYearEntity buildCreationYearEntity(final QueryComponent component) {
    try {
      return CreationYearEntity
                .builder()
                .year(Integer.parseInt(component.getSelectInput()))
                .build();
    } catch (NumberFormatException exception) {
      throw new InputFormatException(
                InputFormatErrors.CASTING_STRING_TO_NUMBER_IS_INVALID,
                component.toString()
      );
    }
  }

  /**
   * Init a {@link CreationCountryEntity} with the provided filter values.
   *
   * @param component The user provided {@link QueryComponent} that.
   * @return a {@link CreationCountryEntity} built object.
   */
  public CreationCountryEntity buildCreationCountryEntity(final QueryComponent component) {
    return CreationCountryEntity
            .builder()
            .countryCode(component.getSelectInput())
            .build();
  }

  /**
   * Creates a {@link CoordinateXEntity} based on the provided {@link QueryComponent}.
   *
   * @param component The component which will be used to create a new entity.
   * @return Returns a {@link CoordinateXEntity} entity.
   */
  public CoordinateXEntity buildCoordinateX(final QueryComponent component) {
    try {
      return CoordinateXEntity
            .builder()
            .coordinateX(Integer.parseInt(component.getSelectInput()))
            .build();
    } catch (NumberFormatException exception) {
      // TODO: throw new exception
      throw new ImageFilteringException(
            ImageFilteringEnum.UNKNOWN_OR_NO_FILTER_TAB_PROVIDED
      );
    }
  }

  /**
   * Creates a {@link CoordinateYEntity} based on the provided {@link QueryComponent}.
   *
   * @param component The component which will be used to create a new entity.
   * @return Returns a {@link CoordinateYEntity} entity.
   */
  public CoordinateYEntity buildByCoordinateY(final QueryComponent component) {
    try {
      return CoordinateYEntity
            .builder()
            .coordinateY(Integer.parseInt(component.getSelectInput()))
            .build();
    } catch (NumberFormatException exception) {
      // TODO: throw new exception
      throw new ImageFilteringException(
            ImageFilteringEnum.UNKNOWN_OR_NO_FILTER_TAB_PROVIDED
      );
    }
  }

  /**
   * Creates a {@link CreationDirectionEntity} based on the provided {@link QueryComponent}.
   *
   * @param component The component which will be used to create a new entity.
   * @return Returns a {@link CreationDirectionEntity} entity.
   */
  public CreationDirectionEntity buildDirectionName(final QueryComponent component) {
    return CreationDirectionEntity
            .builder()
            .directionName(component.getSelectInput())
            .build();
  }
}
