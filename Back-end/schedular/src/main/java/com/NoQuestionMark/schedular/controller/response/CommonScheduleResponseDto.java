package com.NoQuestionMark.schedular.controller.response;

import com.NoQuestionMark.schedular.model.CommonScheduleEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.persistence.DiscriminatorValue;
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

    public static CommonScheduleResponseDto fromCommonSchedule(CommonScheduleEntity schedule) {
        return new CommonScheduleResponseDto(
                schedule.getId(),
                schedule.getTitle(),
                schedule.getContents(),
                schedule.getImportance().name(),
                CommonScheduleEntity.class.getAnnotation(DiscriminatorValue.class).value(),
                schedule.getScheduleType().name(),
                schedule.getStartDate(),
                schedule.getEndDate(),
                schedule.getEndDate().getDayOfMonth() - LocalDateTime.now().getDayOfMonth()
        );
    }
}
