package com.msun.TasksDatabase;

import com.msun.telegramBot.bot.Bot;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.telegram.telegrambots.ApiContextInitializer;
import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.meta.exceptions.TelegramApiRequestException;

@SpringBootApplication
public class TasksDatabaseApplication {

	public static Bot bot;

	public static void main(String[] args) {

		ApiContextInitializer.init();

		TelegramBotsApi telegramBotsApi = new TelegramBotsApi();

		try {
			telegramBotsApi.registerBot(new Bot());
		} catch (TelegramApiRequestException e) {
			e.printStackTrace();
		}

		SpringApplication.run(TasksDatabaseApplication.class, args);
	}

}
