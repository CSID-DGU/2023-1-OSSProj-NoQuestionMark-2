package com.NoQuestionMark.schedular.controller;


import com.NoQuestionMark.schedular.controller.request.CommonScheduleFixRequestDto;
import com.NoQuestionMark.schedular.controller.request.CommonScheduleRequestDto;
import com.NoQuestionMark.schedular.controller.response.*;
import com.NoQuestionMark.schedular.controller.response.scheduleResponseDto.ScheduleDetailResponseDto;
import com.NoQuestionMark.schedular.controller.response.scheduleResponseDto.ScheduleResponseDto;
import com.NoQuestionMark.schedular.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.Month;
import java.time.YearMonth;

/**
 * 알반 스케쥴 관련 api
 */
@RestController
@RequestMapping("/schedule")
@RequiredArgsConstructor
public class CommonScheduleController {

    private final ScheduleService scheduleService;
    @PostMapping("/common")
    public Response<Void> registerCommonSchedule(@RequestBody CommonScheduleRequestDto requestDto, Authentication authentication){
        scheduleService.writeCommonSchedule(requestDto, authentication.getName());
        return Response.success();
    }

    @GetMapping("/common")
    public Response<ScheduleResponseDto> getSchedule(@RequestParam("month") @DateTimeFormat(pattern = "yyyy-MM") YearMonth yearMonth , Authentication authentication){
        Month month = yearMonth.getMonth();
        int year = yearMonth.getYear();
        return Response.success(scheduleService.getAllSchedule(month, year, authentication.getName()));
    }

    @GetMapping("/{scheduleId}")
    public Response<ScheduleDetailResponseDto> getSchedule(Authentication authentication, @PathVariable Long scheduleId){
        return Response.success(scheduleService.getScheduleDetail(authentication.getName(), scheduleId));
    }
    @DeleteMapping("/common/{scheduleId}")
    public Response<Void> deleteSchedule(@PathVariable Long scheduleId, Authentication authentication){
        scheduleService.deleteCommonSchedule(scheduleId, authentication.getName());
        return Response.success();
    }

    @PutMapping("/common/{scheduleId}")
    public Response<Void> modifySchedule(@PathVariable Long scheduleId, Authentication authentication, @RequestBody CommonScheduleFixRequestDto requestDto){
        scheduleService.modifyCommonSchedule(scheduleId, authentication.getName(), requestDto);
        return Response.success();
    }

}
