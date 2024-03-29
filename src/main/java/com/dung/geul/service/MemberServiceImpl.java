package com.dung.geul.service;


import com.dung.geul.dto.*;
import com.dung.geul.entity.*;
import com.dung.geul.repository.EnterpriseRepository;
import com.dung.geul.repository.IntroduceRepository;
import com.dung.geul.repository.MemberRepository;
import com.dung.geul.repository.search.SearchMemberRepository;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.QueryFactory;
import com.querydsl.core.types.dsl.BooleanExpression;
import lombok.extern.log4j.Log4j2;
import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@Log4j2
public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private SearchMemberRepository searchMemberRepository;

    @Autowired
    private EnterpriseRepository enterpriseRepository;

    @Autowired
    private IntroduceRepository introduceRepository;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private MailService mailService;

    private QueryFactory queryFactory;


    // 회원가입 일반회원
    public int joinMember(MemberDTO memberDTO) {

        System.out.println("MemberServiceImpl");

        try {
            String pw = encoder.encode(memberDTO.getUser_pw());

            Member member = MemberDtoToEntity(memberDTO, pw);

            AddColumn(member, memberDTO);   //맴버별 다른 칼럼 추가
            member.addMemberRole(MemberRole.USER);  // user 권한추가

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
        log.info("enterpriseDTO : " + enterpriseDTO);

        String pw = encoder.encode(enterpriseDTO.getUser_pw());

        // 회원 테이블 먼저 insert
        Member member = MemberDtoToEntity(enterpriseDTO, pw);

        member.addMemberRole(MemberRole.USER);

        memberRepository.save(member);

        try {

            // 기업 테이블 insert
            Enterprise enterprise = EnterpriseDtoToEntity(enterpriseDTO, member);

            enterpriseRepository.save(enterprise);

            result = 1;

        } catch (Exception e) {
            memberRepository.delete(member);
            System.out.println("error : " + e);
            result = 0;
        }

        return result;
    }

    //기업 인증     1: 승인 성공,   2: 거절 성공,   -1 : 오류
    @Transactional
    public ResponseEntity authEnterprise(List<AllowEtpIdShapeDTO> dtoList, String result) {
        System.out.println("memberServiceImpl - authEnterprise : " + dtoList.toString());

        try {
            Member member;
            Enterprise enterprise;

            for (AllowEtpIdShapeDTO dto : dtoList) {
                member = memberRepository.findById(dto.getUser_id()).get();

                enterprise = enterpriseRepository.findByMember(member);

                if (member == null || enterprise == null) throw new Exception(dto.getUser_id() + "는 존재하지 않는 회원입니다.");

                if (result.equals("no")) {
                    deleteMember(dto.getUser_id());
                    continue;
                } else if (result.equals("ok")) {
                    member.modUser_allow(1);
                    enterprise.modifyEtp_shape(dto.getShape());         // 기업 형태 저장
                    member.addMemberRole(MemberRole.ENTERPRISE);                // 기업 권한 추가

                    memberRepository.save(member);
                    enterpriseRepository.save(enterprise);
                }

            } // end of for

            return new ResponseEntity(1, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity(0, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 회원 인증  1 : 인증완료 , 2 : 거절완료,  -1 : 오류
    @Transactional
    public ResponseEntity authMember(List<String> userIds, String result) {

        // 회원 종류별로 role부여
        try {

            Member member;

            for (int i = 0; i < userIds.size(); i++) {
                member = memberRepository.getOne(userIds.get(i));

                if (member == null) throw new Exception(userIds.get(i) + "는 존재하지 않는 회원입니다.");

                if (result.equals("no")) {     // 거절
                    deleteMember(member.getUser_id());
                } else if (result.equals("ok")) {    // 승인
                    AddRole(member, member.getUser_type()); // 권한주기
                    member.modUser_allow(1);

                    memberRepository.save(member);
                }

            } // end of for

            return new ResponseEntity(1, HttpStatus.OK);

        } catch (Exception e) {

            System.out.println("error : " + e);
            return new ResponseEntity(2, HttpStatus.NOT_FOUND);

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
                    memberDTO.getUser_ph2(),
                    memberDTO.getUser_ph3(),
                    memberDTO.getUser_email(),
                    memberDTO.getUser_emailDomain(),
                    memberDTO.getUser_postcode(),
                    memberDTO.getUser_addr(),
                    memberDTO.getUser_addr_details());

            System.out.println("서비스 - modifyMember()의 memberDTO : " + memberDTO.toString());

            if (memberEntity.getRoleSet().contains(MemberRole.STUDENT)) {
                memberEntity.modUser_class(memberDTO.getUser_class());
                memberEntity.modUser_dept(memberDTO.getUser_dept());
                memberEntity.modUser_grade(memberDTO.getUser_grade());
            }


            System.out.println("회원 정보 수정 : " + memberEntity.toString());


            memberRepository.save(memberEntity);

            System.out.println("회원 정보 수정 완료");
            return 1;

        } catch (Exception e) {
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
            Enterprise enterpriseEntity = enterpriseRepository.findByMember(memberEntity);

            memberEntity.memberModify(
                    enterpriseDTO.getUser_name(),
                    enterpriseDTO.getUser_ph(),
                    enterpriseDTO.getUser_ph2(),
                    enterpriseDTO.getUser_ph3(),
                    enterpriseDTO.getUser_email(),
                    enterpriseDTO.getUser_emailDomain(),
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

                Enterprise etpEntity = enterpriseRepository.findByMember(memberEntiry);

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

    public MemberDTO getMemberDTO(Member member) {

        MemberDTO memberDTO = entityToDto(member);

        return memberDTO;
    }

    //mypage read Enterprise
    public EnterpriseDTO getEnterprise(String user_id) {


        log.info("user-id : " + user_id);

        Object enterprise = memberRepository.findByUser_idEtpJoinMember(user_id);

        Object[] result = (Object[]) enterprise;
        System.out.println("enterprise : " + Arrays.toString(result));

        EnterpriseDTO enterpriseDTO = entityToDto((Enterprise) result[1], (Member) result[0]);
        System.out.println(enterpriseDTO.toString());

        return enterpriseDTO;
    }


    // 이름과 이메일이 일치하면 아이디값을 반환해주는 메소드
    public String confirmNameAndEmail(String name, String email, String emailDomain) {

        String id = memberRepository.findByUser_emailAndUser_name(email, emailDomain, name);

        return id;
    }

    // 이름과 전화번호가 일치하면 아이디 값을 반환해주는 메소드
    public String confirmNameAndPhone(String name, String[] phones) {

        String returnId = memberRepository.findByIdAndPh(name, phones[0], phones[1], phones[2]);
        log.info(phones[0] + phones[1] + phones[2]);
        log.info("member : " + returnId);

        if (returnId == null) {
            return null;
        } else {
            log.info(returnId);
            log.info("id : " + returnId);
            return returnId;
        }

    }

    // 아이디와 이메일이 일치하면 임시비밀번호를 이메일로 보내
    public int tempPwSendEmail(MemberForgotPwDTO memberForgotPwDTO) {

        Optional<Member> memberOpt = memberRepository.findById(memberForgotPwDTO.getUser_id());

        int result;

        if (memberOpt.isPresent()) {

            Member member = memberOpt.get();

            String DBemail = member.getUser_email() + "@" + member.getUser_emailDomain();

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

    // 아이디와 전화번호가 일치하면 임시 비밀번호를 발급해주는 기능
    public int tempPwSendPhone(MemberForgotPwDTO dto) {

        Optional<Member> memberOpt = memberRepository.findById(dto.getUser_id());

        if (memberOpt.isPresent()) {

            Member member = memberOpt.get();

            String DBPhone = member.getUser_ph()
                    + "-" + member.getUser_ph2()
                    + "-" + member.getUser_ph3();   // 010-xxxx-xxxx

            int result = dto.getUser_phone().equals(DBPhone) ? 1 : 0;

            if (result == 1) {
                // 폰번호랑 같으면 sms 보내기

                final String TO_PHONE_NUM = "01021259225";
                String FromPhoneNum = dto.getUser_phone().replace("-", "");
                String tempPw = getRandomPassword(5);

                final String api_key = "NCSWQDMNAAA81LTC";
                final String api_secret = "XQFEH6E6CFE3XZ6IRVCP8PVLOSSXPKAN";

                Message coolsms = new Message(api_key, api_secret);
                HashMap<String, String> params = new HashMap<>();

                params.put("to", FromPhoneNum);
                params.put("from", TO_PHONE_NUM);
                params.put("type", "SMS");
                params.put("text", member.getUser_id()
                        + "님의 임시 비밀번호는 [" + tempPw + "]입니다. "
                        + "\n 로그인 후 비밀번호를 변경해주세요");


                try {
                    JSONObject obj = (JSONObject) coolsms.send(params);
                    System.out.println(obj.toString());

                    // 임시비밀번호로 변경
                    member.modUser_pw(encoder.encode(tempPw));
                    memberRepository.save(member);

                    return 1;

                } catch (CoolsmsException e) {
                    System.out.println(e.getMessage());
                    System.out.println(e.getCode());
                    return 0;
                }

            } else {
                // 폰번호가 일치하지 않음 -- 오류 보냄
                return 0;
            }

        } else {
            return 0;
        }
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

    // 동적 쿼리 만들기
    public BooleanBuilder findByAllowUser(SearchDTO dto, int allow) {

        log.info("findByAllowUser실행");
        log.info("SearchDTO : " + dto);

        String id = dto.getId();
        String name = dto.getName();
        String shape = dto.getShape();

        log.info("shape : " + shape);

        LocalDateTime startDate = null;
        LocalDateTime endDate = null;


        String type = dto.getType();

        QMember qMember = QMember.member;
        QEnterprise qEtp = QEnterprise.enterprise;

        // allow 조건
        BooleanBuilder builder = new BooleanBuilder();
        BooleanExpression epAllow = qMember.user_allow.eq(allow);   // where user_allow = :allow 조건 추가
        builder.and(epAllow);

        // type 조건
        BooleanExpression epType;
        if (type.equals("UNIV")) {
            epType = qMember.user_type.notIn("ENTERPRISE"); // user_type not in ('ENTERPRISE")
        } else {
            epType = qMember.user_type.eq(type);  // user_type = :type
        }
        builder.and(epType);

        if (name == null && id == null && (startDate == null || endDate == null) && shape == null) {
            return builder;
        }

        if (name != null) {
            BooleanExpression epName = qMember.user_name.contains(name);                // name 조건
            builder.and(epName);
        }
        if (id != null) {
            BooleanExpression epId = qMember.user_id.contains(id);                      // id 조건
            builder.and(epId);
        }

        if (dto.getStartDate() != null && dto.getEndDate() != null) {
            // date
            startDate = LocalDate.parse(dto.getStartDate(), DateTimeFormatter.ISO_DATE).atStartOfDay();
            endDate = LocalDateTime.of(LocalDate.parse(dto.getEndDate(), DateTimeFormatter.ISO_DATE), LocalTime.of(23, 59, 59));

            BooleanExpression epDate = qMember.regDate.between(startDate, endDate);     // regdate 조건
            builder.and(epDate);
        }

        if (dto.getShape() != null) {
            log.info("if문 실헹 : ");
            BooleanExpression epShape = qEtp.etp_shape.eq(shape);
            log.info("epShape : " + epShape);
            builder.and(epShape);
            log.info("builder and 문 실행 현재 builder : " + epShape);
        }

        log.info("builder.getValue() : " + builder.getValue().toString());

        return builder;
    }

    public PageResultDTO<AllowEtpDTO, Object> getPageResultDTO(BooleanBuilder builder, Pageable pageable) {

        log.info("getPageResultDTO실행");

        Page<AllowEtpDTO> result = searchMemberRepository.getUser(builder, pageable);

        log.info("page<> result : " + result.getContent());

        log.info("function : " + getFunction().toString());

        return new PageResultDTO<>(result);
    }

    public Member[] findByType(String type) {
        return memberRepository.findByUser_type(type);
    }


}
