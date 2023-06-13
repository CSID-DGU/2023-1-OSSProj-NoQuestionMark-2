package com.NoQuestionMark.schedular.util;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

@Component
@RequiredArgsConstructor
public class TelegramNotifier extends TelegramLongPollingBot {

    @Value("${bot.token}")
    private String BOT_TOKEN;
    @Value("${bot.username}")
    private String BOT_USERNAME;
    @Value("${bot.chatId}")
    private String CHAT_ID;

    @Override
    public void onUpdateReceived(Update update) {
        // 메시지를 받았을 때의 처리 로직을 구현합니다.
    }

    public void sendErrorMessage(String errorMessage) {
        SendMessage message = new SendMessage(CHAT_ID, errorMessage);
        try {
            execute(message);
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }

    @Override
    public String getBotUsername() {
        return BOT_USERNAME;
    }

    @Override
    public String getBotToken() {
        return BOT_TOKEN;
    }
}
