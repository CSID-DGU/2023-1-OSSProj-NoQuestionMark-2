package com.NoQuestionMark.schedular.controller.response.scheduleResponseDto;

import com.NoQuestionMark.schedular.model.CommonScheduleEntity;
import com.NoQuestionMark.schedular.model.OfficialSubjectScheduleEntity;
import com.NoQuestionMark.schedular.model.SubjectScheduleEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.persistence.DiscriminatorValue;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ToDoListResponseDto {
    private Long scheduleId;
    private String schedule;
    private String title;
    private LocalDateTime endDate;
    private int dDay;
    private String complete;

    public static ToDoListResponseDto fromOfficial(OfficialSubjectScheduleEntity entity, String complete){
        return new ToDoListResponseDto(
                entity.getId(),
                OfficialSubjectScheduleEntity.class.getAnnotation(DiscriminatorValue.class).value(),
                entity.getTitle(),
                entity.getEndDate(),
                LocalDateTime.now().getDayOfYear() - entity.getEndDate().getDayOfYear(),
                complete
        );
    }

    public static ToDoListResponseDto fromCommon(CommonScheduleEntity entity){
        return new ToDoListResponseDto(
                entity.getId(),
                CommonScheduleEntity.class.getAnnotation(DiscriminatorValue.class).value(),
                entity.getTitle(),
                entity.getEndDate(),
                LocalDateTime.now().getDayOfYear() - entity.getEndDate().getDayOfYear(),
                entity.getComplete().name()
        );
    }

    public static ToDoListResponseDto fromSubject(SubjectScheduleEntity entity){
        return new ToDoListResponseDto(
                entity.getId(),
                SubjectScheduleEntity.class.getAnnotation(DiscriminatorValue.class).value(),
                entity.getTitle(),
                entity.getEndDate(),
                LocalDateTime.now().getDayOfYear() - entity.getEndDate().getDayOfYear(),
                entity.getComplete().name()
        );
    }
}
