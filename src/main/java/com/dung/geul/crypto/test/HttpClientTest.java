package com.dung.geul.crypto.test;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.GetMethod;

public class HttpClientTest
{
  private static String url = "http://openapi.work.go.kr/opi/opi/opia/wantedApi.do?returnType=xml&startPage=1&display=10&callTp=L&authKey=WNGXVGIDR0JK75CY4TFRV2VRETJ";
  
  public static void main(String[] args)
  {
    System.out.println("************** Start *********************");
    String rtnXml = "";
    byte[] responseBody = (byte[])null;
    HttpClient client = new HttpClient();
    
    GetMethod method = new GetMethod(url);
    method.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
    
    System.out.println("debug --> 1");
    try
    {
      System.out.println("debug --> 2");
      int responseCode = client.executeMethod(method);
      System.out.println("responseCode -->" + responseCode);
      if (responseCode == 200)
      {
        responseBody = method.getResponseBody();
        
        System.out.println("print 1 : " + new String(responseBody));
        
        rtnXml = new String(responseBody, "UTF-8");
        System.out.println("print 2 : " + rtnXml);
      }
    }
    catch (Exception localException) {}
    method.releaseConnection();
  }
}
