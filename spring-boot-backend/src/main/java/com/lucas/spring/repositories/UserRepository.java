package com.lucas.spring.repositories;

import com.lucas.spring.model.entity.UserEntity;
import com.lucas.spring.model.models.AuthenticatedUser;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Repository of the users and the user table.
 */
@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
  /**
   * Get the list of all hashed emails from the ssb.
   *
   * @return Returns every hashed emails.
   */
  @Query("SELECT new com.lucas.spring.model.models.AuthenticatedUser("
          + "u.emailAddress, u.id, u.role.id) FROM User u")
  List<AuthenticatedUser> getAllUsersEmail();
}
