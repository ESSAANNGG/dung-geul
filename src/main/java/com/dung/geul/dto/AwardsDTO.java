package com.dung.geul.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AwardsDTO {

    private String awards_des;      // 수상명
    private String awards_agency;   // 수여기관
    private String awards_date;     // 수상년도
    private String award_contents;  // 수여내용

}
