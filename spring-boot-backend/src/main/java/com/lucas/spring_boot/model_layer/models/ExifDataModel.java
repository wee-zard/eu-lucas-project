package com.lucas.spring_boot.model_layer.models;

import lombok.*;

@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExifDataModel {
    public String exifKey;
    public String exifValue;
}
