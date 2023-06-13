package com.NoQuestionMark.schedular.model;

public enum SubjectScheduleType {
    ASSIGNMENT, PRESENTATION, TEST, STUDY;

    public static SubjectScheduleType returnType(String type){
        if(type.equals("ASSIGNMENT")) return SubjectScheduleType.ASSIGNMENT;
        if(type.equals("PRESENTATION")) return SubjectScheduleType.PRESENTATION;
        if(type.equals("STUDY")) return SubjectScheduleType.STUDY;
        return TEST;
    }
}
