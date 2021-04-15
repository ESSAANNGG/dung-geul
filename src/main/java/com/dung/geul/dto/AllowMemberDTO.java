package com.dung.geul.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Data
@Builder
public class AllowMemberDTO {

    private String user_id;

    private String etp_name;

    private String etp_num;

    private String user_allow;

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:MM:SS")
    private LocalDateTime user_regdate;
}
