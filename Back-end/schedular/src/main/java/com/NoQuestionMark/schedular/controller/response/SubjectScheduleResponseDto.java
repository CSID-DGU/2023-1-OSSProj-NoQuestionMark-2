package com.NoQuestionMark.schedular.controller.response;

import com.NoQuestionMark.schedular.model.SubjectScheduleEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.persistence.DiscriminatorValue;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class SubjectScheduleResponseDto {
    private Long scheduleId;
    private String title;
    private String className;
    private String contents;
    private String schedule;
    private String subjectScheduleType;
    private String scheduleType;
    private String importance;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private int dDay;
    public static SubjectScheduleResponseDto fromSubjectSchedule(SubjectScheduleEntity subjectSchedule){
        return new SubjectScheduleResponseDto(
                subjectSchedule.getId(),
                subjectSchedule.getTitle(),
                subjectSchedule.getSubject().getSubjectName(),
                subjectSchedule.getContents(),
                SubjectScheduleEntity.class.getAnnotation(DiscriminatorValue.class).value(),
                subjectSchedule.getSubjectScheduleType().name(),
                subjectSchedule.getScheduleType().name(),
                subjectSchedule.getImportance().name(),
                subjectSchedule.getStartDate(),
                subjectSchedule.getEndDate(),
                subjectSchedule.getEndDate().getDayOfMonth() - LocalDateTime.now().getDayOfMonth());
    }
}
