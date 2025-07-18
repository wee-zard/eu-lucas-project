package com.lucas.spring.components.year.service;

import com.lucas.spring.components.year.model.entity.CreationYearEntity;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 * An interface service where we store methods
 * related to the Creation Years.
 */
@Service
public interface CreationYearService {
  /**
   * Fetch the list of creation years when the images were taken from.
   *
   * @return list of years.
   */
  List<CreationYearEntity> getCreationYears();

  /**
   * Fetch a single year when the image was taken from.
   *
   * @param yearToFetch The year to fetch from the db.
   * @return a direction.
   */
  CreationYearEntity getCreationYear(int yearToFetch);

  /**
   * Add a creation year to the db.
   *
   * @param creationYear The year the image is created.
   */
  void addCreationYear(int creationYear);

  /**
   * Checks if the provided year is already exists in the db. If not, then we
   * add this new year in to the db.
   *
   * @param creationYear The year the image is created.
   */
  void isCreationYearIncludedInTheDb(int creationYear);
}
