package com.dung.geul.entity;

import lombok.*;

import javax.persistence.*;


@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Table(name="file")
@ToString
public class File {

    @Id
    @GeneratedValue
    private Long id;                //파일 아이디(pk)

    @Column(nullable = false)
    private String origFilename;    // 원본 파일명

    @Column(nullable = false)
    private String filename;        // 서버에 저장되는 파일명 (MD5 처리 후 파일명)

    @Column(nullable = false)
    private String filePath;        // 서버에 저장되는 파일 경로

//    @Builder
//    public File(Long id, String origFilename, String filename, String filePath) {
//        this.id = id;
//        this.origFilename = origFilename;
//        this.filename = filename;
//        this.filePath = filePath;
//    }
}
