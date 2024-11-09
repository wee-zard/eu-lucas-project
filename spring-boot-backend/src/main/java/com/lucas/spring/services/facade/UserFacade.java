package com.lucas.spring.services.facade;

import org.springframework.stereotype.Service;

@Service
public interface UserFacade {
    /**
     * ...
     * @param emailAddress the user's gmail address.
     */
    boolean isEmailRegisteredInDB(String emailAddress);

    /**
     * Adding a user's email address to the db.
     * @param emailAddress the user's gmail address.
     */
    void saveEmailAddress(String emailAddress);
}
