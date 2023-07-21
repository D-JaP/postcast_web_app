package com.resteel.podcast_web_app.Controller;

import com.resteel.podcast_web_app.Service.PodcastService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
public class PodcastController {
    private final PodcastService podcastService;

    @GetMapping("/")
    public String index(Model model){
        return "index";
    }

    @GetMapping("/episode/{slug}")
    public String episodePage(Model model, @PathVariable String slug){
        model.addAttribute("epID", podcastService.findIdBySlug(slug));
        return "index";
    }

}
