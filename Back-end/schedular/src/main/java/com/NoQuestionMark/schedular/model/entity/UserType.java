package com.NoQuestionMark.schedular.model.entity;

public enum UserType {
    STUDENT(), PROFESSOR();


    public static UserType returnUserType(String userType){
        if(userType.equals("STUDENT")) return UserType.STUDENT;
        return UserType.PROFESSOR;
    }
}
