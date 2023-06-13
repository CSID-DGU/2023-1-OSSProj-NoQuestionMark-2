package com.NoQuestionMark.schedular.controller.response.scheduleResponseDto;

import com.NoQuestionMark.schedular.model.CommonScheduleEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
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
    private String complete;
    private int dDay;

    @Builder
    public CommonScheduleResponseDto(CommonScheduleEntity schedule){
        this.scheduleId = schedule.getId();
        this.title = schedule.getTitle();
        this.contents = schedule.getContents();
        this.importance = schedule.getImportance().name();
        this.schedule = CommonScheduleEntity.class.getAnnotation(DiscriminatorValue.class).value();
        this.scheduleType = schedule.getScheduleType().name();
        this.startDate = schedule.getStartDate();
        this.endDate = schedule.getEndDate();
        this.complete = schedule.getComplete().name();
        this.dDay = LocalDateTime.now().getDayOfYear() - schedule.getEndDate().getDayOfYear();
    }
    public static CommonScheduleResponseDto fromSchedule(CommonScheduleEntity schedule) {
        return new CommonScheduleResponseDto(schedule);
    }
}
