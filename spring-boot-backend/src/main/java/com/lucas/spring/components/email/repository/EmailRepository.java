package com.lucas.spring.components.email.repository;

import com.lucas.spring.components.email.model.entity.EmailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository of the emails.
 */
@Repository
public interface EmailRepository extends JpaRepository<EmailEntity, Long>  {
}
