package com.dung.geul.service;

import com.dung.geul.dto.IntroduceDTO;
import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.dto.SearchDTO;
import com.dung.geul.dto.apply.ApplicationModalDTO;
import com.dung.geul.dto.apply.ApplyStudentDTO;
import com.dung.geul.dto.cv.CvPageDTO;
import com.dung.geul.entity.*;
import com.dung.geul.repository.ApplyRepository;
import com.dung.geul.repository.EmployRepository;
import com.dung.geul.repository.search.SearchApplyRepository;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
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

    @Autowired
    private SearchApplyRepository searchApplyRepository;

    // 기업회원에게 지원 목록 보여주는 DTO 생성
    public ApplyStudentDTO entityToApplyStudentDTO(Apply ap, CV c){

        ApplyStudentDTO dto = ApplyStudentDTO.builder()
                .ap_date(ap.getApDate().format(DateTimeFormatter.ISO_DATE))
                .cv_id(ap.getCv().getCv_id())
                .intro_num(ap.getIntroduce().getNum())
                .ap_pass(ap.getAp_pass())
                .ap_task(ap.getAp_task())
                .ap_area(ap.getAp_area())

                .user_id(ap.getCv().getUser_id().getUser_id())
                .user_name(c.getUser_name())
                .build();

        return dto;
    }

    // 학생회원에게 지원 목록 보여주는 DTO 생성
    public ApplyStudentDTO entityToApplyStudentDTO(Apply ap, Employ em, Enterprise etp){

        String apDate = ap.getApDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));


        ApplyStudentDTO dto = ApplyStudentDTO.builder()
                .ap_date(apDate)
                .cv_id(ap.getCv().getCv_id())
                .intro_num(ap.getIntroduce().getNum())
                .ap_pass(ap.getAp_pass())
                .ap_area(ap.getAp_area())
                .ap_task(ap.getAp_task())

                .etp_id(etp.getEtp_id())
                .etp_name(etp.getEtp_name())
                .etp_num(etp.getEtp_num())

                .emp_num(em.getNum())
                .emp_title(em.getTitle())
                .emp_content(em.getContent())
                .build();

        return dto;
    }

    // 동적 쿼리를 위한 입사지원 검색 빌더 생성
    public BooleanBuilder getSearchBuilder(SearchDTO dto){

        log.info("getSearchBuildet 실행");
        log.info("Search DTO : " + dto);

        String id = dto.getId();            // 지원자 아이디(memeber id)
        String title = dto.getTitle();      // 공고 제목 (employ title)
        String shape = dto.getShape();      // 기업 형태 (enterprise shape)
        String pass = dto.getPass();        // 합격 여부 (apply pass)
        String name = dto.getName();     // 기업 이름 (enterprise name)

        QApply qApply = QApply.apply;
        QEmploy qEmploy = QEmploy.employ;
        QEnterprise qEnterprise = QEnterprise.enterprise;
        QCV qcv = QCV.cV;

        BooleanBuilder builder = new BooleanBuilder();

        if(id != null) {
            BooleanExpression epId = qcv.user_id.user_id.contains(id);
            builder.and(epId);
        }

        if(name != null) {
            BooleanExpression epName = qEnterprise.etp_name.contains(name);
            builder.and(epName);
        }

        if(title != null) {
            BooleanExpression epTitle = qEmploy.title.contains(title);
            builder.and(epTitle);
        }

        if(shape != null) {
            BooleanExpression epShape = qEnterprise.etp_shape.eq(shape);
            builder.and(epShape);
        }

        if(pass != null) {
            BooleanExpression epPass = qApply.ap_pass.eq(pass);
            builder.and(epPass);
        }

        if(dto.getStartDate() != null && dto.getEndDate() != null){
            // date
            LocalDateTime startDate = LocalDate.parse(dto.getStartDate(), DateTimeFormatter.ISO_DATE).atStartOfDay();
            LocalDateTime endDate = LocalDateTime.of(LocalDate.parse(dto.getEndDate(), DateTimeFormatter.ISO_DATE), LocalTime.of(23,59,59));

            BooleanExpression epDate = qApply.apDate.between(startDate, endDate);     // regdate 조건
            builder.and(epDate);
        }

        return builder;


    }

    // 지원했는지 안했는지 확인하기
    public Boolean alreadyApply(CV cv, Long em_id){

        Employ em = employRepository.getOne(em_id);

        if(cv == null || em == null) {

            return Boolean.FALSE;
        } else {

            return applyRepository.existsByCvAndEmploy(cv, em);
        }

    }

    // 학생 회원 본인의 이력서와 자소서 리스트 보여주기
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

            Employ employ = employRepository.getOne(dto.getEmploy_num());

            // 이미 지원 했는지 아닌지 확인
            Boolean isExsist = applyRepository.existsByCvAndEmploy(cv, employ);
            if(isExsist){ return new ResponseEntity(2, HttpStatus.BAD_REQUEST); }
            //

            Introduce intro = introduceService.getIntroduce(dto.getIntro_id());

            Apply apply = Apply.builder()
                    .apDate(LocalDateTime.now())   // 입사지원 일자
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

            return new ResponseEntity(0, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    // 학생 마이페이지 - 학생회원한테 지원현황 목록  + 페이지네이션
    public PageResultDTO<ApplyStudentDTO, Object[]> getStudentApplyListPageDTO(PageRequestDTO pageRequestDTO, String user_id){

        // page랑 function으로 pageResultDTO 반환

        Pageable pageable = pageRequestDTO.getPageable(Sort.by("apDate"));

        Member member = memberService.getMember(user_id);

        Page<Object[]> pageResult = applyRepository.findByMember(pageable, member);

        Function<Object[], ApplyStudentDTO> fn = (en -> entityToApplyStudentDTO((Apply) en[0], (Employ) en[1], (Enterprise) en[2]) );

        PageResultDTO<ApplyStudentDTO, Object[]> pageResultDTO = new PageResultDTO<ApplyStudentDTO, Object[]>(pageResult, fn);

        return pageResultDTO;
    }


    // 기업 마이페이지 - 채용공고별 입사지원 현황 리스트 + 페이지네이션
    public PageResultDTO employApplyPage(Long num, PageRequestDTO pageRequestDTO) {

        Employ employ = employRepository.getOne(num);

        Pageable pageable = pageRequestDTO.getPageable(Sort.by("apDate"));

        Page<Object[]> applyPage = applyRepository.findByEmploy(pageable, employ);

        Function<Object[], ApplyStudentDTO> fn = (entity -> entityToApplyStudentDTO((Apply) entity[0], (CV) entity[1]));

        PageResultDTO<ApplyStudentDTO, Object[]> resultDTO = new PageResultDTO<>(applyPage, fn);

        return resultDTO;

    }

    // 관리자페이지 - 입사지원 리스트 검색 가능 페이지 + 페이지네이션
    public PageResultDTO<ApplyStudentDTO, Object> searchApplyListPage(PageRequestDTO pageRequestDTO, SearchDTO searchDTO){
        log.info("ApplicationService - SearchApplyListPage 실행");

        BooleanBuilder builder = getSearchBuilder(searchDTO);

        Pageable pageable = pageRequestDTO.getPageable(Sort.by("apDate"));

        Page<ApplyStudentDTO> result = searchApplyRepository.getApplyListPage(builder, pageable);

        return new PageResultDTO<>(result);
    }



}
