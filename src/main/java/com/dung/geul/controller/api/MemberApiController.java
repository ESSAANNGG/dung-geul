package com.dung.geul.controller.api;

import com.dung.geul.dto.EnterpriseDTO;
import com.dung.geul.dto.JoinResultPageDTO;
import com.dung.geul.dto.MemberDTO;
import com.dung.geul.service.MemberServiceImpl;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Log4j2
public class MemberApiController {

    @Autowired
    private MemberServiceImpl memberService;

    @PostMapping("/sigUp/student")
    public String joinMember(MemberDTO memberDTO){

        System.out.println("ApiMemberController : joinMember() 실행");
        System.out.println("MemberDTO : " + memberDTO);

        memberService.joinMember(memberDTO);

        // 정상이면 이렇게 보냄
        return "redirect:/login"; // WebController의 @Get(/login) 호출


    }

    @PostMapping("/sigUp/enterprise")
    public JoinResultPageDTO<Integer> joinEnterprise(EnterpriseDTO enterPriseDTO){

        System.out.println("ApiMemberController : joinEnterprise() 실행");
        System.out.println("enterPriseDTO : " + enterPriseDTO);

        memberService.joinEnterprise(enterPriseDTO);

        return new JoinResultPageDTO<>(1, HttpStatus.OK.value());

    }

}
