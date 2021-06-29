package com.dung.geul.dto;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class CertificateDTO {

    private String lic_num;

    private String lic_name;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate lic_date;         // 취득일

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate lic_due_date;     // 만료일

    private String lic_agency;   // 발급기관

    private String lic_type; // 자격종류

    private String regDate;

    private String user_id;

    private int inCv;

    public void setRegDate(LocalDateTime regDate) {

        String stringRegDate = null;

        System.out.println("SetRegDate : " + regDate);

        LocalDate localDate = regDate.toLocalDate();

        if(regDate != null){
            stringRegDate = localDate.toString();

            System.out.println("stringRegDate : " + stringRegDate);
        }

        this.regDate = stringRegDate;
    }
}
