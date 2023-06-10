package com.NoQuestionMark.schedular.controller;


import com.NoQuestionMark.schedular.controller.request.CommonScheduleFixRequestDto;
import com.NoQuestionMark.schedular.controller.request.CommonScheduleRequestDto;
import com.NoQuestionMark.schedular.controller.request.OfficialScheduleRequestDto;
import com.NoQuestionMark.schedular.controller.request.SubjectScheduleRequestDto;
import com.NoQuestionMark.schedular.controller.response.*;
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

    @PutMapping("/subject/{scheduleId}")
    public Response<Void> modifySubjectSchedule(@RequestBody SubjectScheduleRequestDto requestDto, @PathVariable Long scheduleId,Authentication authentication){
        scheduleService.modifySubjectSchedule(requestDto, scheduleId,authentication.getName());
        return Response.success();
    }

    @DeleteMapping("/subject/{scheduleId}")
    public Response<Void> deleteSubjectSchedule(@PathVariable Long scheduleId,Authentication authentication){
        scheduleService.deleteSubjectSchedule(scheduleId,authentication.getName());
        return Response.success();
    }

    @PostMapping("/official")
    public Response<Void> registerOfficialSchedule(@RequestBody OfficialScheduleRequestDto requestDto, Authentication authentication){
        scheduleService.writeOfficialSchedule(requestDto, authentication.getName());
        return Response.success();
    }

    @PutMapping("/official/{scheduleId}")
    public Response<Void> modifyOfficialSchedule(@RequestBody OfficialScheduleRequestDto requestDto, @PathVariable Long scheduleId, Authentication authentication){
        scheduleService.fixOfficialSchedule(requestDto, scheduleId, authentication.getName());
        return Response.success();
    }

    @DeleteMapping("/official/{scheduleId}")
    public Response<Void> deleteOfficialSchedule(@PathVariable Long scheduleId, Authentication authentication){
        scheduleService.deleteOfficialSchedule(scheduleId, authentication.getName());
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

    @GetMapping("/official")
    public Response<List<EclassOfficialScheduleResponseDto>> getSchedule(@RequestParam("subjectName") String subjectName, Authentication authentication){
        return Response.success(scheduleService.getOfficialSchedules(authentication.getName(), subjectName));
    }

    @GetMapping("/official/{scheduleId}")
    public Response<OfficialScheduleDetailResponseDto> getScheduleDetail(@PathVariable Long scheduleId, Authentication authentication){
        return Response.success(scheduleService.getOfficialScheduleDetail(authentication.getName(), scheduleId));
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

    @GetMapping("/toDoList")
    public Response<List<ToDoListResponseDto>> getTodoList(Authentication authentication){
        return Response.success(scheduleService.getTodoList(authentication.getName()));
    }
}
