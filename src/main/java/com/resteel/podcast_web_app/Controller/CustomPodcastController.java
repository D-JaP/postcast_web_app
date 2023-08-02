package com.resteel.podcast_web_app.Controller;

import com.resteel.podcast_web_app.Service.PodcastService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@RepositoryRestController
@RequiredArgsConstructor
public class CustomPodcastController {
    private final PodcastService podcastService;
    @PostMapping(value = "/podcasts")

    public ResponseEntity<String> postEpisode(@RequestParam("title") String title,
                                              @RequestParam("description") String description,
                                              @RequestParam("authors") String authors,
                                              @RequestParam("coverImg") MultipartFile coverImg,
                                              @RequestParam("filename") MultipartFile mp3File){
        return ResponseEntity.ok(podcastService.addPodcast(title, description, authors, mp3File, coverImg));
    }
}
