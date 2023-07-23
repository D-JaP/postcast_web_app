package com.resteel.podcast_web_app.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.resteel.podcast_web_app.Model.Podcast;
import com.resteel.podcast_web_app.Repository.PodcastRepository;
import com.resteel.podcast_web_app.exception.PodcastNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PodcastService {
    private final PodcastRepository podcastRepository;
    public Long findIdBySlug(String slug){
        Podcast podcast  = podcastRepository.findPodcastBySlug(slug).orElseThrow(() -> new PodcastNotFoundException("Podcast not found. Failed to get Id"));
        return podcast.getId();
    }

    public String findDirectoryBySlug(String slug) {
        return podcastRepository.findPodcastBySlug(slug).orElseThrow(()-> new PodcastNotFoundException("Podcast not found. Failed to get directory")).getPath();
    }

    public String findNextEpisode(String slug) {
        Podcast next_ep = podcastRepository.findNextEpisode(slug);

        if (next_ep != null) return next_ep.getPage();
        else {
            return null;
        }
    }


    public String findPodcastBySlug(String slug){
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.writeValueAsString(podcastRepository.findPodcastBySlug(slug).get());
        }
        catch (JsonProcessingException ex) {
            ex.printStackTrace();
            return "{}";
        }
    }

    public String findLastestPodcast() {
        ObjectMapper objectMapper = new ObjectMapper();
        try{
            return objectMapper.writeValueAsString(podcastRepository.findLastestPodcast());
        }
        catch (JsonProcessingException ex) {
            ex.printStackTrace();
            return "{}";
        }
    }
}
