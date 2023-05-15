package com.NoQuestionMark.schedular.controller.request;

import com.NoQuestionMark.schedular.model.entity.CommonScheduleType;
import com.NoQuestionMark.schedular.model.entity.Importance;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.Month;

@AllArgsConstructor
@Getter
public class CommonScheduleRequestDto {
    private String title;
    private String contents;
    private Importance importance;
    private String commonScheduleType;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

}
