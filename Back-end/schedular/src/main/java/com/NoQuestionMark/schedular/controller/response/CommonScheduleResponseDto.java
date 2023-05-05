package com.NoQuestionMark.schedular.controller.response;

import com.NoQuestionMark.schedular.model.entity.CommonScheduleEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class CommonScheduleResponseDto {
    private String title;
    private String contents;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    public static CommonScheduleResponseDto fromCommonScheduleEntity(CommonScheduleEntity entity){
        return new CommonScheduleResponseDto(
                entity.getTitle(),
                entity.getContents(),
                entity.getStartDate(),
                entity.getEndDate()
        );
    }
}
