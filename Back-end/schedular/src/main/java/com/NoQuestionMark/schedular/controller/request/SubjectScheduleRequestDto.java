package com.NoQuestionMark.schedular.controller.request;

import com.NoQuestionMark.schedular.model.entity.Importance;
import com.NoQuestionMark.schedular.model.entity.SubjectScheduleType;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class SubjectScheduleRequestDto {
    private String title;
    private String contents;
    private String className;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String subjectScheduleType;
}
