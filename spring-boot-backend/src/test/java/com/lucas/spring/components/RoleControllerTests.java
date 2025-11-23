package com.lucas.spring.components;

import com.lucas.spring.commons.annotation.ControllerConfigurationWrapper;
import com.lucas.spring.commons.exception.abstraction.BaseException;
import com.lucas.spring.commons.services.CustomConversionService;
import com.lucas.spring.commons.utils.GeneratorUtil;
import com.lucas.spring.commons.utils.JsonUtil;
import com.lucas.spring.components.role.enums.RoleExceptionEnum;
import com.lucas.spring.components.role.exception.RoleException;
import com.lucas.spring.components.role.model.dto.RoleDto;
import com.lucas.spring.components.role.model.entity.RoleEntity;
import com.lucas.spring.components.role.service.RoleService;
import org.assertj.core.util.Lists;
import org.json.simple.parser.ParseException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.fail;

@ControllerConfigurationWrapper
class RoleControllerTests {

  @LocalServerPort
  private int port;

  @Autowired
  private TestRestTemplate restTemplate;

  @Autowired
  private CustomConversionService conversionService;

  @Autowired
  private RoleService roleService;

  /*
  @Test
  void greetingShouldReturnDefaultMessage() throws Exception {
    assertThat(this.restTemplate.getForObject("http://localhost:" + port + "/",
            String.class)).contains("Hello, World");
  }
  */

  @Test
  void validateNumberOfRoles() {
    final List<RoleEntity> roles = roleService.getAll();

    // Expecting the number of roles to be exactly 3.
    assertThat(roles).hasSize(3);
  }

  @Test
  void isAdminUserExists() {
    validateIfRoleIdExists(1L);
  }

  @Test
  void isProfessorExists() {
    validateIfRoleIdExists(2L);
  }

  @Test
  void isStudentExists() {
    validateIfRoleIdExists(3L);
  }

  @Test
  void validateInvalidRoles() {
    Lists.newArrayList(0L, 4L, 5L, 6L, null)
            .forEach(roleId -> {
      try {
        roleService.getById(roleId);

        // If no error was thrown, then fail the test.
        fail("No error was thrown by the provided role id!");
      } catch (final RoleException exception) {
        try {
          Map<String, String> res = JsonUtil.parseJsonStringToMap(exception.getMessage());
          assertThat(res).hasSize(2);
          assertThat(res).containsEntry(BaseException.getErrorKey(), String.valueOf(RoleExceptionEnum.NOT_FOUND));
          assertThat(res).containsEntry(BaseException.getErrorMessageParamById(0), String.valueOf(roleId));
        } catch (ParseException e) {
          failTestByUnknownError();
        }
      } catch (final Exception exception) {
        failTestByUnknownError();
      }
    });
  }

  @Test
  void validateRoleConverter() {
    // Test out the converter with random entities that are not present in the db.
    final int numberOfTimesToCreateRandomEntities = 100;

    for (int i = 0; i < numberOfTimesToCreateRandomEntities; i++) {
      validateConvertedRoleEntity(RoleEntity.builder()
              .id(GeneratorUtil.generateRandomInteger(GeneratorUtil.RANDOM_INT_LENGTH))
              .roleName(GeneratorUtil.generateRandomString(GeneratorUtil.RANDOM_STRING_LENGTH))
              .build());
    }

    // Test out the converter with live data from the db.
    roleService.getAll().forEach(this::validateConvertedRoleEntity);
  }

  /**
   * Fetches one specific role from the db provided by the param
   * and validates whether its exists.
   *
   * @param roleId The id of the role.
   */
  private void validateIfRoleIdExists(final Long roleId) {
    assertThat(Optional.ofNullable(roleService.getById(roleId))).isPresent();
  }

  /**
   * Based on the provided role entity, converts it into a {@link RoleDto},
   * and validates the {@link RoleDto}.
   */
  private void validateConvertedRoleEntity(final RoleEntity roleEntity) {
    final RoleDto roleDto = conversionService.convert(roleEntity, RoleDto.class);
    assertThat(roleDto).isNotNull();
    assertThat(roleDto).isExactlyInstanceOf(RoleDto.class);
    assertThat(roleDto.getId()).isNotNegative().isEqualTo(roleEntity.getId());
    assertThat(roleDto.getRoleName()).isNotNull().isEqualTo(roleEntity.getRoleName());

    try {
      // Creates a map for the fields of the RoleDto.
      final Map<String, String> map = JsonUtil.parseObjectIntoMap(roleDto);
      // The RoleDto must possess two fields in the map.
      assertThat(map).hasSize(2);
      // The 'id' field of the RoleDto must be included in the map.
      assertThat(map).containsEntry("id", String.valueOf(roleEntity.getId()));
      // The 'roleName' field of the RoleDto must be included in the map.
      assertThat(map).containsEntry("roleName", roleEntity.getRoleName());
    } catch (ParseException e) {
      failTestByUnknownError();
    }
  }

  private void failTestByUnknownError() {
    fail("Unknown error was caught!");
  }
}
