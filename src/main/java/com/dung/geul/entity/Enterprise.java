package com.dung.geul.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Table(name="Enterprise")
@ToString
public class Enterprise implements Serializable{

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private Long etp_id;

        @OneToOne
        @JoinColumn(name = "etp_user_id" ,foreignKey = @ForeignKey(name="etp_user_id_fk"))
        private Member user_id;

        @Column(length = 12, nullable = false)
        private String etp_num; //사업자등록번호

        @Column(length = 60, nullable = false)
        private String etp_name; // 기업이름

        @Column(length = 10, nullable = false)
        private String etp_ceo_name; // 대표자이름

        @Column(length = 3, nullable = false)
        private String etp_ph; // 기업 전화번호

        @Column(length = 4, nullable = false)
        private String etp_ph2; // 기업 전화번호

        @Column(length = 4, nullable = false)
        private String etp_ph3; // 기업 전화번호

        private String etp_fx; // 기업 팩스번호

        private String etp_home; // 기업 홈페이지

        private String etp_contents; // 주요사업내용

        // member에 주소 있어서 postcode, addr, detail_addr 뺌

        //@Temporal(TemporalType.DATE) //날짜만 출력  (TemporalType.TIME 시간만 출력)
        private LocalDate etp_year; // 설립년도

        @Column(length = 4, nullable = false)
        private int etp_member; // 직원 수

        @Column(length = 10, nullable = false)
        private String etp_sector; // 업종


        // 이건 나중에 인증할 때 사용
        @Column(length = 5)
        private String etp_shape; // 기업 형태 (대기업, 중견기업, 중소기업)


        // 인증해줄 때 기업 형태 입력
        public void modifyEtp_shape(String etp_shape){
                this.etp_shape = etp_shape;
        }

        // 기업 정보 수정
        public void modifyEtpInfo(String etp_name,
                                  int etp_member,
                                  String etp_ceo_name,
                                  String etp_home,
                                  String etp_contents,
                                  String etp_fx,
                                  LocalDate etp_year,
                                  String etp_sector){
                this.etp_name = etp_name;
                this.etp_member = etp_member;
                this.etp_sector = etp_sector;
                this.etp_fx = etp_fx;
                this.etp_ceo_name = etp_ceo_name;
                this.etp_contents = etp_contents;
                this.etp_home = etp_home;
                this.etp_year = etp_year;
        }


}
