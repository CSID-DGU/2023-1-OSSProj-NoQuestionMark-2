package com.NoQuestionMark.schedular.controller.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class OfficialScheduleRequestDto {
    private String title;
    private String contents;
    private String className;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String subjectScheduleType;
}
