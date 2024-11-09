package com.lucas.spring_boot.database_layer.repository;

import com.lucas.spring_boot.model_layer.entity.UserEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface UserRepository extends CrudRepository<UserEntity, Long> {
    @Query("SELECT user.emailAddress FROM User user")
    ArrayList<String> getAllUsersEmail();
}
