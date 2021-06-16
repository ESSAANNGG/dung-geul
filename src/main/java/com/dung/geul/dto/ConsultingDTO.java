package com.dung.geul.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@ToString
@AllArgsConstructor
@Builder

public class ConsultingDTO {
    private Long consult_num;
    private Long cno;
    private String type;
    private String name;
    private String con_user_id;
    private String con_user_name;
    private String consult_date;
    private String consult_time;
}
