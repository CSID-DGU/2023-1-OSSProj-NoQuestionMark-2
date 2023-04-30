package com.NoQuestionMark.schedular.controller;

import com.NoQuestionMark.schedular.controller.request.UserJoinRequestDto;
import com.NoQuestionMark.schedular.controller.request.UserLoginRequestDto;
import com.NoQuestionMark.schedular.controller.response.Response;
import com.NoQuestionMark.schedular.controller.response.UserJoinResponseDto;
import com.NoQuestionMark.schedular.controller.response.UserLoginResponseDto;
import com.NoQuestionMark.schedular.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/signin")
    public Response<UserJoinResponseDto> join(@RequestBody UserJoinRequestDto requestDto){
        return Response.success(userService.join(requestDto));
    }

    @PostMapping("/login")
    public Response<UserLoginResponseDto> login(@RequestBody UserLoginRequestDto requestDto){
        String token = userService.login(requestDto.getSchoolNumber(), requestDto.getPassword());
        return Response.success(new UserLoginResponseDto(token));
    }

}
