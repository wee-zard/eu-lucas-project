package com.lucas.spring.components.image.model.dto;

import com.lucas.spring.commons.model.dto.RootDto;
import com.lucas.spring.components.exif.model.dto.ExifDataDto;
import com.lucas.spring.components.image.model.entity.ImageEntity;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * A dto made out of {@link ImageEntity} entities for the purpose
 * of sending back to the frontend not sensitive data.
 */
@ToString
@Builder
@Getter
@Setter
@AllArgsConstructor
public class ImageDto implements RootDto {
  private Long id;
  private String imageName;
  private String direction;
  private String country;
  private int year;
  private int coordinateX;
  private int coordinateY;
  private List<ExifDataDto> exifDataList;
}
