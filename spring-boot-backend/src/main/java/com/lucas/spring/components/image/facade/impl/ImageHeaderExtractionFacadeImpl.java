package com.lucas.spring.components.image.facade.impl;

import com.drew.imaging.ImageMetadataReader;
import com.drew.imaging.ImageProcessingException;
import com.drew.metadata.Directory;
import com.drew.metadata.Metadata;
import com.drew.metadata.Tag;
import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.commons.utils.ResourceUtil;
import com.lucas.spring.components.exif.enums.ExifKeyExceptionEnum;
import com.lucas.spring.components.exif.exception.ExifKeyException;
import com.lucas.spring.components.exif.model.entity.ExifDataEntity;
import com.lucas.spring.components.exif.model.entity.ExifKeyEntity;
import com.lucas.spring.components.exif.service.ExifDataService;
import com.lucas.spring.components.exif.service.ExifKeyService;
import com.lucas.spring.components.image.enums.ImageFetcherExceptionEnums;
import com.lucas.spring.components.image.exception.ImageFetcherException;
import com.lucas.spring.components.image.facade.ImageHeaderExtractionFacade;
import com.lucas.spring.components.image.model.entity.ImageEntity;
import com.lucas.spring.components.image.service.ImageService;
import com.lucas.spring.components.user.service.UserService;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Objects;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import static com.lucas.spring.components.exif.model.entity.ExifDataEntity.EXIF_DATA_VALUE_MAX_LENGTH;

/**
 * Service implementation of the image header extraction.
 */
@Service
@AllArgsConstructor
public class ImageHeaderExtractionFacadeImpl implements ImageHeaderExtractionFacade {
  private final UserService userService;
  private final ImageService imageService;
  private final ExifDataService exifDataService;
  private final ExifKeyService exifKeyService;
  private static final int WAIT_UNTIL_NEXT_FETCH_IN_MILI_SECS = 45000;
  private static final int INIT_PAGE_SIZE = 10;

  /**
   * {@inheritDoc}
   */
  @Override
  public void scalpLucasImageServer(final AuthenticatedUser user) {
    userService.validateIsUserAdminElseException(user);
    scalpRemoteServer();
  }

  private void scalpRemoteServer() {
    while (true) {
      final Page<ImageEntity> images = imageService.getImagesWithNotExtractedHeader(INIT_PAGE_SIZE);

      if (images.isEmpty()) {
        // If the fetched list is empty, then there is no more image to extract their exif data.
        break;
      }

      extractImageHeaders(images);
    }
  }

  private void extractImageHeaders(final Page<ImageEntity> images) {
    images.forEach(image -> {
      if (image.getIsHeaderExtracted()) {
        return;
      }

      // Delete every record from the 'exif_data' table where the imageId == image.id
      exifDataService.deleteAllByImageId(image.getId());

      // Construct remote image url
      final String remoteImageUrl = imageService.getRemoteImageUrlByEntity(image);

      try {
        // Fetch the image from the remote server
        final InputStream imageInputStream = ResourceUtil.toInputStream(ResourceUtil.getImageByUrl(remoteImageUrl));

        // Extract the image's header
        final Metadata metadata = ImageMetadataReader.readMetadata(imageInputStream);

        // Upload extracted information to the 'exif_data_key' table
        addNewExifKeysToDb(metadata);

        // Upload extracted information to the 'exif_data' table
        saveExifData(metadata, image);

        // Update image entity, so it's 'is_header_extracted' property could be set to 'true'.
        image.setIsHeaderExtracted(true);
        imageService.saveImage(image);

        Thread.sleep(WAIT_UNTIL_NEXT_FETCH_IN_MILI_SECS);
      } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
        throw new ImageFetcherException(ImageFetcherExceptionEnums.IMAGE_FETCHER_INTERRUPTED, e.getMessage());
      } catch (ImageProcessingException e) {
        throw new RuntimeException(e);
      } catch (IOException e) {
        throw new RuntimeException(e);
      }
    });
  }

  private void addNewExifKeysToDb(final Metadata metadata) {
    for (Directory directory : metadata.getDirectories()) {
      for (Tag tag : directory.getTags()) {
        if (isTagAndDirectoryIgnorable(directory, tag)) {
          return;
        }

        final List<ExifKeyEntity> exifKeys = exifKeyService.getExifKeys();
        final String uniqueExifKeyName = getUniqueExifKeyName(directory, tag);
        final boolean isUniqueExifKeyNameNotPresentInAnyExifKeyEntity = exifKeys.stream()
                        .noneMatch(key -> Objects.equals(key.getExifKeyName(), uniqueExifKeyName));

        if (isUniqueExifKeyNameNotPresentInAnyExifKeyEntity) {
          exifKeyService.addExifKey(uniqueExifKeyName);
        }
      }
    }
  }

  private void saveExifData(final Metadata metadata, final ImageEntity image) {
    final List<ExifKeyEntity> exifKeys = exifKeyService.getExifKeys();

    for (Directory directory : metadata.getDirectories()) {
      for (Tag tag : directory.getTags()) {
        if (isTagAndDirectoryIgnorable(directory, tag)) {
          return;
        }

        final String keyName = getUniqueExifKeyName(directory, tag);
        final ExifKeyEntity exifKey = exifKeys.stream()
                .filter(key -> Objects.equals(key.getExifKeyName(), keyName))
                .findFirst()
                .orElseThrow(() ->
                        new ExifKeyException(ExifKeyExceptionEnum.EXIF_KEY_NOT_FOUND, keyName));
        final ExifDataEntity exifData = ExifDataEntity.builder()
                .exifValue(tag.getDescription())
                .exifKey(exifKey)
                .image(image)
                .build();
        exifDataService.save(exifData);
      }
    }
  }

  private String getUniqueExifKeyName(final Directory directory, final Tag tag) {
    return String.format("[%s] %s", directory.getName(), tag.getTagName());
  }

  private boolean isTagAndDirectoryIgnorable(final Directory directory, final Tag tag) {
    return tag.getTagName().contains("Unknown tag")
            || directory.hasErrors()
            || tag.getDescription() == null
            || tag.getDescription().length() > EXIF_DATA_VALUE_MAX_LENGTH;
  }
}
