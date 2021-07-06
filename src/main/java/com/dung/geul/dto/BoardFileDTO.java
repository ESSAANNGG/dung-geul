package com.dung.geul.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BoardFileDTO {

    private String uuid;

    private String file_name;

    private String file_path;

    // getImageURL, getThumbnailURL는 Thymeleaf로 출력해서 사용
    public String getImageURL(){
        try {
            return URLEncoder.encode(file_path+"/"+uuid+"_"+file_name,"UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return "";
    }
//    public String getThumbnailURL(){
//        try {
//            return URLEncoder.encode(file_path+"/s_"+uuid+"_"+file_name,"UTF-8");
//        } catch (UnsupportedEncodingException e) {
//            e.printStackTrace();
//        }
//        return "";
//    }
}