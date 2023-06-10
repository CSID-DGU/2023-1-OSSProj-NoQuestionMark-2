package com.NoQuestionMark.schedular.model;

public enum Complete {
    TRUE, FALSE, NOT;
    public static Complete returnType(String complete) {
        if (complete.equals("TASK")) return Complete.FALSE;
        if (complete.equals("ASSIGNMENT")) return Complete.FALSE;
        if (complete.equals("done")) return Complete.TRUE;
        return NOT;
    }
}
