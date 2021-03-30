package com.dung.geul.dto;

import com.dung.geul.entity.Member;
import lombok.Data;
import org.apache.tomcat.jni.Local;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDate;

@Data
public class CvPageDTO {

    private Long cv_id;

    private String user_id;

    private String user_name;

    private LocalDate birth;
//
//    private LocalDate currentDate;

    private String user_hp;

    private String user_email;

    // 현재 만나이 계산
    public int getAge(){

        int currentYear = LocalDate.now().getYear();
        int currentDay = LocalDate.now().getDayOfYear();

        System.out.print("year : " + currentYear  + " day : " + currentDay);

        System.out.println("birth : " + birth);

        int age = currentYear - this.birth.getYear();

        // 생일이 지났는지 안지났는지
        if(currentDay < birth.getDayOfYear()) age--;

        return age;
    }

}
