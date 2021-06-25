package com.dung.geul.dto.apply;

import com.dung.geul.dto.cv.CvPageDTO;
import com.dung.geul.dto.IntroduceDTO;
import com.dung.geul.dto.PageResultDTO;
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
