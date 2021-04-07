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
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.mail.internet.MimeMessage;
import java.security.SecureRandom;
import java.util.Date;
import java.util.Optional;

@Service
public class MemberServiceImpl implements MemberService{

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private EnterpriseRepository enterpriseRepository;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired private JavaMailSenderImpl mailSender;

    //메일 발송 메소드
//    @RequestMapping(value = "/sendMail.do")
//    public String sendMail(final MailVO vo) {
//        final MimeMessagePreparator preparator = new MimeMessagePreparator() {
//            @Override
//            public void prepare(MimeMessage mimeMessage) throws Exception {
//                final MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
//                helper.setFrom(vo.getFrom());
//                helper.setTo(vo.getTo());
//                helper.setSubject(vo.getSubject());
//                helper.setText(vo.getContents(), true);
//            }
//        };
//        mailSender.send(preparator); return "result";
//    }




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

    // mypage read
    public Member getMember(String user_id) {

        Optional<Member> memberOpt = memberRepository.findById(user_id);

        return memberOpt.get();
    }

    // 이름과 이메일이 일치하면 아이디값을 반환해주는 메소드
    public String confirmNameAndEmail(MemberDTO memberDTO) {

        String id = memberRepository.findByUser_emailAndUser_name(memberDTO.getUser_email(), memberDTO.getUser_name());

        return id;
    }

    // 아이디와 이메일이 일치하면 임시비밀번호를 발급해주기
    public int tempPwSendEmail(MemberDTO memberDTO) {

        Optional<Member> memberOpt = memberRepository.findByUser_emailAndUser_id(memberDTO.getUser_email(), memberDTO.getUser_id());

        int result;

        if(memberOpt.isEmpty()){
            result = 0;
        }else{
            String tempPw = getRamdomPassword(5);

            // 이메일 보내는 코드 작성하기 ~~~
            
            result = 1;
        }

        return result;
    }

    // 입력한 숫자만큼의 크기의 랜덤 문자열을 반환 (임시 비밀번호로 사용)
    public String getRamdomPassword(int size) {
        char[] charSet = new char[] {
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

        for (int i=0; i<size; i++) {
            // idx = (int) (len * Math.random());
            idx = sr.nextInt(len); // 강력한 난수를 발생시키기 위해 SecureRandom을 사용한다.
            sb.append(charSet[idx]);
        }
            return sb.toString();
    }

}
