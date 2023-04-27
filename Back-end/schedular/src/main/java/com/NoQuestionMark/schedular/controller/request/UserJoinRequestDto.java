package com.NoQuestionMark.schedular.controller.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UserJoinRequestDto {

    private String schoolNumber;
    private String name;
    private String password;
    private String userType;
    private String email;

}
