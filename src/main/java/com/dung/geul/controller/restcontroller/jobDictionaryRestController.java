package com.dung.geul.controller.restcontroller;

import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@RestController
public class jobDictionaryRestController {

    @RequestMapping("/jobSerchK")
    public String jobSerchKeyword(String searchCode) {   // 클라이언트로 부터 받아온 키워드를 워크넷api 서버에 직업사전 검색 요청
        System.out.println("'jobSerchK' GETMAPPING 요청 =====================================");
        System.out.println("클라이언트 측으로 부터 입력 받은 키워드 : " + searchCode);
        System.out.println("================================================================");

        StringBuffer result = new StringBuffer();
        try {
            String apiUrl = "http://openapi.work.go.kr/opi/opi/opia/korJobDicApi.do?authKey=" +
                    "WNKO266ZTVI72UBY9LVWV2VR1HK" +
                    "&returnType=XML&target=dJobCD&startPage=1&display=10" +
                    "&srchType=K&keyword=" +
                    searchCode;

            URL url = new URL(apiUrl);
            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestMethod("GET");

            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "UTF-8"));

            String returnLine;
            // xml 태그는 모든 html 태그들을 일반 문자로 인식해서 모든 문자와 모든 태그들을 일반 문자처럼 출력해주는 동시에
            // 태그로서의 기능은 상실해 작동하지 않게 된다.
            result.append("<xmp>");

            while ((returnLine = bufferedReader.readLine()) != null) {
                result.append(returnLine + "\n");
            }

            urlConnection.disconnect();

        } catch(Exception e) {
            e.printStackTrace();
        }


        System.out.println("result : " + result );   // 테스트용
        System.out.println("================================================================");

        return result + "</xmp>";
    }


}
