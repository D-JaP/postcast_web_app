package com.resteel.podcast_web_app.Repository;

import com.resteel.podcast_web_app.Model.Podcast;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource
public interface PodcastRepository extends JpaRepository<Podcast, Long> {

    Optional<Podcast> findById(long id);

}
