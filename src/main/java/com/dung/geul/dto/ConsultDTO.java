package com.dung.geul.dto;

import lombok.*;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ConsultDTO {
    private Long cno_num;
    private String Consult_field;
    private String Consult_detail_field;
//    private String user_id;
//    private LocalDateTime regDate;
//    private LocalDateTime modData;
}
