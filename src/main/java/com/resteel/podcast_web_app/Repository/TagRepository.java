package com.resteel.podcast_web_app.Repository;

import com.resteel.podcast_web_app.Model.Podcast;
import com.resteel.podcast_web_app.Model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource
public interface TagRepository extends JpaRepository<Tag, Long > {
    Optional<List<Tag>> findTagsByPodcastsId(Long id);
}
