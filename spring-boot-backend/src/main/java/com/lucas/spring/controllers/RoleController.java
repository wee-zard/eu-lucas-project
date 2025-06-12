package com.lucas.spring.controllers;

import com.lucas.spring.helper.helper.ConversionHelper;
import com.lucas.spring.model.dto.RoleDto;
import com.lucas.spring.model.models.AuthenticatedUser;
import com.lucas.spring.services.service.RoleService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Stores the endpoints related to the user.
 */
@RestController
@RequestMapping(path = "api/role")
@AllArgsConstructor
public class RoleController {
  private final RoleService roleService;
  private final ConversionHelper conversionHelper;

  /**
   * Get the list of roles stored inside the database.
   *
   * @return Returns the list of Roles.
   */
  @CrossOrigin
  @GetMapping("/")
  public List<RoleDto> getRoles(@RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser user) {
    return conversionHelper.convertEntityListToDtoList(
            roleService.getAll(),
            RoleDto.class
    );
  }
}
