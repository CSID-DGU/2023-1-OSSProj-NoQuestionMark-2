package com.NoQuestionMark.schedular.controller.response;

import com.NoQuestionMark.schedular.model.entity.CommonScheduleEntity;
import com.NoQuestionMark.schedular.model.entity.SubjectScheduleEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

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

    public static UserScheduleResponseDto fromCommonSchedule(CommonScheduleEntity schedule){
        return new UserScheduleResponseDto(
                schedule.getId(),
                schedule.getTitle(),
                schedule.getStartDate(),
                "Common",
                schedule.getScheduleType().name(),
                "",
                schedule.getStartDate().getDayOfMonth() - LocalDateTime.now().getDayOfMonth()
                );
    }

    public static UserScheduleResponseDto fromSubjectSchedule(SubjectScheduleEntity schedule){
        return new UserScheduleResponseDto(
                schedule.getId(),
                schedule.getTitle(),
                schedule.getStartDate(),
                "Subject",
                schedule.getSubjectScheduleType().name(),
                schedule.getSubject().getSubjectName(),
                schedule.getStartDate().getDayOfMonth() - LocalDateTime.now().getDayOfMonth());
    }
}
