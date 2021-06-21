package com.dung.geul.service;

import com.dung.geul.dto.*;
import com.dung.geul.entity.*;
import com.dung.geul.repository.ApplyRepository;
import com.dung.geul.repository.EmployRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@Log4j2
public class ApplicationService {

    @Autowired
    private ApplyRepository applyRepository;

    @Autowired
    private CvServiceImpl cvService;

    @Autowired
    private IntroduceService introduceService;

    @Autowired
    private EmployRepository employRepository;

    @Autowired
    private MemberServiceImpl memberService;

    // 회원별 이력서와 자소서 리스트 보여주기
    public ApplicationModalDTO getCvAndIntro(String user_id, PageRequestDTO pageRequestDTO){

        CvPageDTO cvDTO = cvService.getCvPageDto(user_id);

        PageResultDTO<IntroduceDTO, Object[]> introduceList = introduceService.getList(pageRequestDTO, user_id);

        ApplicationModalDTO applicationModalDTO = ApplicationModalDTO.builder()
                .cv(cvDTO)
                .introduceDTOList(introduceList)
                .build();

        return applicationModalDTO;

    }

    // 온라인 지원버튼 누르면 이력서와 자소서 저장하기
    public ResponseEntity save(ApplicationModalDTO dto){

        try {

            CV cv = cvService.getCv(dto.getCv_id());
            Introduce intro = introduceService.getIntroduce(dto.getIntro_id());
            Employ employ = employRepository.findById(dto.getEmploy_num()).get();

            Apply apply = Apply.builder()
                    .ap_date(LocalDateTime.now())
                    .ap_area(dto.getAp_area())
                    .ap_task(dto.getAp_task())
                    .em_num(employ)
                    .build();

            applyRepository.save(apply);

            return new ResponseEntity(1, HttpStatus.OK);

        } catch (Exception e){
            log.info("error : " + e);

            return new ResponseEntity(0, HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }


}
