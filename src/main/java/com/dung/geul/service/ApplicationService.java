package com.dung.geul.service;

import com.dung.geul.dto.*;
import com.dung.geul.dto.apply.ApplicationModalDTO;
import com.dung.geul.dto.apply.ApplyStudentDTO;
import com.dung.geul.entity.*;
import com.dung.geul.repository.ApplyRepository;
import com.dung.geul.repository.EmployRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.function.Function;

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

        System.out.println("return : " + applicationModalDTO);

        return applicationModalDTO;

    }

    // 온라인 지원버튼 누르면 이력서와 자소서 저장하기
    public ResponseEntity save(ApplicationModalDTO dto){

        try {

            System.out.println("save - applicaionModalDTO : " + dto);

            CV cv = cvService.getCv(dto.getCv_id());

            System.out.println("cv: " + cv);

            Introduce intro = introduceService.getIntroduce(dto.getIntro_id());

            System.out.println("introduce: " + intro);

            Employ employ = employRepository.getOne(dto.getEmploy_num());

            System.out.println("employ : " + employ);


            Apply apply = Apply.builder()
                    .ap_date(LocalDateTime.now())   // 입사지원 일자
                    .ap_area(dto.getAp_area())      // 희망근무지역
                    .ap_task(dto.getAp_task())      // 희망업무
                    .employ(employ)                 // 채용공고
                    .cv(cv)                         // 이력서
                    .introduce(intro)               // 자소서
                    .ap_pass("대기중")                 // 합격여부(대기중, 합격, 불합격, 취소)
                    .build();

            System.out.println("apply : " + apply);

            applyRepository.save(apply);

            return new ResponseEntity(1, HttpStatus.OK);

        } catch (Exception e){
            log.info("error : " + e);

            return new ResponseEntity(0, HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

    // 학생회원한테 지원현황 목록 보여주기
    public PageResultDTO<ApplyStudentDTO, Object[]> getStudentApplyListPageDTO(PageRequestDTO pageRequestDTO, String user_id){

        // page랑 function으로 pageResultDTO 반환

        Pageable pageable = pageRequestDTO.getPageable(Sort.by("ap_date"));

        Member member = memberService.getMember(user_id);

        Page<Object[]> pageResult = applyRepository.findByMember(pageable, member);

        Function<Object[], ApplyStudentDTO> fn = (en -> entityToApplyStudentDTO((Apply) en[0], (Employ) en[1], (Enterprise) en[2]) );

        PageResultDTO<ApplyStudentDTO, Object[]> pageResultDTO = new PageResultDTO<ApplyStudentDTO, Object[]>(pageResult, fn);

        return pageResultDTO;
    }


    // 학생회원에게 지원 목록 보여주는 DTO 생성
    public ApplyStudentDTO entityToApplyStudentDTO(Apply ap, Employ em, Enterprise etp){

        String apDate = ap.getAp_date().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));


        ApplyStudentDTO dto = ApplyStudentDTO.builder()
                .etp_id(etp.getEtp_id())
                .etp_num(etp.getEtp_num())
                .etp_name(etp.getEtp_name())

                .emp_num(em.getNum())
                .emp_title(em.getTitle())
                .emp_content(em.getContent())

                .ap_date(apDate)
                .cv_id(ap.getCv().getCv_id())
                .intro_num(ap.getIntroduce().getNum())
                .ap_pass(ap.getAp_pass())
                .build();

        return dto;
    }


    // 채용공고별 입사지원 리스트 페이지 보여주기
//    public PageResultDTO<>


}
