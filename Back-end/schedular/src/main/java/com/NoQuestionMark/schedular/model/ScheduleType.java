package com.NoQuestionMark.schedular.model;

public enum ScheduleType {
    TASK, SCHEDULE;

    public static ScheduleType returnType(String type){
        if(type.equals("TASK")) return ScheduleType.TASK;
        return SCHEDULE;
    }
}
