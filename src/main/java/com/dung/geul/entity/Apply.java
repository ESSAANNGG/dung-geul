package com.dung.geul.entity;

import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class Apply implements Serializable {
    // 입사지원테이블

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long ap_id;

    private LocalDateTime apDate;  //지원 일자

    private String ap_area; // 희망 근무 지역

    private String ap_task; //희망 업무

    private String ap_pass; //서류합격유무


    // 이력서와 자소서
    @ManyToOne(fetch = FetchType.LAZY)
    private Introduce introduce;        // 자소서

    @ManyToOne(fetch = FetchType.LAZY)
    private CV cv;              // 이력서

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Employ employ; // 채용공고
}
