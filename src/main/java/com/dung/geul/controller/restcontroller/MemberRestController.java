package com.dung.geul.controller.restcontroller;

import com.dung.geul.dto.*;
import com.dung.geul.service.MemberServiceImpl;

import lombok.extern.log4j.Log4j2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@Log4j2
public class MemberRestController {
// 회원관리 컨트롤러
    // 로그인, 회원가입, 회원정보 수정


    @Autowired
    private MemberServiceImpl memberService;


    // 회원가입
    @PostMapping("/sigUp/member")
    public int joinMember(@RequestBody MemberDTO memberDTO) {

        System.out.println("ApiMemberController : joinMember() 실행");
        System.out.println("MemberDTO : " + memberDTO);

        int result = memberService.joinMember(memberDTO);

        System.out.println("restcontroller - result : " + result);

        return result;

    }

    @PostMapping("/sigUp/counselor")
    public int joinCon(@RequestBody MemberDTO memberDTO) {

        System.out.println("ApiMemberController : joinCon() 실행");
        System.out.println("MemberDTO : " + memberDTO);

        int response = memberService.joinMember(memberDTO);

        System.out.println("restcontroller - result : " + response);

        return response;

    }

    // 기업회원가입
    @PostMapping("/sigUp/enterprise")
    public int joinEnterprise(@RequestBody EnterpriseDTO enterPriseDTO) {

        System.out.println("ApiMemberController : joinEnterprise() 실행");
        System.out.println("enterPriseDTO : " + enterPriseDTO);

        int result = memberService.joinEnterprise(enterPriseDTO);

        return result;
    }

    //아이디 중복 검사
    @GetMapping("/id-check")
    public int checkId(@RequestParam("user_id") String user_id) {

        return memberService.checkUser_id(user_id); // 0: 중복 아님, 1: 중복
    }

    // 아이디 찾기

    @PostMapping("/forgot/id")
    public ResponseEntity<?> findId(@RequestBody MemberDTO memberDTO) {

        try {
            System.out.println("memberRestController의 findId() 실행");
            System.out.println("memberDTO = " + memberDTO);

            String email = memberDTO.getUser_email();

            String[] emails = email.split("@");

            String name = memberDTO.getUser_name();

            log.info("emails[0] : " + emails[0]);
            log.info("emails[1] : " + emails[1]);
            log.info("name : " + name);
            String id = memberService.confirmNameAndEmail(name, emails[0], emails[1]);    //return 성공 = user_id / 실패 = null
            log.info("name : " + name);
            log.info("일치하는 id : " + id);
            MemberDTO response  =  new MemberDTO();
            response.setUser_id(id);

            // 아이디와 이메일이 일치하는 DB값 없으면 0 반환
            if (id == null) {
                return new ResponseEntity<>("bad request", HttpStatus.BAD_REQUEST);
            }

            log.info("return id : " + id);

            return new ResponseEntity<>(response, HttpStatus.OK);

        }catch (Exception e){
            System.out.println(e);
            return new ResponseEntity<>("bad request", HttpStatus.BAD_REQUEST);
        }
    }


    //비밀번호 찾기
    @PostMapping("/forgot/pw")
    public int findPw(@RequestBody MemberForgotPwDTO memberForgotPwDTO) {
        // 아이디와 이메일을 받아옴
        System.out.println("memberRestController findPw() 실행");
        System.out.println("forfotPw : " + memberForgotPwDTO);

        int result = memberService.tempPwSendEmail(memberForgotPwDTO);  // 1: 성공, 0: 실패

        System.out.println("controller로 돌아옴");

        System.out.println("result : " + result);

        return result;
    }


    //회원정보 수정
    @PostMapping("/mypage/member/modify")
    public int modifyMemberInfo(@RequestBody MemberDTO memberDTO) {

        System.out.println("회원 controller modifymemeberinfo - MemberDTO : " + memberDTO.toString());

        int result = memberService.modifyMember(memberDTO);

        return result;
    }

    // 기업 회원 정보 수정
    @PostMapping("/mypage/etp/modify")
    public int modifyEtpInfo(@RequestBody EnterpriseDTO enterpriseDTO) {
        System.out.println("controller 실행 ");

        int result = memberService.modifyEtp(enterpriseDTO);

        return result;
    }

    //비밀번호 수정
    @PostMapping("/mypage/member/modifyPw")
    public int modifyMemberPw(@RequestBody MemberPwDTO memberPwDTO) {

        System.out.println("서비스 - modifyMemberPw() MemberPwDTO : " + memberPwDTO.toString());

        int result = memberService.modifyMemberPw(memberPwDTO);    // 현재 비밀번호 다름 : 0,  성공 : 1

        System.out.println("Result : " + result);

        return result;
    }

    // 회원정보 삭제
    @GetMapping("/mypage/member/delete")
    public RedirectView deleteMember(@RequestParam String user_id) {

        System.out.println("member mypage delete () - user_id : " + user_id);

        memberService.deleteMember(user_id);

        return new RedirectView("/logout");

    }


}
