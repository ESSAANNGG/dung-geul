package com.dung.geul.service;

import com.dung.geul.dto.IntroduceDTO;
import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.entity.Introduce;
import com.dung.geul.entity.Member;

public interface IntroduceService {

     Long register(IntroduceDTO introduceDTO);

    PageResultDTO<IntroduceDTO, Object[]> getList(PageRequestDTO pageRequestDTO);

    IntroduceDTO read(Long num);

    void modify(IntroduceDTO introduceDTO);

    void remove(Long num);

    default Introduce dtoToEntity(IntroduceDTO introduceDTO) {

        Member member = Member.builder().user_id(introduceDTO.getUser_id()).build();

        Introduce introduce = Introduce.builder()
                .num(introduceDTO.getNum())
                .title(introduceDTO.getTitle())
                .content(introduceDTO.getContent())
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
                .content(introduce.getContent())
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
                .content(introduce.getContent())
                .start_date(introduce.getRegDate())
                .end_date(introduce.getEnd_date())
                .regDate(introduce.getRegDate())
                .modDate(introduce.getModDate())
                .user_id(member.getUser_id())
                .user_name(member.getUser_name())
                .build();

        return introduceDTO;
    };


}
