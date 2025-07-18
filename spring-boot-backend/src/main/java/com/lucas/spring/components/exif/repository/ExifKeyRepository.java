package com.lucas.spring.components.exif.repository;

import com.lucas.spring.components.exif.model.entity.ExifKeyEntity;
import java.util.ArrayList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Repository of the {@link ExifKeyEntity}.
 */
@Repository
public interface ExifKeyRepository extends JpaRepository<ExifKeyEntity, Long> {
}
