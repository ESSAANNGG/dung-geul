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

    private String user_id;

    private String user_name;

    private String consult_date;

//    private LocalDateTime a;
}
