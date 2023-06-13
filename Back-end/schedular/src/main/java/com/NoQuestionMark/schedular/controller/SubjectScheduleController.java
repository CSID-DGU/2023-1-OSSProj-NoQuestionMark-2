package com.NoQuestionMark.schedular.controller;


import com.NoQuestionMark.schedular.controller.request.SubjectScheduleRequestDto;
import com.NoQuestionMark.schedular.controller.response.*;
import com.NoQuestionMark.schedular.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

/**
 * 개인 교과 일정 관련 api
 */

@RestController
@RequestMapping("/schedule")
@RequiredArgsConstructor
public class SubjectScheduleController {

    private final ScheduleService scheduleService;

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

}
