package com.NoQuestionMark.schedular.controller.response.scheduleResponseDto;

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
    private String complete;
    public static SubjectScheduleResponseDto fromSubjectSchedule(SubjectScheduleEntity schedule){
        return new SubjectScheduleResponseDto(
                schedule.getId(),
                schedule.getTitle(),
                schedule.getSubject().getSubjectName(),
                schedule.getContents(),
                SubjectScheduleEntity.class.getAnnotation(DiscriminatorValue.class).value(),
                schedule.getSubjectScheduleType().name(),
                schedule.getScheduleType().name(),
                schedule.getImportance().name(),
                schedule.getStartDate(),
                schedule.getEndDate(),
                LocalDateTime.now().getDayOfYear() - schedule.getEndDate().getDayOfYear(),
                schedule.getComplete().name()
        );
    }
}
