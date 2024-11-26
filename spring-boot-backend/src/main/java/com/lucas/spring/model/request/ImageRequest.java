package com.lucas.spring.model.request;

import com.lucas.spring.model.models.ExifDataModel;
import java.util.ArrayList;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ImageRequest {
    private int year;
    private String countryCode;
    private String countryName;
    private Integer coordinateX;
    private Integer coordinateY;
    private String imageName;
    private String directionName;
    private ArrayList<ExifDataModel> exifData;
}
