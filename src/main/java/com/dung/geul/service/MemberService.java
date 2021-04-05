package com.dung.geul.service;

import com.dung.geul.dto.EnterpriseDTO;
import com.dung.geul.dto.MemberDTO;
import com.dung.geul.entity.Enterprise;
import com.dung.geul.entity.Member;
import com.dung.geul.entity.MemberRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Set;

public interface MemberService {

    // 교내회원 회원가입을 위해 dto -> entity
    default Member MemberDtoToEntity(MemberDTO memberDTO, String pw){

        Member member = Member.builder()
                .user_id(memberDTO.getUser_id())
                .user_name(memberDTO.getUser_name())
                .user_pw(pw)
                .user_ph(memberDTO.getUser_ph())
                .user_postcode(memberDTO.getUser_postcode())
                .user_addr(memberDTO.getUser_addr())
                .user_addr_details(memberDTO.getUser_addr_details())
                .user_email(memberDTO.getUser_email())
                .build();

        String role = memberDTO.getRole();

        if(role != null) {
            this.RoleAndCloumAdd(member, memberDTO, role);
        }

        System.out.println("save member : " + member.toString());

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



    default void RoleAndCloumAdd(Member member, MemberDTO memberDTO, String role){

        member.addMemberRole(MemberRole.USER);

        if (role.equals("STUDENT")) {
            member.modUser_dept(memberDTO.getUser_dept());
            member.modUser_grade(memberDTO.getUser_grade());
            member.modUser_class(memberDTO.getUser_class());

            member.addMemberRole(MemberRole.STUDENT);
        } else if (role.equals("MENTO")) {
            member.modUser_job(member.getUser_job());

            member.addMemberRole(MemberRole.MENTO);
        } else if (role.equals("COUNSELOR")) {
            // 상담 분야 ??

            member.addMemberRole(MemberRole.COUNSELOR);

        } else if (role.equals("ENTERPRISE")) {
            member.addMemberRole(MemberRole.ENTERPRISE);
        }
    }

    // 회원정보를 보기위해
//    default MemberDTO memberEntityToDto(Member member){
//
//        System.out.println("MemberService의 memberEntityToDto 실행 : " + member);
//
//        MemberDTO memberDTO = MemberDTO.builder()
//                .user_id(member.getUser_id())
//                .user_pw(member.getUser_pw())
//                .user_name(member.getUser_name())
//                .user_email(member.getUser_email())
//                .user_postcode(member.getUser_postcode())
//                .user_addr(member.getUser_addr())
//                .user_addr_details(member.getUser_addr_details())
//                .user_ph(member.getUser_ph())
//                .build();
//
//        System.out.println("memberDTO : " + memberDTO);
//
//        Set<MemberRole> roleSet = member.getRoleSet();
//
//        System.out.println("roleSet : " + roleSet.toString());
//
//        if(roleSet.contains(MemberRole.STUDENT)) {
//            memberDTO.addMemberRole(MemberRole.STUDENT);
//
//        } else if(roleSet.contains(MemberRole.MENTO)){
//            memberDTO.addMemberRole(MemberRole.MENTO);
//
//        } else if(roleSet.contains("COUNSELOR")){
//            memberDTO.addMemberRole(MemberRole.STUDENT);
//
//        } else if(roleSet.contains("ENTERPRISE")){
//            member.addMemberRole(MemberRole.ENTERPRISE);
//        }
//
//        memberDTO.addMemberRole(MemberRole.USER);
//
//        return memberDTO;
//    }


}
