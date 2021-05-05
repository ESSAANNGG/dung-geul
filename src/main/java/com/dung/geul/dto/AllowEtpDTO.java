package com.dung.geul.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AllowEtpDTO {

    private String user_id;

    private String user_name;

    private String etp_name;    // 기업명

    private String etp_num;

    private String user_email;

    private String user_regdate;

    private String user_ph;

    private String user_type;

    public AllowEtpDTO(String user_id){
        this.user_id = user_id;
    }

}
