package com.NoQuestionMark.schedular.controller.response;

import com.NoQuestionMark.schedular.model.entity.UserSubject;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserSubjectsResponseDto {
    private String subjectName;

    public static UserSubjectsResponseDto fromUserSubject(UserSubject userSubject){
        return new UserSubjectsResponseDto(
                userSubject.getSubject().getSubjectName());
    }
}
