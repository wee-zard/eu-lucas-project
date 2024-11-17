package com.lucas.spring.model.request;

import com.lucas.spring.model.models.ExifDataModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
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

    @Override
    public String toString() {
        return "ImageRequest{" +
                "year=" + year +
                ", countryCode='" + countryCode + '\'' +
                ", countryName='" + countryName + '\'' +
                ", latitude=" + coordinateX +
                ", longitude=" + coordinateY +
                ", imageName='" + imageName + '\'' +
                ", directionName='" + directionName + '\'' +
                ", exifData=" + exifData +
                '}';
    }
}
