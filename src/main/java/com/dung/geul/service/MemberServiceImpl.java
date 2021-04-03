package com.dung.geul.service;

import com.dung.geul.dto.EnterpriseDTO;
import com.dung.geul.dto.JoinResultPageDTO;
import com.dung.geul.dto.MemberDTO;
import com.dung.geul.entity.Enterprise;
import com.dung.geul.entity.Member;
import com.dung.geul.repository.EnterpriseRepository;
import com.dung.geul.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MemberServiceImpl implements MemberService{

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private EnterpriseRepository enterpriseRepository;

    @Autowired
    private BCryptPasswordEncoder encoder;

    public void joinMember(MemberDTO memberDTO){

        System.out.println("MemberServiceImpl");

        String pw = encoder.encode(memberDTO.getUser_pw());
        Member member = MemberDtoToEntity(memberDTO, pw);

        memberRepository.save(member);

    }

    public void joinEnterprise(EnterpriseDTO enterpriseDTO){

        String pw = encoder.encode(enterpriseDTO.getUser_pw());

        // 회원 테이블 먼저 insert

        Member member = MemberDtoToEntity(enterpriseDTO, pw);

        memberRepository.save(member);

        // 기업 테이블 insert

        Enterprise enterprise = EnterpriseDtoToEntity(enterpriseDTO, member);

        enterpriseRepository.save(enterprise);

    }

    // 회원정보 수정
    public void modifyMember(MemberDTO memberDTO) {

        Optional<Member> member = memberRepository.findById(memberDTO.getUser_id());

        if(!member.isEmpty()){
            Member memberEntity = member.get();

            memberEntity.memberModify(
                    memberDTO.getUser_name(),
                    memberDTO.getUser_ph(),
                    memberDTO.getUser_email(),
                    memberDTO.getUser_postcode(),
                    memberDTO.getUser_addr(),
                    memberDTO.getUser_addr_details()
            );
            System.out.println("서비스 - modifyMember()의 memberDTO : " + memberDTO.toString());
            System.out.println("회원 정보 수정 : " + memberEntity.toString());
            memberRepository.save(memberEntity);
        }
    }

    public void modifyMemberPw(String user_id){
//
//        Optional<Member> member = memberRepository.findById(user_id);
//
//        String pw = encoder.encode(memberDTO.getUser_pw());
//
//        if (!member.isEmpty()){
//            Member memberEntity = member.get();
//
//            memberEntity.modUser_pw(pw);
//
//            System.out.println("비밀번호 변경");
//
//            memberRepository.save(memberEntity);
//
//
//        }


    }
}
