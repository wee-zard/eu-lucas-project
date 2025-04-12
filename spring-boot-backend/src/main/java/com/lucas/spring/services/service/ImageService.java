package com.lucas.spring.services.service;

import com.lucas.spring.model.entity.ImageEntity;
import com.lucas.spring.model.expection.ImageException;
import com.lucas.spring.model.request.ImageRequest;
import com.lucas.spring.model.request.procedures.ProcedureResultFile;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 * An interface service where we store methods
 * related to the Images.
 */
@Service
public interface ImageService {
  /**
   * Fetch the name of the image name, if the requested image name is existing already in the db.
   *
   * @param imageName The name of the image which we want to check if it is exists in the db or not.
   * @return the image name if exists else null.
   */
  boolean isImageAlreadyExists(ImageRequest imageName);

  /**
   * Save the image to the db.
   *
   * @param imageEntity the image we want to save.
   */
  ImageEntity saveImage(ImageEntity imageEntity);

  /**
   * Fetch the {@link ImageEntity} from the db
   * by the name of the image if exists.
   *
   * @param name The name of the image.
   * @param year The year when the image was taken.
   * @return Returns a {@link ImageEntity} object if exists.
   * @throws ImageException Thrown, when the image is not present in the db.
   */
  ImageEntity getImageByNameAndYear(String name, Number year);

  /**
   * Fetches the list of images based on the provided files.
   *
   * @param files The list of image files, where the name of the image and the
   *                    creation year is provided for the purpose of fetching the
   *                    image urls from the db.
   * @return Returns the images.
   */
  List<ImageEntity> getImagesByProcedureFiles(List<ProcedureResultFile> files);
}
