package com.NoQuestionMark.schedular.controller.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UserLoginRequestDto {

    private String schoolNumber;
    private String password;
}
