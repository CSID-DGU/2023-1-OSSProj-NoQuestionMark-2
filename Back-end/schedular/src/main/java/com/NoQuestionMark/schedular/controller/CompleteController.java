package com.NoQuestionMark.schedular.controller;

import com.NoQuestionMark.schedular.controller.response.Response;
import com.NoQuestionMark.schedular.service.CompleteService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class CompleteController {
    private final CompleteService completeService;

    @PostMapping("/complete/{scheduleId}")
    public Response<Void> complete(@PathVariable Long scheduleId, Authentication authentication){
        return Response.success(completeService.complete(scheduleId, authentication.getName()));
    }

}
