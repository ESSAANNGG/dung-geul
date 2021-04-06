package com.dung.geul.controller.restcontroller;

import com.dung.geul.dto.EnterpriseDTO;
import com.dung.geul.dto.JoinResultPageDTO;
import com.dung.geul.dto.MemberDTO;
import com.dung.geul.dto.MemberPwDTO;
import com.dung.geul.service.CvServiceImpl;
import com.dung.geul.service.MemberServiceImpl;

import lombok.extern.log4j.Log4j2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@Log4j2
public class MemberRestController {

    @Autowired
    private MemberServiceImpl memberService;

    @Autowired
    private CvServiceImpl cvServiceImpl;


    // 회원가입
    @PostMapping("/sigUp/student")
    public RedirectView joinMember(MemberDTO memberDTO){

        System.out.println("ApiMemberController : joinMember() 실행");
        System.out.println("MemberDTO : " + memberDTO);

        memberService.joinMember(memberDTO);

        return new RedirectView("/login");


    }

    @PostMapping("/sigUp/enterprise")
    public JoinResultPageDTO<Integer> joinEnterprise(EnterpriseDTO enterPriseDTO){

        System.out.println("ApiMemberController : joinEnterprise() 실행");
        System.out.println("enterPriseDTO : " + enterPriseDTO);

        memberService.joinEnterprise(enterPriseDTO);

        return new JoinResultPageDTO<>(1, HttpStatus.OK.value());
    }




    //회원정보 수정
    @PostMapping("/mypage/member/modify")
    public int modifyMemberInfo(@RequestBody MemberDTO memberDTO){

        System.out.println("회원 controller modifymemeberinfo - MemberDTO : "+memberDTO.toString());

        memberService.modifyMember(memberDTO);

        int result = 1;

        return result;
    }

    //비밀번호 수정
    @PostMapping("/mypage/member/modifyPw")
    public int modifyMemberPw(@RequestBody MemberPwDTO memberPwDTO){

        System.out.println("서비스 - modifyMemberPw() MemberPwDTO : " + memberPwDTO.toString());

        int result = memberService.modifyMemberPw(memberPwDTO);    // 현재 비밀번호 다름 : 0,  성공 : 1

        System.out.println("Result : " + result);

        return result;
    }

    // 회원정보 삭제
    @GetMapping("/mypage/member/delete")
    public RedirectView deleteMember(@RequestParam String user_id){

        System.out.println("member mypage delete () - user_id : " + user_id);

        memberService.deleteMember(user_id);

        return new RedirectView("/");

    }

}
