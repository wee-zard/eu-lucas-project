package com.lucas.spring.helper.converters;

import com.lucas.spring.model.entity.ExifKeyEntity;
import com.lucas.spring.model.entity.UserEntity;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class TestConverter implements Converter<UserEntity, ExifKeyEntity> {
    /**
     * {@inheritDoc}
     */
    @Override
    public ExifKeyEntity convert(UserEntity source) {
        return ExifKeyEntity
                .builder()
                /*
                 * TODO: ...
                 * ...
                 */
                .build();
    }

    /*
     * ConversionService.convert(userEntity, ExifKeyEntity.class);
     */
}
