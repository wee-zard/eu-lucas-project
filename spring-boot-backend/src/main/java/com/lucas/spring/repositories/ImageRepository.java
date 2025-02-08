package com.lucas.spring.repositories;

import com.lucas.spring.model.entity.ImageEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * TODO: This table must be partitioned for the purpose of fetching the records faster.
 */
@Repository
public interface ImageRepository extends CrudRepository<ImageEntity, Integer> {
  /**
   * Check if the image exists in the db or not.
   * TODO: This query method should be more simpler.
   */
  @Query(nativeQuery = true, value = "SELECT image_name FROM tb_image "
          + "where image_name = :imageName "
          + "and year = :imageYear "
          + "and country_code = :imageCountryCode "
          + "and coordinate_x = :imageCoordinateX "
          + "and coordinate_y = :imageCoordinateY "
          + "and direction_name = :imageDirection")
  Optional<String> isImageAlreadyExists(
          @Param("imageYear") int year,
          @Param("imageCountryCode") String countryCode,
          @Param("imageCoordinateX") int coordinateX,
          @Param("imageCoordinateY") int coordinateY,
          @Param("imageName") String imageName,
          @Param("imageDirection") String directionName
  );

  /**
   * Fetch a {@link ImageEntity} by a name.
   *
   * @param name The name of the image.
   * @return Returns a {@link ImageEntity} object if exists.
   */
  @Query("SELECT p FROM Image p WHERE p.imageName = :name AND p.year.year = :year")
  Optional<ImageEntity> getEntityByNameAndYear(
          @Param("name") String name,
          @Param("year") Number year);
}
