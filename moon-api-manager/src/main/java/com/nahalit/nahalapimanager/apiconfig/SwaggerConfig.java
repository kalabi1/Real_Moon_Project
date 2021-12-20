package com.nahalit.nahalapimanager.apiconfig;

import com.google.common.collect.Lists;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import springfox.bean.validators.configuration.BeanValidatorPluginsConfiguration;
import springfox.documentation.builders.ParameterBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.service.Parameter;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;
import java.util.List;

@Configuration
@EnableSwagger2
@Import(BeanValidatorPluginsConfiguration.class)
public class SwaggerConfig {
    @Bean
    public Docket apiDocket() {
        //Adding TOKEN Header
        ParameterBuilder tokenParameterBuilder = new ParameterBuilder();
        tokenParameterBuilder.name("TOKEN")                 // name of header
                .modelRef(new ModelRef("string"))
                .parameterType("header")               // type - header
                .required(true)                // for compulsory
                .build();
        //Adding Header
//        ParameterBuilder contentParameterBuilder = new ParameterBuilder();
//        contentParameterBuilder.name("Content-Type")                 // name of header
//                .modelRef(new ModelRef("string"))
//                .parameterType("header")               // type - header
//                .required(true)                // for compulsory
//                .build();

        List<Parameter> parameters = new ArrayList<>();
        parameters.add(tokenParameterBuilder.build());
//        parameters.add(contentParameterBuilder.build());

        return new Docket(DocumentationType.SWAGGER_2)
//                .host("localhost")
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build()
                .globalOperationParameters(parameters)
                .apiInfo(metaInfo());
    }

    private ApiInfo metaInfo() {
        ApiInfo apiInfo = new ApiInfo(
                "Nahal API Manager",
                "Nahal Real Estate API Manager",
                "1.0",
                "www.nahalit.com",
                new Contact("Nahal IT", "www.nahalit.com", "info@nahalit.com"),
                "Nahal Real Estate License version 2.0",
                "www.nahalit.com",
                Lists.newArrayList()
        );
        return apiInfo;
    }
}
