package com.dung.geul.crypto.test;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.GetMethod;

public class HttpClientTestXml
{
  private static String url = "http://www.work.go.kr/jobRobot/jobRobotSearchOpenApi.jsp?key=WNGXWZ2MD29831W5OAMTP2VR1HJ&query=보육교사";
  
  public static void main(String[] args)
  {
    System.out.println("************** Start *********************");
    String rtnXml = "";
    byte[] responseBody = (byte[])null;
    HttpClient client = new HttpClient();
    GetMethod method = new GetMethod(url);
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
