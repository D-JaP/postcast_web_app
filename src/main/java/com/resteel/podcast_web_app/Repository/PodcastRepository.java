package com.resteel.podcast_web_app.Repository;

import com.resteel.podcast_web_app.Model.Podcast;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource
public interface PodcastRepository extends JpaRepository<Podcast, Long> {

    Optional<Podcast> findById(long id);

    @Query(value = "SELECT * FROM podcast WHERE id BETWEEN :minId AND :maxId", nativeQuery = true)
    List<Podcast> findByIdBetween(@Param("minId") Long minId, @Param("maxId") Long maxId);



}
