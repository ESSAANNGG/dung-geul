package com.dung.geul.service;

import com.dung.geul.dto.AllowEtpDTO;
import com.dung.geul.dto.EnterpriseDTO;
import com.dung.geul.dto.MemberDTO;
import com.dung.geul.entity.Enterprise;
import com.dung.geul.entity.Member;
import com.dung.geul.entity.MemberRole;

import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;

public interface MemberService {

    // 교내회원 회원가입을 위해 dto -> entity
    default Member MemberDtoToEntity(MemberDTO memberDTO, String pw){

        Member member = Member.builder()
                .user_id(memberDTO.getUser_id())
                .user_name(memberDTO.getUser_name())
                .user_pw(pw)
                .user_ph(memberDTO.getUser_ph())
                .user_ph2(memberDTO.getUser_ph2())
                .user_ph3(memberDTO.getUser_ph3())
                .user_postcode(memberDTO.getUser_postcode())
                .user_addr(memberDTO.getUser_addr())
                .user_addr_details(memberDTO.getUser_addr_details())
                .user_email(memberDTO.getUser_email())
                .user_emailDomain(memberDTO.getUser_emailDomain())
                .user_type(memberDTO.getRole())
                .build();

        System.out.println("save member : " + member.toString());


        return member;
    }


    // 기업회원 회원가입을 위해 dto -> entity
    default Enterprise EnterpriseDtoToEntity(EnterpriseDTO enterpriseDTO, Member member){

        // 기업 entity 객체 생성
        Enterprise enterprise = Enterprise.builder()
                .user_id(member)
                .etp_num(enterpriseDTO.getEtp_num())
                .etp_name(enterpriseDTO.getEtp_name())
                .etp_ceo_name(enterpriseDTO.getEtp_ceo_name())
                .etp_ph(enterpriseDTO.getEtp_ph())
                .etp_ph2(enterpriseDTO.getEtp_ph2())
                .etp_ph3(enterpriseDTO.getEtp_ph3())
                .etp_fx(enterpriseDTO.getEtp_fx())
                .etp_home(enterpriseDTO.getEtp_home())
                .etp_contents(enterpriseDTO.getEtp_contents())
                .etp_year(enterpriseDTO.getEtp_year())
                .etp_member(enterpriseDTO.getEtp_member())
                .etp_sector(enterpriseDTO.getEtp_sector())
                .etp_shape(enterpriseDTO.getEtp_shape())
                .build();

        return enterprise;
    }


    // 회원에 따라 권한 추가
    default void AddRole(Member member, String role){

        if (role.equals("STUDENT")) {

            member.addMemberRole(MemberRole.STUDENT);

        } else if (role.equals("STAFF")) {

            member.addMemberRole(MemberRole.STAFF);

        } else if (role.equals("COUNSELOR")) {

            member.addMemberRole(MemberRole.COUNSELOR);

        } else if (role.equals("ENTERPRISE")) {
            member.addMemberRole(MemberRole.ENTERPRISE);
        }
    }

    // 회원별 속성 추가
    default void AddColumn(Member member, MemberDTO memberDTO){

        if(member.getUser_type().equals("STUDENT") || member.getUser_type().equals("STAFF")) {
            member.modUser_dept(memberDTO.getUser_dept());
            member.modUser_grade(memberDTO.getUser_grade());
            member.modUser_class(memberDTO.getUser_class());
        }
    }

    // 미인증 회원 목록
    default AllowEtpDTO AllowEntityToDTO(Member m, Enterprise e){

        AllowEtpDTO allowDTO = new AllowEtpDTO(m.getUser_id());

        if(e == null){        // 기업회원이 아니면
            allowDTO.setUser_name(m.getUser_name());
        } else{             // 기업회원이면
            allowDTO.setEtp_name(e.getEtp_name());
            allowDTO.setUser_name(e.getEtp_name());
            allowDTO.setEtp_num(e.getEtp_num());
        }

        allowDTO.setUser_email(m.getUser_email());
        allowDTO.setUser_ph(m.getUser_ph());

        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-mm-dd HH:mm");
        System.out.println("m.getRegDate");
        String RegDateString = m.getRegDate().format(dateTimeFormatter);

        String user_type;

        if(m.getUser_type().equals("STUDENT")) {
            user_type = "학생";
        } else if (m.getUser_type().equals("COUNSELOR")){
            user_type = "상담사";
        } else if(m.getUser_type().equals("ENTERPRISE")){
            user_type = "기업";
        } else {
            user_type = "교직원";
        }

        allowDTO.setUser_type(user_type);
        allowDTO.setUser_regdate(RegDateString);


        return allowDTO;
    }

//
//    // 회원 인증 목록 // 위에꺼 오류 안나게 다 만들면 지우기
//    default AllowEtpDTO AllowEntityToDTO(Member m, Enterprise e){
//        AllowEtpDTO allowEtpDTO = AllowEtpDTO.builder()
//                .user_id(m.getUser_id())
//                .etp_name(e.getEtp_name())
//                .etp_num(e.getEtp_num())
//                .user_regdate(m.getRegDate())
//                .build();
//
//        return allowEtpDTO;
//    }



    default EnterpriseDTO entityToDto(Enterprise e, Member m){

        EnterpriseDTO dto = EnterpriseDTO.builder()
                .user_id(m.getUser_id())
                .user_name(m.getUser_name())
                .user_postcode(m.getUser_postcode())
                .user_addr(m.getUser_addr())
                .user_addr_details(m.getUser_addr_details())
                .user_email(m.getUser_email())
                .user_ph(m.getUser_ph())
                .etp_id(e.getEtp_id())
                .etp_num(e.getEtp_num())
                .etp_name(e.getEtp_name())
                .etp_ceo_name(e.getEtp_ceo_name())
                .etp_member(e.getEtp_member())
                .etp_home(e.getEtp_home())
                .etp_sector(e.getEtp_sector())
                .etp_shape(e.getEtp_shape())
                .etp_contents(e.getEtp_contents())
                .etp_fx(e.getEtp_fx())
                .etp_year(e.getEtp_year())
                .build();

        return dto;
    }

    EnterpriseDTO getEnterprise(String user_id);
}
