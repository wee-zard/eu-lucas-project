package com.lucas.spring.components.exif.service.impl;

import com.lucas.spring.components.exif.enums.ExifKeyExceptionEnum;
import com.lucas.spring.components.exif.exception.ExifKeyException;
import com.lucas.spring.components.exif.model.entity.ExifKeyEntity;
import com.lucas.spring.components.exif.repository.ExifKeyRepository;
import com.lucas.spring.components.exif.service.ExifKeyService;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

/**
 * Service implementation of the {@link ExifKeyService}.
 */
@Service
@AllArgsConstructor
@CacheConfig(cacheNames = "CH_EXIF_KEY")
public class ExifKeyServiceImpl implements ExifKeyService {
  private ExifKeyRepository exifKeyRepository;

  /**
   * {@inheritDoc}
   */
  @Override
  @Cacheable
  public List<ExifKeyEntity> getExifKeys() {
    return exifKeyRepository.findAll();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public ExifKeyEntity getExifKey(final String exifKey) {
    final Optional<ExifKeyEntity> selectedExifKey = getExifKeys()
            .stream()
            .filter(exifKeyEntity -> Objects.equals(exifKeyEntity.getExifKeyName(), exifKey))
            .findFirst();

    if (selectedExifKey.isEmpty()) {
      throw new ExifKeyException(ExifKeyExceptionEnum.EXIF_KEY_NOT_FOUNT, exifKey);
    }

    return selectedExifKey.get();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  @CacheEvict
  public void addExifKey(final String exifKeyName) {
    final ExifKeyEntity exifKeyEntity = ExifKeyEntity.builder().exifKeyName(exifKeyName).build();
    exifKeyRepository.save(exifKeyEntity);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void isExifKeyIncludedInTheDb(final String exifKey) {
    final Optional<ExifKeyEntity> selectedExifKey = getExifKeys().stream()
            .filter(dbExifKey -> Objects.equals(dbExifKey.getExifKeyName(), exifKey))
            .findAny();

    if (selectedExifKey.isEmpty()) {
      addExifKey(exifKey);
    }
  }
}
