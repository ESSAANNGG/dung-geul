package com.dung.geul.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CertificateDTO {
    private Long id;
    private String lic_name;
    private LocalDate lic_date;         // 취득일
    private LocalDate lic_due_date;     // 만료일
}
