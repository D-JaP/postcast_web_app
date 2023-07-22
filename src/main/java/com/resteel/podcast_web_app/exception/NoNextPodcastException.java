package com.resteel.podcast_web_app.exception;


public class NoNextPodcastException extends RuntimeException {
    public NoNextPodcastException(Exception ex) {
        super(ex.getMessage());
    }
}
