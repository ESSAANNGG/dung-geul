package com.dung.geul.service;

import com.dung.geul.dto.*;
import com.dung.geul.entity.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ApplicationService {

    @Autowired
    private CvServiceImpl cvService;

    @Autowired
    private IntroduceService introduceService;

    @Autowired
    private MemberServiceImpl memberService;

    // 회원별 이력서와 자소서 리스트 보여주기
    public ApplicationModalDTO getCvAndIntro(String user_id, PageRequestDTO pageRequestDTO){

        CvPageDTO cvDTO = cvService.getCvPageDto(user_id);

        PageResultDTO<IntroduceDTO, Object[]> introduceList = introduceService.getList(pageRequestDTO, user_id);

        ApplicationModalDTO applicationModalDTO = new ApplicationModalDTO(cvDTO, introduceList);

        return applicationModalDTO;

    }
//
//    // 온라인 지원버튼 누르면 이력서와 자소서 저장하기
//    public int save(){
//
//    }


}
