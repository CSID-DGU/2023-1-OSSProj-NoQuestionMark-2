package com.NoQuestionMark.schedular.controller.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class CommonScheduleRequestDto {
    private String title;
    private String contents;
    private String importance;
    private String scheduleType;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

}
