package com.lucas.spring.model.models;

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
