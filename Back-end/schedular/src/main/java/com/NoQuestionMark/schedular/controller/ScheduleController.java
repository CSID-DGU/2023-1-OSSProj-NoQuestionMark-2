package com.NoQuestionMark.schedular.controller;


import com.NoQuestionMark.schedular.controller.request.CommonScheduleRequestDto;
import com.NoQuestionMark.schedular.controller.request.SubjectScheduleRequestDto;
import com.NoQuestionMark.schedular.controller.response.Response;
import com.NoQuestionMark.schedular.controller.response.ScheduleResponseDto;
import com.NoQuestionMark.schedular.controller.response.UserScheduleResponseDto;
import com.NoQuestionMark.schedular.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.Month;
import java.time.YearMonth;
import java.util.List;

@RestController
@RequestMapping("/schedule")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;
    @PostMapping("/common")
    public Response<Void> registerCommonSchedule(@RequestBody CommonScheduleRequestDto requestDto, Authentication authentication){
        scheduleService.writeCommonSchedule(requestDto, authentication.getName());
        return Response.success();
    }

    @PostMapping("/subject")
    public Response<Void> registerSubjectSchedule(@RequestBody SubjectScheduleRequestDto requestDto, Authentication authentication){
        scheduleService.writeSubjectSchedule(requestDto, authentication.getName());
        return Response.success();
    }

    @GetMapping("/common")
    public Response<ScheduleResponseDto> getSchedule(@RequestParam("month") @DateTimeFormat(pattern = "yyyy-MM") YearMonth yearMonth , Authentication authentication){
        Month month = yearMonth.getMonth();
        int year = yearMonth.getYear();
        return Response.success(scheduleService.getAllSchedule(month, year, authentication.getName()));
    }
}
