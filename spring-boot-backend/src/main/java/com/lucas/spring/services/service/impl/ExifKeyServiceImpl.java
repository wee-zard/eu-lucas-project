package com.lucas.spring.services.service.impl;

import com.lucas.spring.repositories.ExifKeyRepository;
import com.lucas.spring.model.entity.ExifKeyEntity;
import com.lucas.spring.model.expection.ExifKeyNotFoundException;
import com.lucas.spring.services.service.ExifKeyService;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ExifKeyServiceImpl implements ExifKeyService {
    private static final String SERVICE_CACHE_NAME = "CH_EXIF_KEY";
    private ExifKeyRepository exifKeyRepository;
    /**
     * {@inheritDoc}
     */
    @Override
    @Cacheable(SERVICE_CACHE_NAME)
    public ArrayList<ExifKeyEntity> getExifKeys() {
        return exifKeyRepository.fetchAllExifKeys();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ExifKeyEntity getExifKey(String exifKey) {
        Optional<ExifKeyEntity> selectedExifKey = getExifKeys()
                .stream()
                .filter(exifKeyEntity -> exifKeyEntity.getExifKeyName().equals(exifKey))
                .findFirst();

        if (selectedExifKey.isPresent()) {
            return selectedExifKey.get();
        } else {
            throw new ExifKeyNotFoundException();
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @CacheEvict(SERVICE_CACHE_NAME)
    public void addExifKey(String exifKeyName) {
        ExifKeyEntity exifKeyEntity = ExifKeyEntity
                .builder()
                .exifKeyName(exifKeyName)
                .build();
        exifKeyRepository.save(exifKeyEntity);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void isExifKeyIncludedInTheDb(String exifKey) {
        Optional<ExifKeyEntity> selectedExifKey = getExifKeys().stream()
                .filter(dbExifKey -> dbExifKey.getExifKeyName().equals(exifKey))
                .findAny();

        if (selectedExifKey.isEmpty()) {
            addExifKey(exifKey);
        }
    }
}
