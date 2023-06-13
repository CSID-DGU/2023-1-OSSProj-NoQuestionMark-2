package com.NoQuestionMark.schedular.model;

public enum Importance {
    EASYGOING, NORMAL, IMPORTANT;

    public static Importance returnType(String importance) {
        if (importance.equals("EASYGOING")) return Importance.EASYGOING;
        if (importance.equals("NORMAL")) return Importance.NORMAL;
        return IMPORTANT;
    }
}
