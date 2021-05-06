package com.dung.geul.handler;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ErrorHttpResponse extends HttpResponse{

    private String code;
    private String message;

    public ErrorHttpResponse(String code, String message){
        this.code = code;
        this.message = message;
    }
}
