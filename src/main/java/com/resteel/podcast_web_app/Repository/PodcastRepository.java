package com.resteel.podcast_web_app.Repository;

import com.resteel.podcast_web_app.Model.Podcast;
import com.resteel.podcast_web_app.Model.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource
public interface PodcastRepository extends JpaRepository<Podcast, Long> {

    Optional<Podcast> findById(long id);

    List<Podcast> findByIdBetween(@Param("minId") Long minId, @Param("maxId") Long maxId);

    Optional<List<Podcast>> findPodcastsByTagsId(long id);

    @Query("SELECT p from Podcast p join p.tags t where t.name=:name order by p.id desc")
    Page<Podcast> findPodcastsByTagsName(String name, Pageable pageable);
}
