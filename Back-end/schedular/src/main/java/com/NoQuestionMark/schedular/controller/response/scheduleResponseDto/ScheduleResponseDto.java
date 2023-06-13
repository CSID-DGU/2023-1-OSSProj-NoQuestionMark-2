package com.NoQuestionMark.schedular.controller.response.scheduleResponseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ScheduleResponseDto {

    List<CommonScheduleResponseDto> commonSchedule;
    List<SubjectScheduleResponseDto> subjectSchedule;
    List<OfficialScheduleResponseDto> officialSchedule;
}
