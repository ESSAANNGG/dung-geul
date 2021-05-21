package com.dung.geul.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Embeddable
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString(exclude = "Board") //연관 관계시 항상 주의
public class Board_file {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long file_num;

    private String uuid;

    private String file_name;

    private String file_path;

    @ManyToOne(fetch = FetchType.LAZY) //무조건 lazy로
    private Board board ;


}