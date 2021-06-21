package com.dung.geul.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplicationModalDTO {

    private CvPageDTO cv;

    private PageResultDTO<IntroduceDTO, Object[]> introduceDTOList;

}
