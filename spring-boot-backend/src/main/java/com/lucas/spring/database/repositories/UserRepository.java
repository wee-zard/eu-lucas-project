package com.lucas.spring.database.repositories;

import com.lucas.spring.model.entity.UserEntity;
import java.util.ArrayList;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository of the users and the user table.
 */
@Repository
public interface UserRepository extends CrudRepository<UserEntity, Long> {
  @Query("SELECT user.emailAddress FROM User user")
  ArrayList<String> getAllUsersEmail();
}
