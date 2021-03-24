package com.dung.geul;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class GeulApplication {

    public static void main(String[] args) {
        SpringApplication.run(GeulApplication.class, args);
    }

}
