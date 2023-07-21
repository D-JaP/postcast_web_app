package com.resteel.podcast_web_app.exception;


public class PodcastNotFoundException extends RuntimeException{
    public PodcastNotFoundException(String message){
        super(message);
    }
}
