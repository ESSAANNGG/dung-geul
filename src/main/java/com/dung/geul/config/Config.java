package com.dung.geul.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.thymeleaf.extras.springsecurity5.dialect.SpringSecurityDialect;

//스프링이 컴포넌트 스캔을 통해 Bean에 등록을 해주면 스프링 컨테이너에서 객체를 관리할 수 있다 (IoC관리가 된다)

@Configuration
@EnableWebSecurity // 시큐리티 필터가 등록된다
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true) // 특정 주소로 접근하면 권한 및 인증을 미리 체크하겠다
public class Config extends WebSecurityConfigurerAdapter {
    //  스프링 시큐리티 설정은 해당 파일에서 하면 된다

    @Bean
    public SpringSecurityDialect springSecurityDialect(){
        return new SpringSecurityDialect();
    }

    @Bean
    public BCryptPasswordEncoder encodePW(){
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception{
        // 권한별 주소 접근 설정

        http.csrf().disable()
                .authorizeRequests()
//                .antMatchers("/application/cv/**").hasRole("STUDENT")
//                .antMatchers("/mypage/**").hasRole("USER")
//                .antMatchers("/allow/**").hasRole("ADMIN")
                .anyRequest().permitAll();


        // 로그인 설정
        http.formLogin()
                .loginPage("/login")
                .loginProcessingUrl("/loginProc")
                .defaultSuccessUrl("/");
        //http.rememberMe().tokenValiditySeconds(60*60*7).userDetailsService(principalDatail);

        http.logout().logoutSuccessUrl("/");

    }


}
