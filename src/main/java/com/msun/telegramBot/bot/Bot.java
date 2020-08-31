package com.msun.telegramBot.bot;

import com.google.inject.internal.cglib.core.$DuplicatesPredicate;
import com.msun.TasksDatabase.TasksDatabaseApplication;
import com.msun.telegramBot.bot.command.DeployCommand;
import com.msun.telegramBot.bot.command.HelpCommand;
import com.msun.telegramBot.bot.command.NewTaskCommand;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.CallbackQuery;
import org.telegram.telegrambots.meta.api.objects.Message;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.ReplyKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.KeyboardButton;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.KeyboardRow;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Bot extends TelegramLongPollingBot {


    private String deployChatId;

    private HashMap<String, Command> commandHashMap;

    public Bot(){
        commandHashMap = new HashMap<String, Command>();
        initializeCommands();
    }

    private void initializeCommands(){
        commandHashMap.put("/deploy", new DeployCommand());
        commandHashMap.put("/help", new HelpCommand());
        commandHashMap.put("/newtask", new NewTaskCommand());
    }

    @Override
    public void onUpdateReceived(Update update) {
        if(update.hasMessage()) {
            MessageAnswerThread thread = new MessageAnswerThread(this, update.getMessage());
        } else  if(update.hasCallbackQuery()) {
            CallBackThread answerThread = new CallBackThread(this ,update.getCallbackQuery());
        }
    }

    public synchronized void sendMsg(String chatId, String message){
        SendMessage sendMessage = new SendMessage();
        sendMessage.enableMarkdown(true);
        sendMessage.setChatId(chatId);
        sendMessage.setText(message);

        try {
            execute(sendMessage);
        } catch (TelegramApiException e) {

        }

    }


    @Override
    public String getBotUsername() {
        return "BibisBebis_bot";
    }

    @Override
    public String getBotToken() {
        return "";
    }


    public class MessageAnswerThread extends Thread{

        private Bot bot;
        private Message message;

        public MessageAnswerThread(Bot bot,Message message){
            this.bot = bot;
            this.message = message;
            run();
        }

        @Override
        public void run() {
            super.run();
            Command lCommand = commandHashMap.get(message.getText().toString());
            if (lCommand != null){
                lCommand.execute(bot, message);
            }
        }
    }


    public class CallBackThread extends Thread{

        private Bot bot;
        private Message message;
        private CallbackQuery callbackQuery;

        public CallBackThread(Bot bot, CallbackQuery callbackQuery){
            this.bot = bot;
            this.message = callbackQuery.getMessage();
            run();
        }

        @Override
        public void run() {
            super.run();
            Command lCommand = commandHashMap.get(message.getText().toString());
            if (lCommand != null){
                lCommand.execute(bot, message);
            }
        }
    }




    public String getDeployChatId() {
        return deployChatId;
    }

    public void setDeployChatId(String deployChatId) {
        this.deployChatId = deployChatId;
        TasksDatabaseApplication.bot = this;
    }

    public HashMap<String, Command> getCommandHashMap() {
        return commandHashMap;
    }

    public void setCommandHashMap(HashMap<String, Command> commandHashMap) {
        this.commandHashMap = commandHashMap;
    }
}
