package com.NoQuestionMark.schedular.controller;



import com.NoQuestionMark.schedular.controller.request.UserJoinRequestDto;
import com.NoQuestionMark.schedular.controller.request.UserLoginRequestDto;
import com.NoQuestionMark.schedular.controller.response.Response;
import com.NoQuestionMark.schedular.controller.response.userResponseDto.UserHomeResponseDto;
import com.NoQuestionMark.schedular.controller.response.userResponseDto.UserJoinResponseDto;
import com.NoQuestionMark.schedular.controller.response.userResponseDto.UserLoginResponseDto;
import com.NoQuestionMark.schedular.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * 유저 관련 api
 */

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public Response<UserJoinResponseDto> join(@RequestBody UserJoinRequestDto requestDto){
        return Response.success(userService.join(requestDto));
    }

    @PostMapping("/login")
    public Response<UserLoginResponseDto> login(@RequestBody UserLoginRequestDto requestDto){
        return Response.success(userService.login(requestDto.getSchoolNumber(), requestDto.getPassword()));
    }

    @GetMapping("/home")
    public Response<UserHomeResponseDto> home(Authentication authentication){
        return Response.success(userService.getHome(authentication.getName()));
    }
}
