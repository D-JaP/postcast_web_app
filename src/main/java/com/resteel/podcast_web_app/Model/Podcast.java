package com.resteel.podcast_web_app.Model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "podcast")
public class Podcast {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "created_at")
    private long createdTime;

    @Column(name = "cover_img_path")
    private String coverImgPath;

    @Column(name = "title")
    private String title;

    @Column(name = "slug")
    private String slug;

    @Column(name = "author")
    private String authors;

    @Column(name = "series_id")
    private Long seriesId;

    @Column(name = "directory")
    private String path;

    @Column(name = "description")
    private String description;

}
