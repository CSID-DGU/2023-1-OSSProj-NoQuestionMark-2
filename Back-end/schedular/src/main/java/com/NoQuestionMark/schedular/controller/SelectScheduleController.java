package com.NoQuestionMark.schedular.controller;


import com.NoQuestionMark.schedular.controller.response.*;
import com.NoQuestionMark.schedular.controller.response.scheduleResponseDto.SelectedScheduleResponseDto;
import com.NoQuestionMark.schedular.controller.response.scheduleResponseDto.ToDoListResponseDto;
import com.NoQuestionMark.schedular.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.Month;
import java.time.YearMonth;
import java.util.List;

/**
 * 스케쥴 필터링을 위한 api
 */
@RestController
@RequestMapping("/schedule")
@RequiredArgsConstructor
public class SelectScheduleController {

    private final ScheduleService scheduleService;

    @GetMapping("/select")
    public Response<List<SelectedScheduleResponseDto>> getSelectedSchedule(@RequestParam("month") @DateTimeFormat(pattern = "yyyy-MM") YearMonth yearMonth ,
                                                                           @RequestParam("schedule") String schedule,
                                                                           Authentication authentication){
        Month month = yearMonth.getMonth();
        int year = yearMonth.getYear();
        return Response.success(scheduleService.getSelectedSchedule(month, year, authentication.getName(), schedule));
    }

    @GetMapping("/select/subject")
    public Response<List<SelectedScheduleResponseDto>> getTwiceSelectedSchedule(@RequestParam("month") @DateTimeFormat(pattern = "yyyy-MM") YearMonth yearMonth ,
                                                                                @RequestParam("subject") String subject, Authentication authentication){
        Month month = yearMonth.getMonth();
        int year = yearMonth.getYear();
        return Response.success(scheduleService.getTwiceSelectedSchedule(month, year, subject, authentication.getName()));
    }

    @GetMapping("/toDoList")
    public Response<List<ToDoListResponseDto>> getTodoList(Authentication authentication){
        return Response.success(scheduleService.getTodoList(authentication.getName()));
    }
}
