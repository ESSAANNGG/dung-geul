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
    private Long cno;
    private String Consult_field;
    private String Consult_detail_field;
    private LocalDateTime consult_regDate;
    private LocalDateTime consult_modData;
}
