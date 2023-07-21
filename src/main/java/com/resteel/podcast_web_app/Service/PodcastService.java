package com.resteel.podcast_web_app.Service;

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
        Podcast podcast  = podcastRepository.findPodcastBySlug(slug).orElseThrow(() -> new PodcastNotFoundException("Podcast not found"));
        System.out.println(podcast.getId());
        return podcast.getId();
    }

}
