package com.dung.geul.controller.api;

import com.dung.geul.dto.EnterpriseDTO;
import com.dung.geul.dto.JoinResultPageDTO;
import com.dung.geul.dto.MemberDTO;
import com.dung.geul.service.CvService;
import com.dung.geul.service.MemberServiceImpl;

import lombok.extern.log4j.Log4j2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@Log4j2
public class MemberApiController {

    @Autowired
    private MemberServiceImpl memberService;

    @Autowired
    private CvService cvService;


    // 회원가입
    @PostMapping("/sigUp/student")
    public RedirectView joinMember(@RequestBody MemberDTO memberDTO){

        System.out.println("ApiMemberController : joinMember() 실행");
        System.out.println("MemberDTO : " + memberDTO);

        memberService.joinMember(memberDTO);

        return new RedirectView("/login");


    }

    @PostMapping("/sigUp/enterprise")
    public JoinResultPageDTO<Integer> joinEnterprise(@RequestBody EnterpriseDTO enterPriseDTO){

        System.out.println("ApiMemberController : joinEnterprise() 실행");
        System.out.println("enterPriseDTO : " + enterPriseDTO);

        memberService.joinEnterprise(enterPriseDTO);

        return new JoinResultPageDTO<>(1, HttpStatus.OK.value());
    }

    //회원정보 수정
    @PutMapping("/mypage/member/modify")
    public RedirectView modifyMemberInfo(MemberDTO memberDTO){

        memberService.modifyMember(memberDTO);

        return new RedirectView("/mypage/member/read");
    }

    //비밀번호 수정
    @PutMapping("/mypage/member/modifyPw/{user_id}")
    public String modifyMemberPw(@PathVariable(name = "user_id") String user_id){

        System.out.println("서비스 - modifyMemberPw user_id : " + user_id);

        memberService.modifyMemberPw(user_id);

        return "/mypage/member/modify?pw=mod";
    }
}
