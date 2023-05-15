package com.NoQuestionMark.schedular.model.entity;

public enum CommonScheduleType {
    TASK, SCHEDULE;

    public static CommonScheduleType returnType(String type){
        if(type.equals("TASK")) return CommonScheduleType.TASK;
        return SCHEDULE;
    }
}
