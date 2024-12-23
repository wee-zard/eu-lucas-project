package com.lucas.spring.helper.helpers;

import com.lucas.spring.model.entity.*;
import com.lucas.spring.model.enums.ImageFilteringEnum;
import com.lucas.spring.model.enums.InputFormatErrors;
import com.lucas.spring.model.expection.ImageFilteringException;
import com.lucas.spring.model.expection.InputFormatException;
import com.lucas.spring.model.request.filtering.QueryComponent;
import lombok.experimental.UtilityClass;

@UtilityClass
public class BuildEntityUtil {
    public CreationYearEntity buildCreationYearEntity(final QueryComponent component) {
        try {
            // Init a creation year entity with the provided filter values.
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

    public CreationCountryEntity buildCreationCountryEntity(final QueryComponent component) {
        try {
            // TODO: This should be more simple.
            String[] countryData = component.getSelectInput().split(" ");
            String countryCode = countryData[0];
            String countryName = countryData[1]
                    .replace("\\(", "")
                    .replace("\\)", "");
            // Init the creation country entity with the provided filter values.
            return CreationCountryEntity
                    .builder()
                    .countryCode(countryCode)
                    .countryName(countryName)
                    .build();
        } catch (IndexOutOfBoundsException exception) {
            // TODO: throw new exception
            throw new ImageFilteringException(
                    ImageFilteringEnum.UNKNOWN_OR_NO_FILTER_TAB_PROVIDED
            );
        }
    }

  /**
   * Creates a {@link CoordinateXEntity} based on the provided {@link QueryComponent}.
   *
   * @param component The component which will be used to create a new entity.
   * @return Returns a {@link CoordinateXEntity} entity.
   */
  public CoordinateXEntity buildCoordinateX(final QueryComponent component) {
    try {
      // Init the creation country entity with the provided filter values.
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
      // Init the creation country entity with the provided filter values.
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
    // Init the creation country entity with the provided filter values.
    return CreationDirectionEntity
            .builder()
            .directionName(component.getSelectInput())
            .build();
  }
}
