package com.msun.telegramBot.bot.command;

import com.msun.telegramBot.bot.Bot;
import com.msun.telegramBot.bot.Command;
import org.telegram.telegrambots.meta.api.objects.Message;

public class NewTaskCommand extends Command {

    @Override
    public void execute(Bot bot, Message message) {
        bot.sendMsg(bot.getDeployChatId(), "new task in databse!");
    }
}
