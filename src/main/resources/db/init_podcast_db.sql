-- Active: 1676186945099@@127.0.0.1@3306@podcastdb
DROP TABLE IF EXISTS podcast_tag;
DROP TABLE IF EXISTS podcast;
DROP TABLE IF EXISTS tag;
CREATE TABLE podcast (
    id SERIAL PRIMARY KEY ,
    created_at BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM current_timestamp)::bigint),
    cover_img_path TEXT,
    title TEXT UNIQUE,
    slug TEXT UNIQUE,
    author TEXT,
    directory TEXT ,
    series_id INTEGER,
    description TEXT,
    duration_in_second INT,
    tag TEXT,
    page TEXT
);


CREATE TABLE tag(
    tag_id SERIAL PRIMARY KEY,
    tag_name TEXT NOT NULL
);

DROP TABLE IF EXISTS podcast_tag;


CREATE TABLE podcast_tag(
    podcast_id SERIAL,
    tag_id SERIAL,
    PRIMARY KEY (podcast_id, tag_id),
    CONSTRAINT fk_podcast_id FOREIGN KEY (podcast_id) REFERENCES podcast(id),
    CONSTRAINT fk_tag_id FOREIGN KEY (tag_id) REFERENCES tag(tag_id)
);


-- DROP TABLE IF EXISTS series;
--
-- CREATE TABLE series (
--     id INTEGER PRIMARY KEY AUTO_INCREMENT,
--     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     title TEXT NOT NULL,
--     number_of_podcast INTEGER
-- );