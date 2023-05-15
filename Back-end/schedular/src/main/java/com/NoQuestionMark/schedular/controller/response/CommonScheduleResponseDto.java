package com.NoQuestionMark.schedular.controller.response;

import com.NoQuestionMark.schedular.model.entity.CommonScheduleEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class CommonScheduleResponseDto {
    private Long scheduleId;
    private String title;
    private String contents;
    private String importance;
    private String schedule;
    private String scheduleType;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private int dDay;

    public static CommonScheduleResponseDto fromCommonSchedule(CommonScheduleEntity schedule){
        return new CommonScheduleResponseDto(
                schedule.getId(),
                schedule.getTitle(),
                schedule.getContents(),
                schedule.getImportance().name(),
                "COMMON",
                schedule.getCommonScheduleType().name(),
                schedule.getStartDate(),
                schedule.getEndDate(),
                schedule.getStartDate().getDayOfMonth() - LocalDateTime.now().getDayOfMonth());
    }

}
