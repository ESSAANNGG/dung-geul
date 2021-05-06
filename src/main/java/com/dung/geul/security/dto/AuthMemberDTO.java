package com.dung.geul.security.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

@Setter
@Getter
@ToString
public class AuthMemberDTO extends User {

    private String user_id;

    private String user_name;

    private String user_pw;

    private String user_ph;

    private String user_ph2;

    private String user_ph3;

    private String user_postcode;

    private String user_addr;

    private String user_addr_details;

    private String user_email;

    private String user_emailDomain;

    private String user_dept;  // 학생 소속 계열

    private String user_grade; // 학년 소속 학년

    private String user_class; // 학생 소속 반

    private String user_job; //직장

    private String user_type;   // 회원 구분

    public AuthMemberDTO(
            String username,
            String password,
            Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
        this.user_id = username;
    }


}
