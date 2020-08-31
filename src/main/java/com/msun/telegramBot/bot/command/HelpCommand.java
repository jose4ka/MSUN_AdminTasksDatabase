package com.msun.telegramBot.bot.command;

import com.msun.telegramBot.bot.Bot;
import com.msun.telegramBot.bot.Command;
import org.telegram.telegrambots.meta.api.objects.Message;

public class HelpCommand extends Command {

    @Override
    public void execute(Bot bot, Message message) {
        bot.sendMsg(message.getChatId().toString(), "Biba а не help (пока-что)");
    }
}
