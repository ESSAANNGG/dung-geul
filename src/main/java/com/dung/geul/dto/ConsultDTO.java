package com.dung.geul.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ConsultDTO {
    private Long cno;
    private String field;
    private String detail_field;
    private String user_id;
    private LocalDateTime regDate;
    private LocalDateTime modData;
}
