package com.dung.geul;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.stereotype.Controller;

@SpringBootApplication
@EnableJpaAuditing
public class GeulApplication {

    public static void main(String[] args) {
        SpringApplication.run(GeulApplication.class, args);
    }

}
