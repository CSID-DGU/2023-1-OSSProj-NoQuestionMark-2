package com.NoQuestionMark.schedular.controller;


import com.NoQuestionMark.schedular.controller.request.OfficialScheduleRequestDto;
import com.NoQuestionMark.schedular.controller.response.*;
import com.NoQuestionMark.schedular.controller.response.scheduleResponseDto.EclassOfficialScheduleResponseDto;
import com.NoQuestionMark.schedular.controller.response.scheduleResponseDto.OfficialScheduleDetailResponseDto;
import com.NoQuestionMark.schedular.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 공식 교과 일정 관련 api
 */
@RestController
@RequestMapping("/schedule/official")
@RequiredArgsConstructor
public class OfficialScheduleController {

    private final ScheduleService scheduleService;
    @PostMapping("")
    public Response<Void> registerOfficialSchedule(@RequestBody OfficialScheduleRequestDto requestDto, Authentication authentication){
        scheduleService.writeOfficialSchedule(requestDto, authentication.getName());
        return Response.success();
    }

    @PutMapping("/{scheduleId}")
    public Response<Void> modifyOfficialSchedule(@RequestBody OfficialScheduleRequestDto requestDto, @PathVariable Long scheduleId, Authentication authentication){
        scheduleService.fixOfficialSchedule(requestDto, scheduleId, authentication.getName());
        return Response.success();
    }

    @DeleteMapping("/{scheduleId}")
    public Response<Void> deleteOfficialSchedule(@PathVariable Long scheduleId, Authentication authentication){
        scheduleService.deleteOfficialSchedule(scheduleId, authentication.getName());
        return Response.success();
    }

    @GetMapping("")
    public Response<List<EclassOfficialScheduleResponseDto>> getSchedule(@RequestParam("subjectName") String subjectName, Authentication authentication){
        return Response.success(scheduleService.getOfficialSchedules(authentication.getName(), subjectName));
    }

    @GetMapping("/{scheduleId}")
    public Response<OfficialScheduleDetailResponseDto> getScheduleDetail(@PathVariable Long scheduleId, Authentication authentication){
        return Response.success(scheduleService.getOfficialScheduleDetail(authentication.getName(), scheduleId));
    }

}
