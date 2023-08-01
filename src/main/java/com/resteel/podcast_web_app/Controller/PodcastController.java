package com.resteel.podcast_web_app.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.resteel.podcast_web_app.Model.Podcast;
import com.resteel.podcast_web_app.Service.PodcastService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class PodcastController {
    private final PodcastService podcastService;

    @GetMapping("/")
    public String index(Model model){
        model.addAttribute("lastestPodcast", podcastService.findLastestPodcast());
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

    @GetMapping("/admin")
    public String admin(Model model){
        int page=0;
        int pageSize =10;
        Page<Podcast> outputPages = podcastService.findAll(PageRequest.of(page, pageSize));

        int totalPages= outputPages.getTotalPages();
        List<Podcast> outputList = outputPages.getContent();

        model.addAttribute("podcasts", outputList);
        model.addAttribute("totalPage", totalPages);

        return "admin";
    }
}
