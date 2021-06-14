package com.dung.geul.controller.restcontroller;

import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@RestController
public class JobDictionaryRestController {

    private  String authKey = "WNKO266ZTVI72UBY9LVWV2VR1HK";

    // 직업사전 키워드 검색
    @PostMapping("/jobSerchK")
    public String jobSerchKeyword(String searchCode) {   // 클라이언트로 부터 받아온 키워드를 워크넷api 서버에 직업사전 검색 요청
        System.out.println("================================================================");
        System.out.println("클라이언트 측으로 부터 입력 받은 키워드 : " + searchCode);
        System.out.println("================================================================");

        StringBuffer result = new StringBuffer();
        try {
            String apiUrl = "http://openapi.work.go.kr/opi/opi/opia/korJobDicApi.do?authKey=" +
                    authKey +
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
            result.append("");

            while ((returnLine = bufferedReader.readLine()) != null) {
                result.append(returnLine + "\n");
            }

            urlConnection.disconnect();

        } catch(Exception e) {
            e.printStackTrace();
        }


        System.out.println("result : " + result );   // 테스트용
        System.out.println("================================================================");

        return result + "";
    }

    // 직업사전 조건 검색
    @PostMapping("/jobSearchCon")
    public String jobSearchConditional(String eduLevel, String skillYear) {    // 교육수준, 숙련기간
        System.out.println("================================================================");
        System.out.println("[클라이언트 측으로 부터 입력 받은 값] \n" +
                           "교육수준 : " + eduLevel + "\n" +
                           "숙련기간 : " + skillYear);
        System.out.println("================================================================");



        StringBuffer result = new StringBuffer();
        try {

            // 클라이언트 측에서 요청한 조건 검색에서 아무것도 선택하지 않았으면 null 값이 전달 되는데,
            // API요청 시 null 값이 들어가면 검색하는데 원하는 값이 return되지 않으므로 ""(공백)으로 변환해 준다.
            if(eduLevel == null) {
                eduLevel = "";
            } else if(skillYear == null) {
                skillYear = "";
            }

            String apiUrl = "http://openapi.work.go.kr/opi/opi/opia/korJobDicApi.do?authKey=" +
                    authKey + "&returnType=XML&target=dJobCD&startPage=1&display=10&srchType=EL|WS|SY&" +
                    eduLevel + "&workStrong=&" +
                    skillYear;

            System.out.println("API 요청 URL : " + apiUrl);

            URL url = new URL(apiUrl);
            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestMethod("GET");

            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "UTF-8"));

            String returnLine;
            // xml 태그는 모든 html 태그들을 일반 문자로 인식해서 모든 문자와 모든 태그들을 일반 문자처럼 출력해주는 동시에
            // 태그로서의 기능은 상실해 작동하지 않게 된다.
            result.append("");

            while ((returnLine = bufferedReader.readLine()) != null) {
                result.append(returnLine + "\n");
            }

            urlConnection.disconnect();

        } catch(Exception e) {
            e.printStackTrace();
        }


        System.out.println("result : " + result );   // 테스트용
        System.out.println("================================================================");

        return result + "";
    }


}
