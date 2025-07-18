package com.lucas.spring.components.image.model.dto;

import com.lucas.spring.commons.model.dto.RootDto;
import com.lucas.spring.components.image.model.entity.ImageEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

/**
 * A dto made out of {@link ImageEntity} entities for the purpose
 * of sending back to the frontend not sensitive data.
 */
@ToString
@Builder
@Getter
@AllArgsConstructor
public class ImageDto implements RootDto {
  private Long id;
  private String imageName;
  private String direction;
  private String country;
  private int year;
  private int coordinateX;
  private int coordinateY;
}
