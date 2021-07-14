package com.dung.geul.controller.restcontroller;

import com.dung.geul.dto.CertificateDTO;
import com.dung.geul.dto.IntroduceDTO;
import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.dto.apply.ApplicationModalDTO;
import com.dung.geul.dto.cv.CvPageDTO;
import com.dung.geul.security.dto.AuthMemberDTO;
import com.dung.geul.service.ApplicationService;
import com.dung.geul.service.CvServiceImpl;
import com.dung.geul.service.IntroduceService;
import com.dung.geul.service.LicenseService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/application")
@Log4j2
public class ApplicationRestController {

    @Autowired
    private CvServiceImpl cvServiceImpl;

    @Autowired
    private LicenseService licenseService;

    @Autowired
    private IntroduceService introduceService;

    @Autowired
    private ApplicationService applicationService;

    // 이력서 관련
    @PostMapping("/cv/register")
    public int cvRegister(@RequestBody CvPageDTO cvPageDTO){

        System.out.println("ApplicationApiController : cvRegister() 실행");
        System.out.println("cvPageDTO : " + cvPageDTO);

        int result = cvServiceImpl.register(cvPageDTO);

        return  result;
    }

    @PostMapping("/cv/modify")
    public int cvModify(@RequestBody CvPageDTO cvPageDTO){

        System.out.println("ApplicationApiController : cvModify() 실행");
        System.out.println("cvPageDTO : " + cvPageDTO);

        return cvServiceImpl.modify(cvPageDTO);
    }

    @GetMapping("/cv/delete")
    public RedirectView cvDelete(@Param("user_id") String user_id){

        System.out.println("CvDelete : cv 삭제 실행");

        System.out.println("user_id : " + user_id);

        cvServiceImpl.delete(user_id);

        return new RedirectView("/application/cv/before");
    }

    @GetMapping("/cv/license")
    public List<CertificateDTO> roadLicense(@AuthenticationPrincipal AuthMemberDTO authMemberDTO){

        log.info("자격증 리스트 요청 컨트롤러 실행");
        log.info("user_id : " + authMemberDTO.getUser_id() );

        return licenseService.getLicenseList(authMemberDTO.getUser_id());
    }


    // 자소서 관련

    //자소서등록
    @PostMapping("/intro/introReg")
    public void register(@RequestBody IntroduceDTO introduceDTO) {
        introduceService.register(introduceDTO);

    }

    //자소서삭제
    @DeleteMapping("/intro/{num}")
    public ResponseEntity<String> remove(@PathVariable("num") Long num) {

        log.info("Num:" + num);

        introduceService.remove(num);

        return new ResponseEntity<>("succes", HttpStatus.OK);
    }

    //자소서수정
    @PutMapping("/intro/introSave")
    public ResponseEntity<String> modify(@RequestBody IntroduceDTO introduceDTO) {

        log.info(introduceDTO);

        introduceService.modify(introduceDTO);

        return new ResponseEntity<>("succes", HttpStatus.OK);
    }


    // 입사지원

    //modal 창에 본인 이력서랑 자소서 보여주기
    @GetMapping("/cvIntro/list")
    public ResponseEntity getApc(@RequestParam("user_id") String user_id, PageRequestDTO pageRequestDTO){

        try{
            ApplicationModalDTO applicationModalDTO = applicationService.getCvAndIntro(user_id, pageRequestDTO);

            return new ResponseEntity(applicationModalDTO, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    // /application/cvIntro/save
    // 들어온 이력서와 자소서를 온라인 지원 테이블에 저장하기
    @PostMapping("/cvIntro/save")
    public ResponseEntity saveApc(@RequestBody ApplicationModalDTO applicationModalDTO) {

        return applicationService.save(applicationModalDTO);

    }

    // /application/etp/employ/list/{num}?page=[]&pass=[] // num : 채용공고 번호, page=페이지네이션 번호, pass=대기중/합격/불합격
    // ajax로 대기중/합격/불합격 리스트마다 따로 요청해주세요 (페이지네이션 해서)
    // 채용공고별 입사지원자 리스트 (+ 페이지네이션)
    @GetMapping("/etp/employ/list/{num}")
    public PageResultDTO getEmployApplyList(@PathVariable("num") Long num,
                                            PageRequestDTO pageRequestDTO,
                                            @RequestParam("pass") String pass){

        log.info("실행 - num : "+ num);

        PageResultDTO resultDTO = applicationService.employApplyPage(num, pageRequestDTO, pass);

        log.info("result : " + resultDTO);

        return resultDTO;

    }

    // 기업마이페이지에서 입사지원자의 합격 불합격 여부 기능
    @PostMapping("/apply")
    public ResponseEntity ApplyPass(@RequestBody String[] ap_ids, @RequestParam("pass") String pass){

        log.info("list : " + Arrays.toString(ap_ids));
        log.info("pass : " + pass);

        return applicationService.applyChange(ap_ids, pass);
    }

}
