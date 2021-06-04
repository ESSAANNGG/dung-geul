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
public class CareerDTO {
    private Long id;
    private String cr_etp_name; // 회사명
    private LocalDate cr_employment;   // 입사일
    private LocalDate cr_resignation;  // 퇴사일
    private String cr_position;     // 직위
    private String reason_resign;   // 퇴사 사유
    private int salary;          // 급여
    private String cr_task;         // 업무

}
