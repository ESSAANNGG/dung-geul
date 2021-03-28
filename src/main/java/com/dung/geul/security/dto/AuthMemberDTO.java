package com.dung.geul.security.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

@Setter
@Getter
public class AuthMemberDTO extends User {

    private String user_id;

    private String user_name;

    private String user_pw;

    private String user_ph;

    private String user_postcode;

    private String user_addr;

    private String user_addr_details;

    private String user_email;

    private String user_dept;  // 교수 소속계열, 학생소속계열

    private String user_grade; // 학년

    private String user_class; // 교수,학생 담당반

    private String user_job; //직장

    public AuthMemberDTO(
            String username,
            String password,
            Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
        this.user_id = username;
    }


}
