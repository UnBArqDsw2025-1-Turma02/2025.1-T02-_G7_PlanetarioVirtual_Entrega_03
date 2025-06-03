package com.ArqDSw.planetario_virtual_backend.configuration; 

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") 
                        .allowedOrigins("https://worthy-latia-planetario-virtual-02f6584c.koyeb.app/", 
                        "http://worthy-latia-planetario-virtual-02f6584c.koyeb.app/", 
                        "http://localhost:8080/") 
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") 
                        .allowedHeaders("*") 
                        .allowCredentials(true) 
                        .maxAge(3600); 
            }
        };
    }
}