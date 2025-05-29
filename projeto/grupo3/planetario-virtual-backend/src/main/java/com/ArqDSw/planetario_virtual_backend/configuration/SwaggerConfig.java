package com.ArqDSw.planetario_virtual_backend.configuration;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public GroupedOpenApi onlyUserController() {
        return GroupedOpenApi.builder()
            .group("user-api")
            .packagesToScan("com.ArqDSw.planetario_virtual_backend.controller")
            .build();
    }
}