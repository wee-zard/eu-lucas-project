package com.lucas.spring.components.image.model.request;

import com.lucas.spring.components.exif.model.model.ExifDataModel;
import java.util.ArrayList;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

/**
 * Stores the properties of the images that are
 * present in the lucas remote image server.
 */
@Getter
@Builder
@ToString
@AllArgsConstructor
public class ImageRequest {
  private int year;
  private String countryCode;
  private String countryName;
  private int coordinateX;
  private int coordinateY;
  private String imageName;
  private String directionName;
  private ArrayList<ExifDataModel> exifData;
}
