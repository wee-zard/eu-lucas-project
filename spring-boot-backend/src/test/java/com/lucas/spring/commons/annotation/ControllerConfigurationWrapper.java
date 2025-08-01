package com.lucas.spring.commons.annotation;

import com.lucas.spring.Application;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.SqlConfig;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_CLASS;
import static org.springframework.test.context.jdbc.SqlConfig.TransactionMode.ISOLATED;

/**
 * A custom-made annotation for the purpose wrapping multiple annotations into one
 * during the application test. This way, we do not need to repeat ourselves, and instead
 * we just need to call a simple annotation that contains all the annotations what we need
 * for initializing and cleaning up the tests.
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Sql(
        scripts = "classpath:db/sql/drop-test-tables.sql",
        config = @SqlConfig(transactionMode = ISOLATED, separator = "//"),
        executionPhase = AFTER_TEST_CLASS)
@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT,
        classes = Application.class)
@TestPropertySource(
        locations = "classpath:application-test.properties")
public @interface ControllerConfigurationWrapper {
}
