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
}
