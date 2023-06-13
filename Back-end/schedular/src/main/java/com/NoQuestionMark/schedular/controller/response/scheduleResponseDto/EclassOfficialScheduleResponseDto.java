package com.NoQuestionMark.schedular.controller.response.scheduleResponseDto;


import com.NoQuestionMark.schedular.model.OfficialSubjectScheduleEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class EclassOfficialScheduleResponseDto {
    private Long scheduleId;
    private String title;
    private String subjectScheduleType;
    private LocalDateTime endDate;
    private int dDay;

    public static EclassOfficialScheduleResponseDto officialScheduleResponseDto(OfficialSubjectScheduleEntity schedule){
        return new EclassOfficialScheduleResponseDto(
                schedule.getId(),
                schedule.getTitle(),
                schedule.getSubjectScheduleType().name(),
                schedule.getEndDate(),
                LocalDateTime.now().getDayOfYear() - schedule.getEndDate().getDayOfYear());
    }

}
