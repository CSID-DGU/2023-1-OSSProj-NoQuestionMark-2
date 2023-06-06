package com.NoQuestionMark.schedular.controller.response;

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
    private LocalDateTime endDate;
    private int dDay;

    public static ToDoListResponseDto fromOfficial(OfficialSubjectScheduleEntity entity){
        return new ToDoListResponseDto(entity.getId(),
                OfficialSubjectScheduleEntity.class.getAnnotation(DiscriminatorValue.class).value(),
                entity.getEndDate(),
                LocalDateTime.now().getDayOfMonth() - entity.getEndDate().getDayOfMonth()
                );
    }

    public static ToDoListResponseDto fromCommon(CommonScheduleEntity entity){
        return new ToDoListResponseDto(entity.getId(),
                CommonScheduleEntity.class.getAnnotation(DiscriminatorValue.class).value(),
                entity.getEndDate(),
                LocalDateTime.now().getDayOfMonth() - entity.getEndDate().getDayOfMonth()
        );
    }

    public static ToDoListResponseDto fromSubject(SubjectScheduleEntity entity){
        return new ToDoListResponseDto(entity.getId(),
                SubjectScheduleEntity.class.getAnnotation(DiscriminatorValue.class).value(),
                entity.getEndDate(),
                LocalDateTime.now().getDayOfMonth() - entity.getEndDate().getDayOfMonth()
        );
    }
}
