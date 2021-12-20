package com.nahalit.nahalapimanager;

import com.nahalit.nahalapimanager.apiconfig.AppConfig;
import com.nahalit.nahalapimanager.interceptor.AuthInterceptor;
import com.nahalit.nahalapimanager.storage.StorageProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
public class Application extends SpringBootServletInitializer implements WebMvcConfigurer {

    public static void main(String[] args) {
        System.setProperty("server.servlet.context-path", AppConfig.CONTEXT_PATH);
        System.setProperty("server.port", AppConfig.SERVER_PORT);
        SpringApplication.run(Application.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(Application.class);
    }

// Initialization action for file
//  @Bean
//  CommandLineRunner init(StorageService storageService) {
//    return (args) -> {
////            storageService.deleteAll();
////            storageService.init();
//    };
//  }

    @Autowired
    private AuthInterceptor authInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        registry.addInterceptor(authInterceptor)
                .addPathPatterns(AppConfig.FILTERRING_PATH_PATTERNS)
                .excludePathPatterns(Arrays.asList(AppConfig.NONFILTERRING_PATH_PATTERNS));
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins("*").allowedMethods("*");
    }
}
