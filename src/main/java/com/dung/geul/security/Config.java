package com.dung.geul.security;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

//스프링이 컴포넌트 스캔을 통해 Bean에 등록을 해주면 스프링 컨테이너에서 객체를 관리할 수 있다 (IoC관리가 된다)

@Configuration
@EnableWebSecurity // 시큐리티 필터가 등록된다
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true) // 특정 주소로 접근하면 권한 및 인증을 미리 체크하겠다
public class Config extends WebSecurityConfigurerAdapter {
    //  스프링 시큐리티 설정은 해당 파일에서 하면 된다

    @Bean
    public BCryptPasswordEncoder encodePW(){
        return new BCryptPasswordEncoder();
    }



    @Override
    protected void configure(HttpSecurity http) throws Exception{

        // 권한별 접근 지정하기 (permitAll = 권한 확인 안함)
        http.authorizeRequests()
                .anyRequest().permitAll();

        http.csrf().disable();

        // 로그인 처리 지정하기
        http.formLogin().loginPage("/login")            // controller mapping
                .loginProcessingUrl("/loginProc")       // loginProc 주소가 들어오면 springsecurity가 로그인을 대신 진행한다
                .defaultSuccessUrl("/");
        //http.rememberMe().tokenValiditySeconds(60*60*7).userDetailsService(principalDatail);

    }
}