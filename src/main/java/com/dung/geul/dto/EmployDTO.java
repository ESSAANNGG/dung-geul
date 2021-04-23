package com.dung.geul.dto;

import lombok.*;


import java.time.LocalDateTime;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class EmployDTO {

    private Long num;

    private String title;

    private String content;

    private String ot;

    private String ep;

    private LocalDateTime start_date, end_date;

    private String people;

    private String career;

    private String education;

    private String salary;

    private String area;

    private String apply;

    private String file;

    private LocalDateTime regDate, modDate;


}
