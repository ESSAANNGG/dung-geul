package com.dung.geul.controller;

import com.dung.geul.dto.AllowEtpDTO;
import com.dung.geul.dto.EnterpriseDTO;
import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.entity.Enterprise;
import com.dung.geul.entity.Member;
import com.dung.geul.security.dto.AuthMemberDTO;
import com.dung.geul.service.MemberServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.view.RedirectView;

import java.util.List;


@RequestMapping("/admin")
@Controller
public class AllowController {

    @Autowired
    private MemberServiceImpl memberService;

    // 관리자만
    @GetMapping("/")
    public String admin(@AuthenticationPrincipal AuthMemberDTO member){
        if(member.getUser_id().equals("admin")) return "/admin/admin";
        else return "/";
    }

    // 전체 회원 인증 리스트 페이지
    @GetMapping("/admin")
    public void getList(@RequestParam("type") String type ,@RequestParam("page1") Integer page1, @RequestParam("page2") Integer page2, Model model){
        //파라미터로 page, size 를 전달하면 자동으로 pageRequestDTO 객체로 수집된다

        // type : USER / ENTERPRISE / STUDENT / STAFF / COUNSELOR / UNIV
        System.out.println("page1 : " + page1 +"\n" +
                "page2 : " + page2);
        System.out.println("list 컨트롤러 실행");

        System.out.println("type : " + type );

        if(type==null || type.equals("")){
            type = "USER";
        }
        if(page1 == null) {
            page1 = 1;
        }
        if(page2 == null){
            page2 = 1;
        }

        // allow = 0 : 미인증 목록
        // allow = 1 : 인증 목록
        List<AllowEtpDTO> notAllowList = memberService.getUserList(page1, type, 0).getDtoList();
        List<AllowEtpDTO> AllowList = memberService.getUserList(page2, type, 1).getDtoList();

        model.addAttribute("notAllowList", notAllowList);
        model.addAttribute("allowList", AllowList);
        model.addAttribute("allowPageList", memberService.getUserList(page2, type, 1).getPageList());
        model.addAttribute("notAllowPageList",memberService.getUserList(page1, type, 0).getPageList() );

        System.out.println(notAllowList.toString());
        System.out.println(AllowList.toString());

    }


        @GetMapping("/member/read")
    public EnterpriseDTO read(@RequestParam("user_id") String user_id){

        return memberService.getEnterprise(user_id);
    }
}
