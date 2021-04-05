package com.dung.geul.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class MemberPwDTO {

    private String user_id;

    private String user_pw_old;

    private String user_pw_new;

}
