package com.dung.geul.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Table(name="enterprise")
public class Enterprise implements Serializable{

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private String etp_id;

        @OneToOne
        @JoinColumn(name="member")
        private Member member;

        @Column(length = 10, nullable = false)
        private String etp_num; //기업명

        @Column(length = 60, nullable = false)
        private String etp_name; // 기업이름

        @Column(length = 10, nullable = false)
        private String etp_ceo_name; // 대표자이름

        @Column(length = 11, nullable = false)
        private String etp_ph; // 기업 전화번호

        @Column(length = 12, nullable = false)
        private String etp_px; // 기업 팩스번호

        @Column(nullable = false)
        private String etp_home; // 기업 홈페이지

        private String etp_contents; // 주요사업내용

        @Column(length = 5, nullable = false)
        private String etp_post; // 우편번호

        @Column(nullable = false)
        private String etp_detail_addr; // 상세주소

        //@Temporal(TemporalType.DATE) //날짜만 출력  (TemporalType.TIME 시간만 출력)
        private LocalDate etp_year; // 설립년도

        @Column(length = 4, nullable = false)
        private int etp_member; // 직원 수

        @Column(length = 1, nullable = false)
        private String etp_Sector; // 업종

        @Column(length = 1, nullable = false )
        private String etp_shape; // 기업 형태

        @Column(length = 1, nullable = false)
        private String etp_allow; // 인증여부

}
