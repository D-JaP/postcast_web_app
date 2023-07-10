package com.resteel.podcast_web_app.Model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
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

    @Column(name = "duration_in_second")
    private int duration;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinTable(
            name = "podcast_tag",
            joinColumns = @JoinColumn(name = "podcast_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private List<Tag> tags;

    public void addTag(Tag tag){
        if (tags == null){
            tags = new ArrayList<Tag>();
        }
        tags.add(tag);
    }
}
