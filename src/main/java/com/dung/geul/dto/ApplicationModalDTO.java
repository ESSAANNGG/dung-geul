package com.dung.geul.dto;

import lombok.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ApplicationModalDTO {

    private CvPageDTO cv;

    private PageResultDTO<IntroduceDTO, Object[]> introduceDTOList;

    private Long cv_id;
    private Long intro_id;
    private String ap_area;
    private String ap_task;
    private String ap_pass;

    private Long employ_num;  // 공고번호

}
