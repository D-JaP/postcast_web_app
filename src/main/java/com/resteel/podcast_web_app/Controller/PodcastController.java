package com.resteel.podcast_web_app.Controller;

import com.resteel.podcast_web_app.Service.PodcastService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
@RequiredArgsConstructor
public class PodcastController {
    private final PodcastService podcastService;

    @GetMapping("/")
    public String index(Model model){
        model.addAttribute("lastestPodcast", podcastService.findLastestPodcast());
        System.out.println(podcastService.findLastestPodcast());
        return "index";
    }

    @GetMapping("/episode/{slug}")
    public String episodePage(Model model, @PathVariable String slug)  {
        model.addAttribute("epID", podcastService.findIdBySlug(slug));
        model.addAttribute("epDirectory", podcastService.findDirectoryBySlug(slug));
        model.addAttribute("nextEpisodeLink", podcastService.findNextEpisode(slug));
        model.addAttribute("currentPodcast", podcastService.findPodcastBySlug(slug));
        return "episode";
    }

}
