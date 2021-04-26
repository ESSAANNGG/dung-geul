package com.dung.geul.dto;

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

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:MM:SS")
    private LocalDateTime user_regdate;

    public AllowEtpDTO(String user_id){
        this.user_id = user_id;
    }

}
