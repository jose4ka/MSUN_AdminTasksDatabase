package com.msun.telegramBot.retrofit;

import com.msun.telegramBot.InterfaceBot;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.converter.scalars.ScalarsConverterFactory;

public class NetworkService {

    //Экземпляр этого объекта, нужен для реализации паттерна Singleton
    private static NetworkService instance;
    //Базоый URL для обращения к серверу, будет использоваться для всех запросов
    private static final String BASE_URL = "";

    //Объект из библиотеки Retrofit2
    private Retrofit mRetrofit;

    //В конструкторе инициализируем библиотечный объект для дальнейшей работы
    private NetworkService(){


        mRetrofit = new Retrofit.Builder().
                baseUrl(BASE_URL).
                addConverterFactory(ScalarsConverterFactory.create()).
                addConverterFactory(GsonConverterFactory.create()).
                build();
    }


    //Реализация паттерна Singleton - один класс на всю программу
    public static NetworkService getInstance(){
        if(instance == null){
            instance = new NetworkService();
        }

        return instance;
    }


    public InterfaceBot getInterfaceBot(){
        return mRetrofit.create(InterfaceBot.class);
    }


}
