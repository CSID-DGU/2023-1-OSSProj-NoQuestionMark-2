package com.NoQuestionMark.schedular.model;

public enum UserType {
    STUDENT, PROFESSOR, EMPLOYEE;

    public static UserType returnUserType(String userType) {
        if (userType.equals("STUDENT")) return UserType.STUDENT;
        if (userType.equals("EMPLOYEE")) return UserType.EMPLOYEE;
        return UserType.PROFESSOR;
    }
}