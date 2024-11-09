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
    public int year;
    public String countryCode;
    public String countryName;
    public int latitude;
    public int longitude;
    public String imageName;
    public String directionName;
    public ArrayList<ExifDataModel> exifData;

    @Override
    public String toString() {
        return "ImageRequest{" +
                "year=" + year +
                ", countryCode='" + countryCode + '\'' +
                ", countryName='" + countryName + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", imageName='" + imageName + '\'' +
                ", directionName='" + directionName + '\'' +
                ", exifData=" + exifData +
                '}';
    }
}
