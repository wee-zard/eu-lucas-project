package com.lucas.spring.services.service.impl;

import com.lucas.spring.model.entity.RoleEntity;
import com.lucas.spring.model.entity.StatusEntity;
import com.lucas.spring.model.entity.UserEntity;
import com.lucas.spring.model.enums.UserExceptionEnum;
import com.lucas.spring.model.expection.UserException;
import com.lucas.spring.model.models.AuthenticatedUser;
import com.lucas.spring.repositories.UserRepository;
import com.lucas.spring.services.service.UserService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

/**
 * Methods related to the Users.
 */
@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
  private static final String SERVICE_CACHE_NAME = "CH_USER";
  private static final String SERVICE_CACHE_NAME_EMAIL = "CH_USER_EMAILS";
  private UserRepository userRepository;

  /**
   * {@inheritDoc}
   */
  @Override
  public UserEntity getUserById(final Long id) throws RuntimeException {
    return this.userRepository
            .findById(id)
            .orElseThrow(() -> new UserException(UserExceptionEnum.NOT_FOUND, String.valueOf(id)));
  }

  /**
   * {@inheritDoc}
   */
  @Override
  @Cacheable(SERVICE_CACHE_NAME_EMAIL)
  public List<AuthenticatedUser> getAllUsersEmail() {
    return userRepository.getAllUsersEmail();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  @Cacheable(SERVICE_CACHE_NAME)
  public List<UserEntity> getUsers() {
    return userRepository.findAll();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  @CacheEvict(cacheNames = { SERVICE_CACHE_NAME, SERVICE_CACHE_NAME_EMAIL }, allEntries = true)
  public void saveUser(final String email, final String username, final StatusEntity status, final RoleEntity role) {
    UserEntity userEntity = UserEntity
            .builder()
            .emailAddress(email)
            .userName(username)
            .status(status)
            .role(role)
            .build();
    userRepository.save(userEntity);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  @CacheEvict(cacheNames = { SERVICE_CACHE_NAME, SERVICE_CACHE_NAME_EMAIL }, allEntries = true)
  public void saveUser(final UserEntity user) {
    userRepository.save(user);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  @CacheEvict(cacheNames = { SERVICE_CACHE_NAME, SERVICE_CACHE_NAME_EMAIL }, allEntries = true)
  public void activateUser(
          final Long id,
          final String username,
          final String imageBase64,
          final StatusEntity status
  ) throws RuntimeException {
    final UserEntity user = this.getUserById(id);
    user.setUserName(username);
    user.setProfilePictureBase64(imageBase64);
    user.setStatus(status);
    userRepository.save(user);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  @CacheEvict(cacheNames = { SERVICE_CACHE_NAME, SERVICE_CACHE_NAME_EMAIL }, allEntries = true)
  public void deleteUser(Long id) {
    userRepository.deleteById(id);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  @CacheEvict(cacheNames = { SERVICE_CACHE_NAME, SERVICE_CACHE_NAME_EMAIL }, allEntries = true)
  public void deleteUser(UserEntity user) {
    userRepository.delete(user);
  }
}
