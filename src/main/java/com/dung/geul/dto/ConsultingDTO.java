package com.dung.geul.dto;


import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Builder

public class ConsultingDTO {
    private Long consult_num;
    private Long cno;
    private String type;
    private String name;
    private String con_user_id;
    private String con_user_name;
    private LocalDateTime consult_date;
    private String consult_time;
    private int approve;

    public ConsultingDTO(Long consult_num){this.consult_num=consult_num;}

    @QueryProjection
    public ConsultingDTO(Long consult_num,
                         Long cno,
                         String type,
                         String name,
                         String con_user_id,
                         String con_user_name,
                         LocalDateTime consult_date,
                         String consult_time,
                         int approve
    ){
        this.consult_num=consult_num;
        this.cno=cno;
        this.type=type;
        this.name=name;
        this.con_user_id=con_user_id;
        this.con_user_name=con_user_name;
        this.consult_date=consult_date;
        this.consult_time=consult_time;
        this.approve=approve;
    }

}
