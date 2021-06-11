package com.dung.geul.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AllowEtpDTO {

    private String user_id;

    private String user_name;

    private String etp_name;    // 기업명

    private String etp_num;

    private String user_email;

    private String user_emailDomain;

    private String user_regdate;

    private String user_ph;

    private String user_ph2;

    private String user_ph3;

    private String user_type;

    private String user_shape;

    public AllowEtpDTO(String user_id){
        this.user_id = user_id;
    }

    @QueryProjection
    public AllowEtpDTO(String user_id,
                       String user_name,
                       String etp_name,
                       String etp_num,
                       String user_email,
                       String user_emailDomain,
                       String user_regdate,
                       String user_ph,
                       String user_ph2,
                       String user_ph3,
                       String user_type){

        this.user_id = user_id;
        this.user_name = user_name;
        this.user_email = user_email;
        this.user_emailDomain = user_emailDomain;
        this.user_regdate= user_regdate;
        this.user_ph = user_ph;
        this.user_ph2 = user_ph2;
        this.user_ph3 = user_ph3;
        this.user_type = user_type;
        this.etp_name = etp_name;
        this.etp_num = etp_num;
    }


}
