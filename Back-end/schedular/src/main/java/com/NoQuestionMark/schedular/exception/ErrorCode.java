package com.NoQuestionMark.schedular.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    DUPLICATED_CODE(HttpStatus.CONFLICT, "이미 존재하는 학번 정보입니다."),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "잘못된 토큰입니다."),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "찾으시는 유저가 없습니다."),
    INVALID_PASSWORD(HttpStatus.CONFLICT, "비밀번호가 일치하지 않습니다."),
    SUBJECT_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 과목을 찾을 수 없습니다."),
    USER_NOT_AUTHORIZED(HttpStatus.UNAUTHORIZED,"교수만 가능한 작업입니다." ),
    SCHEDULE_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 일정을 찾을 수 없습니다.");
    private HttpStatus status;
    private String message;
}
