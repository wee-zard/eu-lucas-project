package com.lucas.spring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

/**
 * The entry class of our application.
 */
@SpringBootApplication
@EnableCaching
public class Application {
  /**
    * The entry point of our application.
    *
    * @param args the possible args for our app.
    *     Currently, we are not using any of them.
    */
  public static void main(final String[] args) {
    SpringApplication.run(Application.class, args);
  }
}
