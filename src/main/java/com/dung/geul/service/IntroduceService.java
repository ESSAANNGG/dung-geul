package com.dung.geul.service;

import com.dung.geul.dto.IntroduceDTO;
import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.entity.Introduce;
import com.dung.geul.entity.Member;

import java.util.function.Function;

public interface IntroduceService {

     Long register(IntroduceDTO introduceDTO);

    //자소서 리스트 서비스
    PageResultDTO<IntroduceDTO, Object[]> getList(PageRequestDTO pageRequestDTO, String user_id);

    IntroduceDTO read(Long num);

    void modify(IntroduceDTO introduceDTO);

    void remove(Long num);

    Introduce getIntroduce(Long intro_id);

    default Introduce dtoToEntity(IntroduceDTO introduceDTO) {

        Member member = Member.builder().user_id(introduceDTO.getUser_id()).build();

        Introduce introduce = Introduce.builder()
                .num(introduceDTO.getNum())
                .title(introduceDTO.getTitle())
                .content1(introduceDTO.getContent1())
                .content2(introduceDTO.getContent2())
                .content3(introduceDTO.getContent3())
                .content4(introduceDTO.getContent4())
                .start_date(introduceDTO.getStart_date())
                .end_date(introduceDTO.getEnd_date())
                .writer(member)
                .build();

        return introduce;
    }

    default IntroduceDTO entityToDTO(Introduce introduce, Member member) {

        IntroduceDTO introduceDTO = IntroduceDTO.builder()
                .num(introduce.getNum())
                .title(introduce.getTitle())
                .content1(introduce.getContent1())
                .content2(introduce.getContent2())
                .content3(introduce.getContent3())
                .content4(introduce.getContent4())
                .regDate(introduce.getRegDate())
                .start_date(introduce.getRegDate())
                .end_date(introduce.getEnd_date())
                .user_id(member.getUser_id())
                .build();

        return introduceDTO;
    };


    default IntroduceDTO List(Introduce introduce, Member member) {

        IntroduceDTO introduceDTO = IntroduceDTO.builder()
                .num(introduce.getNum())
                .title(introduce.getTitle())
                .content1(introduce.getContent1())
                .content2(introduce.getContent2())
                .content3(introduce.getContent3())
                .content4(introduce.getContent4())
                .start_date(introduce.getRegDate())
                .end_date(introduce.getEnd_date())
                .regDate(introduce.getRegDate())
                .modDate(introduce.getModDate())
                .user_id(member.getUser_id())
                .user_name(member.getUser_name())
                .build();

        return introduceDTO;
    };

    //자소서 서비스 함수
    default Function<Object[], IntroduceDTO> getFunction(){
        Function<Object[], IntroduceDTO> fn = (en -> entityToDTO((Introduce) en[0], (Member) en[1]));
        return fn;
    }

}
