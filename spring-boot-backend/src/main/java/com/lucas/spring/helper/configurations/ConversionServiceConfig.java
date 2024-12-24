package com.lucas.spring.helper.configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ConversionServiceFactoryBean;
import org.springframework.core.convert.ConversionService;

/**
 * Configuration of the {@link org.springframework.core.convert.ConversionService},
 * so we can initialize them in the constructors.
 */
@Configuration
public class ConversionServiceConfig {
  /**
   * It will initialize a new {@link org.springframework.core.convert.ConversionService},
   * with the help of the {@link ConversionServiceFactoryBean}.
   *
   * @return a new instance of {@link org.springframework.core.convert.ConversionService}.
   */
  @Bean
  public ConversionService initConversionService() {
    return new ConversionServiceFactoryBean().getObject();
  }
}
