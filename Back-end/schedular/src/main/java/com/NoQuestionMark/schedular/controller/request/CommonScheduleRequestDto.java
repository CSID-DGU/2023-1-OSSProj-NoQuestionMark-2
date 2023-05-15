package com.NoQuestionMark.schedular.controller.request;

import com.NoQuestionMark.schedular.model.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@AllArgsConstructor
@Getter
public class CommonScheduleRequestDto {
    private String title;
    private String contents;
    private String schoolNumber;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

}
