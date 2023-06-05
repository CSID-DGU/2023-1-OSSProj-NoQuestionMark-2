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

    public static OfficialScheduleResponseDto officialScheduleResponseDto(OfficialSubjectScheduleEntity entity){
        return new OfficialScheduleResponseDto(
                entity.getId(),
                entity.getTitle(),
                entity.getSubject().getSubjectName(),
                entity.getContents(),
                OfficialSubjectScheduleEntity.class.getAnnotation(DiscriminatorValue.class).value(),
                entity.getSubjectScheduleType().name(),
                entity.getStartDate(),
                entity.getEndDate(),
                entity.getEndDate().getDayOfMonth() - LocalDateTime.now().getDayOfMonth());

    }

}
