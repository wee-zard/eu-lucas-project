package com.lucas.spring.helper.configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

/**
 * Configuration file of the Thymeleaf, so we could
 * load templates for the email service.
 */
@Configuration
public class ThymeleafConfig implements WebMvcConfigurer {
  /**
   * A template resolver to fetch html templates from the resource folder and send
   * them to via email to an address.
   *
   * @return ...
  */
  @Bean
  public ClassLoaderTemplateResolver templateResolver() {
    ClassLoaderTemplateResolver resolver = new ClassLoaderTemplateResolver();
    // Location of thymeleaf template
    resolver.setPrefix("templates/");
    // Turning of cache to facilitate template changes
    resolver.setCacheable(false);
    // Template file extension
    resolver.setSuffix(".html");
    // Template Type
    resolver.setTemplateMode("HTML");
    resolver.setCharacterEncoding("UTF-8");
    return resolver;
  }

  /**
   * It will initialize a new templateEngine in the constructor.
   *
   * @return ...
   */
  @Bean
  public TemplateEngine templateEngine() {
    TemplateEngine engine = new TemplateEngine();
    engine.setTemplateResolver(templateResolver());
    return engine;
  }
}
