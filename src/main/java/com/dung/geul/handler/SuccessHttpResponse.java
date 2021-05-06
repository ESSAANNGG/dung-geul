package com.dung.geul.handler;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SuccessHttpResponse<T> extends HttpResponse{

    private String code;
    private T data;

    public SuccessHttpResponse(T data){
        this.code = "200";
        this.data = data;
    }
}
