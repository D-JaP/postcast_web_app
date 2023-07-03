package com.resteel.podcast_web_app.Service;

import com.resteel.podcast_web_app.Model.Podcast;
import com.resteel.podcast_web_app.Repository.PodcastRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PodcastService {
//    private final PodcastRepository podcastRepository;
//
//    List<Podcast> getPodcastInRange(Long podcastId, int range){
//        Long minId = podcastId - range;
//        Long maxId = podcastId + range;
//        return podcastRepository.findByIdBetween(minId, maxId);
//    }
}
