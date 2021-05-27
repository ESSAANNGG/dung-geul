package com.dung.geul.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class IntroduceDTO {

    private Long num;

    private String title;

    private String content1;

    private String content2;

    private String content3;

    private String content4;

    private LocalDateTime start_date;

    private LocalDateTime end_date;

    private LocalDateTime regDate, modDate;


    private String user_id;

    private String user_name;

}
