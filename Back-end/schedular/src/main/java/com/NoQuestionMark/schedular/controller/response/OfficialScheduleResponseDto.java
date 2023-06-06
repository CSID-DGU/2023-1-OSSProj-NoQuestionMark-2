package com.NoQuestionMark.schedular.controller.response;


import com.NoQuestionMark.schedular.model.OfficialSubjectScheduleEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.persistence.DiscriminatorValue;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class OfficialScheduleResponseDto {
    private Long scheduleId;
    private String title;
    private String className;
    private String contents;
    private String schedule;
    private String subjectScheduleType;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private int dDay;

    public static OfficialScheduleResponseDto officialScheduleResponseDto(OfficialSubjectScheduleEntity schedule){
        return new OfficialScheduleResponseDto(
                schedule.getId(),
                schedule.getTitle(),
                schedule.getSubject().getSubjectName(),
                schedule.getContents(),
                OfficialSubjectScheduleEntity.class.getAnnotation(DiscriminatorValue.class).value(),
                schedule.getSubjectScheduleType().name(),
                schedule.getStartDate(),
                schedule.getEndDate(),
                LocalDateTime.now().getDayOfMonth() - schedule.getEndDate().getDayOfMonth());
    }

}
