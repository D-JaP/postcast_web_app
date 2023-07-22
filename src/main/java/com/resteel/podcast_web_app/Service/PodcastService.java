package com.resteel.podcast_web_app.Service;

import com.resteel.podcast_web_app.Model.Podcast;
import com.resteel.podcast_web_app.Repository.PodcastRepository;
import com.resteel.podcast_web_app.exception.NoNextPodcastException;
import com.resteel.podcast_web_app.exception.PodcastNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PodcastService {
    private final PodcastRepository podcastRepository;
    public Long findIdBySlug(String slug){
        Podcast podcast  = podcastRepository.findPodcastBySlug(slug).orElseThrow(() -> new PodcastNotFoundException("Podcast not found"));
        return podcast.getId();
    }

    public String findDirectoryBySlug(String slug) {
        return podcastRepository.findPodcastBySlug(slug).orElseThrow(()-> new PodcastNotFoundException("Podcast not found")).getPath();
    }

    public String findNextEpisode(String slug) {
        Podcast next_ep = podcastRepository.findNextEpisode(slug);

        if (next_ep != null) return next_ep.getPage();
        else {
            return null;
        }
    }
}
