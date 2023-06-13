package com.NoQuestionMark.schedular.controller.response.userResponseDto;

import com.NoQuestionMark.schedular.model.UserSubject;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserSubjectsResponseDto {
    private Long subjectId;
    private String subjectName;

    public static UserSubjectsResponseDto fromUserSubject(UserSubject userSubject){
        return new UserSubjectsResponseDto(
                userSubject.getId(),
                userSubject.getSubject().getSubjectName());
    }
}
