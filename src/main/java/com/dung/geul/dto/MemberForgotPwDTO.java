package com.dung.geul.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class MemberForgotPwDTO {


        private String user_id;
        private String user_email;
        private String user_phone;


}
