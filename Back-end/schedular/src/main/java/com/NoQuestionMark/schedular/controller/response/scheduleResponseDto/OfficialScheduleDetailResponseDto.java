package com.NoQuestionMark.schedular.controller.response.scheduleResponseDto;

import com.NoQuestionMark.schedular.model.OfficialSubjectScheduleEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class OfficialScheduleDetailResponseDto {
    private Long scheduleId;
    private String title;
    private String subjectScheduleType;
    private String contents;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private int dDay;
    private String complete;

    public static OfficialScheduleDetailResponseDto officialScheduleResponseDto(OfficialSubjectScheduleEntity schedule, String complete){
        return new OfficialScheduleDetailResponseDto(
                schedule.getId(),
                schedule.getTitle(),
                schedule.getSubjectScheduleType().name(),
                schedule.getContents(),
                schedule.getStartDate(),
                schedule.getEndDate(),
                LocalDateTime.now().getDayOfMonth() - schedule.getEndDate().getDayOfMonth(),
                complete
        );
    }

}
