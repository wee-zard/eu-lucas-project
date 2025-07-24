package com.lucas.spring.components;

import com.lucas.spring.commons.annotation.ControllerConfigurationWrapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;

import static org.assertj.core.api.Assertions.assertThat;

@ControllerConfigurationWrapper
class RoleControllerTests {

  @LocalServerPort
  private int port;

  @Autowired
  private TestRestTemplate restTemplate;

  @Test
  void greetingShouldReturnDefaultMessage() throws Exception {
    assertThat(this.restTemplate.getForObject("http://localhost:" + port + "/",
            String.class)).contains("Hello, World");
  }

  /*
  @Test
  void shouldReturnAdminView() throws Exception {
    final String endpoint = String.format("http://localhost:%d/api/role/", port);
    ResponseEntity<String> response = restTemplate.getForEntity(endpoint, String.class);
    Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
  }
  */
}
