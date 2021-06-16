package com.dung.geul.dto;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class CertificateDTO {

    private Long lic_num;

    private String lic_name;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate lic_date;         // 취득일

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate lic_due_date;     // 만료일

    private LocalDateTime regDate;

    private String user_id;

}
