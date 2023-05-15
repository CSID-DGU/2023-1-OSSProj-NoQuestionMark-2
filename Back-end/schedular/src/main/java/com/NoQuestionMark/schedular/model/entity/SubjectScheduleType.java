package com.NoQuestionMark.schedular.model.entity;

public enum SubjectScheduleType {
    ASSIGNMENT, PRESENTATION, TEST;

    public static SubjectScheduleType returnType(String type){
        if(type.equals("ASSIGNMENT")) return SubjectScheduleType.ASSIGNMENT;
        if(type.equals("PRESENTATION")) return SubjectScheduleType.PRESENTATION;
        return TEST;
    }
}
