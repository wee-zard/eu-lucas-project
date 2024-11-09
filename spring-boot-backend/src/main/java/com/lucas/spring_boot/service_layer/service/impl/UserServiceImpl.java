package com.lucas.spring_boot.service_layer.service.impl;

import com.lucas.spring_boot.database_layer.repository.UserRepository;
import com.lucas.spring_boot.model_layer.entity.StatusEntity;
import com.lucas.spring_boot.model_layer.entity.UserEntity;
import com.lucas.spring_boot.service_layer.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    private static final String SERVICE_CACHE_NAME = "CH_USER";
    private UserRepository userRepository;
    /**
     * {@inheritDoc}
     */
    @Cacheable(SERVICE_CACHE_NAME)
    @Override
    public ArrayList<String> getAllUsersEmail() {
        return userRepository.getAllUsersEmail();
    }

    /**
     * {@inheritDoc}
     */
    @CacheEvict(SERVICE_CACHE_NAME)
    @Override
    public void saveEmailAddress(String emailAddress, StatusEntity statusEntity) {
        UserEntity userEntity = UserEntity
                .builder()
                .emailAddress(emailAddress)
                .status(statusEntity)
                .build();
        userRepository.save(userEntity);
    }
}
