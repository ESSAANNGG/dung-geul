package com.dung.geul.security.service;


import com.dung.geul.entity.Member;
import com.dung.geul.entity.MemberRole;
import com.dung.geul.repository.MemberRepository;
import com.dung.geul.security.dto.AuthMemberDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;

// 로그인 요청이 오면 시큐리티가 자동으로 UserDetailsService 타입으로 IoC되어있는
// 클래스의 loadUserByUsername 함수를 실행함

@Log4j2
@Service
//@RequiredArgsConstructor
public class MemberDetailsService implements UserDetailsService {

    // 로그인 서비스
    @Autowired
    private MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        log.info("진행 - MemberDetailsService loadUserByUsername의 username: " + username);

        // id로 찾은 member 객체를 담음
        Optional<Member> memberOptional = memberRepository.findByIdWidthRole(username);

        if (memberOptional.isEmpty()) {
            throw new UsernameNotFoundException("Check ID");
        }

        Member member = memberOptional.get();

        System.out.println("결과확인 memberOptional : " + memberOptional);
        System.out.println("결과확인 memberOptional.get() : " + memberOptional.get());
        System.out.println("결과확인 memberOptional : " + member);

        log.info("진행 - MemberDetailsService loadUserByUsername의 memberOptional : " + memberOptional);

        //Member를 UserDetails 타입으로 처리하기 위해 AuthMemberDTO 타입으로 변환

        AuthMemberDTO authMemberDTO = new AuthMemberDTO(
                member.getUser_id(),
                member.getUser_pw(),
                member.getRoleSet().stream().map(role -> new SimpleGrantedAuthority("ROLE_" + role.name()))
                        .collect(Collectors.toSet())
        );

        authMemberDTO.setUser_name(member.getUser_name());
        authMemberDTO.setUser_email(member.getUser_email());
        authMemberDTO.setUser_ph(member.getUser_ph());
        authMemberDTO.setUser_postcode(member.getUser_postcode());
        authMemberDTO.setUser_addr(member.getUser_addr());
        authMemberDTO.setUser_addr_details(member.getUser_addr_details());
        authMemberDTO.setUser_type(member.getUser_type());


        // 멤버 권한 별 추가 정보 기입

        if (member.getRoleSet().contains(MemberRole.STUDENT)) {

            authMemberDTO.setUser_dept(member.getUser_dept());
            authMemberDTO.setUser_grade(member.getUser_grade());
            authMemberDTO.setUser_class(member.getUser_class());

        } else if (member.getRoleSet().contains(MemberRole.MENTO)) {

            authMemberDTO.setUser_job(member.getUser_job());

        }

        // 변환 끝

        return authMemberDTO;
    }
}
