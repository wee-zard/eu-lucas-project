package com.lucas.spring.helper.configurations;

import java.util.Set;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.support.ConversionServiceFactoryBean;
import org.springframework.core.convert.ConversionService;
import org.springframework.core.convert.converter.Converter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuration of the {@link ConversionService},
 * so we can initialize them in the constructors.
 */
@Configuration
public class ConversionServiceConfig implements WebMvcConfigurer {
  /**
   * It will initialize a new {@link ConversionService},
   * with the help of the {@link ConversionServiceFactoryBean}. It will search for all
   * converters in the project and add them to the {@link ConversionServiceFactoryBean}.
   * With this, we have access to all converters in the project via the
   * {@link ConversionService}.
   *
   * @return a new instance of {@link ConversionService}, so we
   *     can initialize the {@link ConversionService}
   *     in the constructor and perform the convert method.
   */
  @Primary
  @Bean(name = "ConversionService")
  public ConversionService myConversionService(Set<Converter<?, ?>> converters) {
    final ConversionServiceFactoryBean factory = new ConversionServiceFactoryBean();
    factory.setConverters(converters);
    factory.afterPropertiesSet();
    return factory.getObject();
  }
}
