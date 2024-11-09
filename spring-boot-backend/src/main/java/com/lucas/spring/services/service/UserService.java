package com.lucas.spring.services.service;

import com.lucas.spring.model.entity.StatusEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public interface UserService {
    /**
     * @return Returns the hashed format of the email addresses of the users.
     */
    ArrayList<String> getAllUsersEmail();

    /**
     * Save the provided email address.
     */
    void saveEmailAddress(String emailAddress, StatusEntity statusEntity);
}
