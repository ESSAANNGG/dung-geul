package com.dung.geul.service;

import com.dung.geul.dto.EnterpriseDTO;
import com.dung.geul.dto.JoinResultPageDTO;
import com.dung.geul.dto.MemberDTO;
import com.dung.geul.dto.MemberPwDTO;
import com.dung.geul.entity.Enterprise;
import com.dung.geul.entity.Member;
import com.dung.geul.entity.MemberRole;
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

            if(memberEntity.getRoleSet().contains(MemberRole.STUDENT)){
                memberEntity.modUser_class(memberDTO.getUser_class());
                memberEntity.modUser_dept(memberDTO.getUser_dept());
                memberEntity.modUser_grade(memberDTO.getUser_grade());
            } else if(memberEntity.getRoleSet().contains(MemberRole.MENTO)){
                memberEntity.modUser_job(memberDTO.getUser_job());
            }


            System.out.println("회원 정보 수정 : " + memberEntity.toString());


            memberRepository.save(memberEntity);

            System.out.println("회원 정보 수정 완료");
        }

    }

    public int modifyMemberPw(MemberPwDTO memberPwDTO) {    // 객체 없음(null) : -1,  현재 비밀번호 다름 : 0,  성공 : 1

        int result = 1;

        System.out.println("memberServiceImpl - modifyMemberPw : " + memberPwDTO);

        Optional<Member> member = memberRepository.findById(memberPwDTO.getUser_id());

        System.out.println("memberServiceImpl - modifyMemberPw member : " + member);

        String pw = encoder.encode(memberPwDTO.getUser_pw_new());

        System.out.println("memberServiceImpl - modifyMemberPw pw : " + pw);

        Member memberEntity = member.get();

        System.out.println("memberServiceImpl - modifyMemberPw : memberEntity " + memberEntity);

        String pwInput = memberPwDTO.getUser_pw_old();

        String pwDB = memberEntity.getUser_pw();



        if( !(encoder.matches(pwInput, pwDB)) ) result = 0;

        System.out.println("memberServiceImpl - modifyMemberPw : if ");

        memberEntity.modUser_pw(pw);

        System.out.println("memberServiceImpl - modifyMemberPw : 비밀번호 변 ");

        memberRepository.save(memberEntity);

        System.out.println("비밀번호 변경 완료");

        return result;
    }

    public void deleteMember(String user_id) {

        Optional<Member> memberOpt = memberRepository.findById(user_id);

        if(!memberOpt.isEmpty()) {
            Member memberEntiry = memberOpt.get();

            memberRepository.delete(memberEntiry);
        }


    }

}
