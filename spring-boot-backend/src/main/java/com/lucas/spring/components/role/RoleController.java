package com.lucas.spring.components.role;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.commons.services.CustomConversionService;
import com.lucas.spring.components.role.model.dto.RoleDto;
import com.lucas.spring.components.role.service.RoleService;
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
  private final CustomConversionService conversionService;

  /**
   * Get the list of roles stored inside the database.
   *
   * @return Returns the list of Roles.
   */
  @CrossOrigin
  @GetMapping("/")
  public List<RoleDto> getRoles(
          @RequestHeader(HttpHeaders.AUTHORIZATION) final AuthenticatedUser user
  ) {
    return conversionService.convert(roleService.getAll(), RoleDto.class);
  }
}
