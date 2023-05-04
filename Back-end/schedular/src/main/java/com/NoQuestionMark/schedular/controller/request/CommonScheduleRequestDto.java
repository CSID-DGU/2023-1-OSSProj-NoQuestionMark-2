package com.NoQuestionMark.schedular.controller.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalTime;

@AllArgsConstructor
@Getter
public class CommonScheduleRequestDto {
    private String title;
    private String contents;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalTime startTime;
    private LocalTime endTime;

}
