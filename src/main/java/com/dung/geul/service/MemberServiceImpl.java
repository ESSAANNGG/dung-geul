package com.dung.geul.service;


import com.dung.geul.dto.*;
import com.dung.geul.entity.Enterprise;
import com.dung.geul.entity.Member;
import com.dung.geul.entity.MemberRole;
import com.dung.geul.repository.EnterpriseRepository;
import com.dung.geul.repository.MemberRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.util.Arrays;
import java.util.Date;
import java.util.Optional;
import java.util.function.Function;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private EnterpriseRepository enterpriseRepository;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private MailService mailService;


    // 회원가입 일반회원
    public int joinMember(MemberDTO memberDTO) {

        System.out.println("MemberServiceImpl");

        try {
            String pw = encoder.encode(memberDTO.getUser_pw());

            Member member = MemberDtoToEntity(memberDTO, pw);
            //맴버별 다른 칼럼 추가
            AddColumn(member, memberDTO);

            memberRepository.save(member);
            return 1;
        } catch (Exception e) {
            System.out.println(e);
            return 0;
        }

    }

    //회원가입 기업
    public int joinEnterprise(EnterpriseDTO enterpriseDTO) {

        int result = 0;
        System.out.println("MemberServiceImpl - enterprise");

        String pw = encoder.encode(enterpriseDTO.getUser_pw());

        // 회원 테이블 먼저 insert
        Member member = MemberDtoToEntity(enterpriseDTO, pw);

        memberRepository.save(member);

        try {

            // 기업 테이블 insert
            Enterprise enterprise = EnterpriseDtoToEntity(enterpriseDTO, member);

            enterpriseRepository.save(enterprise);

            result = 1;

        } catch (Exception e) {
            memberRepository.delete(member);
            result = 0;
            System.out.println("error : " + e);
        }

        return result;
    }

    //기업 인증
    @Transactional
    public int authEnterprise(EnterpriseDTO etpDTO) {
        System.out.println("memberServiceImpl - authEnterprise : " + etpDTO.toString());

        try {
            Member member = memberRepository.findById(etpDTO.getUser_id()).get();
            Enterprise enterprise = enterpriseRepository.findByUser_id(member);

            enterprise.modifyEtp_shape(etpDTO.getEtp_shape());   // 기업 형태 저장
            member.addMemberRole(MemberRole.ENTERPRISE);                // 기업 권한 추가
            member.modUser_allow(1);                                 // 회원 인증 여부 변경

            memberRepository.save(member);
            enterpriseRepository.save(enterprise);

            return 1;
        } catch (Exception e) {
            System.out.println(e);
            return 0;
        }
    }

    // 회원 인증
    @Transactional
    public int authMember(MemberDTO memberDTO){

        // 회원 종류별로 role부여
        try{
            Member member = memberRepository.getOne(memberDTO.getUser_id());

            // 권한주기
            AddRole(member, member.getUser_type());

            return 1;
        } catch (Exception e){

            System.out.println("error : " + e);
            return 0;
        }
    }


    // 아이디 중복 체크
    public int checkUser_id(String user_id) {

        return memberRepository.checkId(user_id);
    }

    // 회원정보 수정
    public int modifyMember(MemberDTO memberDTO) {

        try {
            Optional<Member> member = memberRepository.findById(memberDTO.getUser_id());

            Member memberEntity = member.get();

            memberEntity.memberModify(
                    memberDTO.getUser_name(),
                    memberDTO.getUser_ph(),
                    memberDTO.getUser_email(),
                    memberDTO.getUser_postcode(),
                    memberDTO.getUser_addr(),
                    memberDTO.getUser_addr_details());

            System.out.println("서비스 - modifyMember()의 memberDTO : " + memberDTO.toString());

            if (memberEntity.getRoleSet().contains(MemberRole.STUDENT)) {
                memberEntity.modUser_class(memberDTO.getUser_class());
                memberEntity.modUser_dept(memberDTO.getUser_dept());
                memberEntity.modUser_grade(memberDTO.getUser_grade());
            } else if (memberEntity.getRoleSet().contains(MemberRole.MENTO)) {
                memberEntity.modUser_job(memberDTO.getUser_job());
            }


            System.out.println("회원 정보 수정 : " + memberEntity.toString());


            memberRepository.save(memberEntity);

            System.out.println("회원 정보 수정 완료");
            return 1;

        } catch (Exception e){
            System.out.println("error : " + e);
            return 0;
        }


    }



    // 기업 회원 정보 수정
    // 회원정보 수정
    public int modifyEtp(EnterpriseDTO enterpriseDTO) {

        System.out.println("etpmodify 실행 " + enterpriseDTO);
        try {
            Optional<Member> member = memberRepository.findById(enterpriseDTO.getUser_id());

            Member memberEntity = member.get();
            Enterprise enterpriseEntity = enterpriseRepository.findByUser_id(memberEntity);

            memberEntity.memberModify(
                    enterpriseDTO.getUser_name(),
                    enterpriseDTO.getUser_ph(),
                    enterpriseDTO.getUser_email(),
                    enterpriseDTO.getUser_postcode(),
                    enterpriseDTO.getUser_addr(),
                    enterpriseDTO.getUser_addr_details()

            );

            enterpriseEntity.modifyEtpInfo(
                    enterpriseDTO.getEtp_name(),
                    enterpriseDTO.getEtp_member(),
                    enterpriseDTO.getEtp_ceo_name(),
                    enterpriseDTO.getEtp_home(),
                    enterpriseDTO.getEtp_contents(),
                    enterpriseDTO.getEtp_fx(),
                    enterpriseDTO.getEtp_year(),
                    enterpriseDTO.getEtp_sector()
            );


            System.out.println("회원 정보 수정 : " + memberEntity.toString());
            System.out.println("회원 정보 수정 : " + enterpriseEntity.toString());


            memberRepository.save(memberEntity);
            System.out.println("회원 정보 수정 - member");

            enterpriseRepository.save(enterpriseEntity);
            System.out.println("회원 정보 수정 - enterprise");

            return 1;
        } catch (Exception e) {
            System.out.println("에러발생 : " + e);
            return 0;
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


        if (!(encoder.matches(pwInput, pwDB))) result = 0;

        System.out.println("memberServiceImpl - modifyMemberPw : if ");

        memberEntity.modUser_pw(pw);

        System.out.println("memberServiceImpl - modifyMemberPw : 비밀번호 변 ");

        memberRepository.save(memberEntity);

        System.out.println("비밀번호 변경 완료");

        return result;
    }

    // 회원 삭제
    // 탈퇴 칼럼 추가해서 바꾸는 걸로 할지,,?
    public void deleteMember(String user_id) {

        Optional<Member> memberOpt = memberRepository.findById(user_id);

        try {
            Member memberEntiry = memberOpt.get();

            if (memberEntiry.getUser_type().equals("ENTERPRISE")) {

                Enterprise etpEntity = enterpriseRepository.findByUser_id(memberEntiry);

                enterpriseRepository.delete(etpEntity);

            }

            memberRepository.delete(memberEntiry);

        } catch (Exception e) {
            System.out.println("error발생 : " + e);

        }


    }

    // mypage read member
    public Member getMember(String user_id) {

        Optional<Member> memberOpt = memberRepository.findById(user_id);

        return memberOpt.get();
    }

    //mypage read Enterprise
    public EnterpriseDTO getEnterprise(String user_id) {

        Object enterprise = memberRepository.findByUser_idEtpJoinMember(user_id);

        Object[] result = (Object[]) enterprise;
        System.out.println("enterprise : " + Arrays.toString(result));

        EnterpriseDTO enterpriseDTO = entityToDto((Enterprise) result[1], (Member) result[0]);
        System.out.println(enterpriseDTO.toString());

        return enterpriseDTO;
    }

    // 이름과 이메일이 일치하면 아이디값을 반환해주는 메소드
    public String confirmNameAndEmail(MemberDTO memberDTO) {

        String id = memberRepository.findByUser_emailAndUser_name(memberDTO.getUser_email(), memberDTO.getUser_name());

        return id;
    }

    // 아이디와 이메일이 일치하면 임시비밀번호를 이메일로 보내
    public int tempPwSendEmail(MemberForgotPwDTO memberForgotPwDTO) {

        Optional<Member> memberOpt = memberRepository.findById(memberForgotPwDTO.getUser_id());

        int result;

        if (!memberOpt.isEmpty()) {

            Member member = memberOpt.get();

            String DBemail = member.getUser_email();

            if (!DBemail.equals(memberForgotPwDTO.getUser_email())) {
                result = 0;
            } else {

                // 임시비밀번호 만들기
                String tempPw = getRandomPassword(5);

                // 메일 보내기
                MailDTO mailDTO = new MailDTO();

                mailDTO.setTitle("영진전문대학교 취업지원센터의 임시 비밀번호입니다.");
                mailDTO.setMessage("안녕하세요 " + memberForgotPwDTO.getUser_id() + "님. \n"
                        + "영진전문대학교 취업지원센터의 임시 비밀번호입니다.\n"
                        + "임시 비밀번호 : " + tempPw
                        + "\n로그인 후 비밀번호를 변경해주세요");
                mailDTO.setAddress(memberForgotPwDTO.getUser_email());

                mailService.mailSend(mailDTO);

                // 임시비밀번호로 변경
                member.modUser_pw(encoder.encode(tempPw));

                memberRepository.save(member);

                result = 1;
            }
        } else {
            result = 0;
        }

        return result;
    }

    // 입력한 숫자만큼의 크기의 랜덤 문자열을 반환 (임시 비밀번호로 사용)
    public String getRandomPassword(int size) {
        char[] charSet = new char[]{
                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
                'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
                'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
                'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
                'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
        };

        StringBuffer sb = new StringBuffer();
        SecureRandom sr = new SecureRandom();
        sr.setSeed(new Date().getTime());

        int idx = 0;

        int len = charSet.length;

        for (int i = 0; i < size; i++) {
            // idx = (int) (len * Math.random());
            idx = sr.nextInt(len); // 강력한 난수를 발생시키기 위해 SecureRandom을 사용한다.
            sb.append(charSet[idx]);
        }
        return sb.toString();
    }


    // 인증 전 기업 회원 목록 가져오기
    public PageResultDTO<AllowEtpDTO, Object[]> getListEtp(PageRequestDTO pageRequestDTO) {

        System.out.println("getList 실행");

        Pageable pageable = pageRequestDTO.getPageable(Sort.by("regDate"));

        Function<Object[], AllowEtpDTO> fn = (en -> AllowEntityToDTO((Member) en[0], (Enterprise) en[1]));

        Page<Object[]> result = memberRepository.findNotAllowUsers(pageable);

        return new PageResultDTO<>(result, fn);

    }

    // 인증 전 교내 회원 목록 가져오기
    public PageResultDTO getMemberList(PageRequestDTO pageRequestDTO) {

        System.out.println("getListMember실행");
        Pageable pageable = pageRequestDTO.getPageable(Sort.by("regDate"));


        return null;

    }

}
