package com.lucas.spring_boot.service_layer.facade.impl;


import com.lucas.spring_boot.model_layer.entity.StatusEntity;
import com.lucas.spring_boot.model_layer.enums.StatusEnum;
import com.lucas.spring_boot.model_layer.expection.EncryptionFailedException;
import com.lucas.spring_boot.service_layer.facade.UserFacade;
import com.lucas.spring_boot.service_layer.service.EncryptionService;
import com.lucas.spring_boot.service_layer.service.StatusService;
import com.lucas.spring_boot.service_layer.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class UserFacadeImpl implements UserFacade {
    private EncryptionService encryptionService;
    private UserService userService;
    private StatusService statusService;
    /**
     * {@inheritDoc}
     */
    @Override
    public boolean isEmailRegisteredInDB(String emailAddress) {
        return userService.getAllUsersEmail()
            .stream()
            .map(hashedEmail -> encryptionService.decrypt(hashedEmail))
            .collect(Collectors.toCollection(ArrayList::new)
            ).stream()
            .anyMatch(nonHashedEmail -> nonHashedEmail != null && nonHashedEmail.split(" ")[0].equals(emailAddress));
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void saveEmailAddress(String emailAddress) {
        StatusEntity statusEntity = statusService.getStatusById(StatusEnum.PENDING.getStatusId());
        String encryptedString = encryptionService.encrypt(emailAddress);
        if (encryptedString != null) {
            userService.saveEmailAddress(encryptedString, statusEntity);
        } else {
            throw new EncryptionFailedException();
        }
    }
}
