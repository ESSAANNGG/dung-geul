package com.dung.geul.service;

import com.dung.geul.dto.EnterpriseDTO;
import com.dung.geul.dto.MemberDTO;
import com.dung.geul.entity.Enterprise;
import com.dung.geul.entity.Member;
import com.dung.geul.entity.MemberRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public interface MemberService {

    // 교내회원 회원가입을 위해 dto -> entity
    default Member MemberDtoToEntity(MemberDTO memberDTO, String pw){

        Member member = Member.builder()
                .user_id(memberDTO.getUser_id())
                .user_name(memberDTO.getUser_name())
                .user_pw(pw)
                .user_ph(memberDTO.getUser_ph())
                .user_addr(memberDTO.getUser_addr())
                .user_email(memberDTO.getUser_email())
                .build();

        String role = memberDTO.getRole();

        // 모든 가입자에 부여되는 role
        member.addMemberRole(MemberRole.USER);

        // 가입자별로 role이랑 추가 칼럼 값 주기
        if(role.equals("STUDENT")){
            member.setUser_dept(memberDTO.getUser_dept());
            member.setUser_class(memberDTO.getUser_class());

            member.addMemberRole(MemberRole.STUDENT);
        }else if(role.equals("MENTO")){
            member.setUser_job(member.getUser_job());

            member.addMemberRole(MemberRole.MENTO);
        } else if(role.equals("COUNSELOR")){
            // 상담 분야 ??

            member.addMemberRole(MemberRole.COUNSELOR);

        } else if(role.equals("ENTERPRISE")){
            member.addMemberRole(MemberRole.ENTERPRISE);
        }

        return member;
    }


    // 기업회원 회원가입을 위해 dto -> entity
    default Enterprise EnterpriseDtoToEntity(EnterpriseDTO enterpriseDTO, Member member){

        // 기업 entity 객체 생성
        Enterprise enterprise = Enterprise.builder()
                .member(member)
                .etp_num(enterpriseDTO.getEtp_num())
                .etp_name(enterpriseDTO.getEtp_name())
                .etp_ceo_name(enterpriseDTO.getEtp_ceo_name())
                .etp_ph(enterpriseDTO.getEtp_ph())
                .etp_px(enterpriseDTO.getEtp_px())
                .etp_home(enterpriseDTO.getEtp_home())
                .etp_contents(enterpriseDTO.getEtp_contents())
                .etp_post(enterpriseDTO.getEtp_post())
                .etp_detail_addr(enterpriseDTO.getEtp_detail_addr())
                .etp_year(enterpriseDTO.getEtp_year())
                .etp_member(enterpriseDTO.getEtp_member())
                .etp_Sector(enterpriseDTO.getEtp_Sector())
                .etp_shape(enterpriseDTO.getEtp_shape())
                .etp_allow(enterpriseDTO.getEtp_allow())
                .build();

        return enterprise;
    }

}
