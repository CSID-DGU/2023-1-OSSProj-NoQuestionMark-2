package com.NoQuestionMark.schedular.controller.response.userResponseDto;

import com.NoQuestionMark.schedular.model.CommonScheduleEntity;
import com.NoQuestionMark.schedular.model.OfficialSubjectScheduleEntity;
import com.NoQuestionMark.schedular.model.SubjectScheduleEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.persistence.DiscriminatorValue;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class UserScheduleResponseDto {
    private Long scheduleId;
    private String title;
    private LocalDateTime scheduleTime;
    private String schedule;
    private String scheduleType;
    private String className;

    private int dDay;

    public static UserScheduleResponseDto fromCommonSchedule(CommonScheduleEntity schedule) {
        return new UserScheduleResponseDto(
                schedule.getId(),
                schedule.getTitle(),
                schedule.getStartDate(),
                CommonScheduleEntity.class.getAnnotation(DiscriminatorValue.class).value(),
                schedule.getScheduleType().name(),
                "",
                LocalDateTime.now().getDayOfYear() - schedule.getEndDate().getDayOfYear()
        );
    }

    public static UserScheduleResponseDto fromSubjectSchedule(SubjectScheduleEntity schedule) {
        return new UserScheduleResponseDto(
                schedule.getId(),
                schedule.getTitle(),
                schedule.getStartDate(),
                SubjectScheduleEntity.class.getAnnotation(DiscriminatorValue.class).value(),
                schedule.getSubjectScheduleType().name(),
                schedule.getSubject().getSubjectName(),
                LocalDateTime.now().getDayOfYear() - schedule.getEndDate().getDayOfYear()
        );
    }

    public static UserScheduleResponseDto fromOfficialSchedule(OfficialSubjectScheduleEntity schedule) {
        return new UserScheduleResponseDto(
                schedule.getId(),
                schedule.getTitle(),
                schedule.getStartDate(),
                OfficialSubjectScheduleEntity.class.getAnnotation(DiscriminatorValue.class).value(),
                schedule.getSubjectScheduleType().name(),
                schedule.getSubject().getSubjectName(),
                LocalDateTime.now().getDayOfYear() - schedule.getEndDate().getDayOfYear());
    }
}
