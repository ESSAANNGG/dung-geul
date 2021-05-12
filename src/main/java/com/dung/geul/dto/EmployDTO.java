package com.dung.geul.dto;

import com.dung.geul.entity.Enterprise;
import lombok.*;


import java.time.LocalDateTime;

@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
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


    private Long etp_id;

    private String etp_num;

    private String etp_name;

    private String etp_sector;

    private String etp_shape;

    private String etp_ph;

    private String etp_ph2;

    private String etp_ph3;

    private String etp_home;

    private int etp_member;

    private String etp_ceo_name;

    private String etp_fx;


}
