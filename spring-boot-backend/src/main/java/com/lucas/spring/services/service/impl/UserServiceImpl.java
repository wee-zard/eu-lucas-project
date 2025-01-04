package com.lucas.spring.services.service.impl;

import com.lucas.spring.database.repositories.UserRepository;
import com.lucas.spring.model.entity.StatusEntity;
import com.lucas.spring.model.entity.UserEntity;
import com.lucas.spring.model.models.AuthenticatedUser;
import com.lucas.spring.services.service.UserService;
import java.util.ArrayList;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

/**
 * Methods related to the Users.
 */
@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService {
  private static final String SERVICE_CACHE_NAME = "CH_USER";
  private UserRepository userRepository;

  /**
   * {@inheritDoc}
   */
  @Override
  public UserEntity getUserById(final Long userId) {
    // TODO: Better error message here
    return userRepository
            .findById(userId)
            .orElseThrow(() -> new RuntimeException("User is not found!"));
  }

  /**
   * {@inheritDoc}
   */
  @Cacheable(SERVICE_CACHE_NAME)
  @Override
  public ArrayList<AuthenticatedUser> getAllUsersEmail() {
    return userRepository.getAllUsersEmail();
  }

  /**
   * {@inheritDoc}
   */
  @CacheEvict(SERVICE_CACHE_NAME)
  @Override
  public void saveEmailAddress(
          final String emailAddress,
          final StatusEntity statusEntity
  ) {
    saveEmailAddressByProvidedParams(emailAddress, statusEntity, null);
  }

  /**
   * {@inheritDoc}
   */
  @CacheEvict(SERVICE_CACHE_NAME)
  @Override
  public void saveEmailAddressWithUserName(
          final String emailAddress,
          final StatusEntity statusEntity,
          final String userName
  ) {
    saveEmailAddressByProvidedParams(emailAddress, statusEntity, userName);
  }

  private void saveEmailAddressByProvidedParams(
          final String emailAddress,
          final StatusEntity statusEntity,
          final String userName
  ) {
    UserEntity userEntity = UserEntity
            .builder()
            .emailAddress(emailAddress)
            .userName(userName)
            .status(statusEntity)
            .build();
    userRepository.save(userEntity);
  }
}
