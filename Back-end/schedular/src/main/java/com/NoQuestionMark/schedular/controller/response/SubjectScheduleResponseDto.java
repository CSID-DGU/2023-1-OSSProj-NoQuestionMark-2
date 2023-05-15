package com.NoQuestionMark.schedular.controller.response;

import com.NoQuestionMark.schedular.model.entity.SubjectScheduleEntity;
import com.NoQuestionMark.schedular.model.entity.UserSubject;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class SubjectScheduleResponseDto {
    private Long scheduleId;
    private String title;
    private String contents;
    private String schedule;
    private String scheduleType;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private int dDay;
    public static SubjectScheduleResponseDto fromSubjectSchedule(SubjectScheduleEntity subjectSchedule){
        return new SubjectScheduleResponseDto(
                subjectSchedule.getId(),
                subjectSchedule.getTitle(),
                subjectSchedule.getContents(),
                "SUBJECT",
                subjectSchedule.getSubjectScheduleType().name(),
                subjectSchedule.getStartDate(),
                subjectSchedule.getEndDate(),
                subjectSchedule.getStartDate().getDayOfMonth() - LocalDateTime.now().getDayOfMonth());
    }
}
