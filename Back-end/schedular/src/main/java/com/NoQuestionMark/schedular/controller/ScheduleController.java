package com.NoQuestionMark.schedular.controller;


import com.NoQuestionMark.schedular.controller.request.CommonScheduleRequestDto;
import com.NoQuestionMark.schedular.controller.response.CommonScheduleResponseDto;
import com.NoQuestionMark.schedular.controller.response.Response;
import com.NoQuestionMark.schedular.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/schedule")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;
    @PostMapping("/common")
    public Response<Void> writeSchedule(@RequestBody CommonScheduleRequestDto requestDto, Authentication authentication){
        scheduleService.writeCommonSchedule(requestDto, authentication.getName());
        return Response.success();
    }

    @GetMapping("/common")
    public Response<List<CommonScheduleResponseDto>> getSchedule(Authentication authentication){
        return Response.success(scheduleService.getAllSchedule(authentication.getName()));
    }
}
