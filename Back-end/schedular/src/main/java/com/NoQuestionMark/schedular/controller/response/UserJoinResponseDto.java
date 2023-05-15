package com.NoQuestionMark.schedular.controller.response;

import com.NoQuestionMark.schedular.model.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserJoinResponseDto {

    private String schoolNumber;
    private String name;
    private String userType;

    public static UserJoinResponseDto toUserJoinResponse(UserEntity user) {
        return new UserJoinResponseDto(
                user.getSchoolNumber(),
                user.getName(),
                user.getUserType().name()
        );
    }
}
