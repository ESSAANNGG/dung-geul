package com.dung.geul.controller.restcontroller;

import com.dung.geul.dto.EnterpriseDTO;
import com.dung.geul.dto.MemberDTO;
import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.entity.Enterprise;
import com.dung.geul.entity.Member;
import com.dung.geul.repository.EnterpriseRepository;
import com.dung.geul.repository.MemberRepository;
import com.dung.geul.service.MemberServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;
import java.util.List;


@RestController
@RequestMapping("/allow")
public class AllowRestController {   // 권한 관리 컨트롤러

    @Autowired
    MemberServiceImpl memberService;

    // 기업 인증 승인
    @PostMapping("/etp/read")
    public ResponseEntity etpAuth(@RequestBody EnterpriseDTO etpDTO){
        System.out.println("controller 실행 user_id : " + etpDTO.toString());

        return memberService.authEnterprise(etpDTO);
    }

    // 교내 회원 승인
    @PostMapping("/member/read")
    public ResponseEntity etpAuth(@RequestParam(value="checkList[]")String[] userIds, @RequestParam("result") String result){

        System.out.println("controller 실행");

        return memberService.authMember(userIds, result);

    }

}
