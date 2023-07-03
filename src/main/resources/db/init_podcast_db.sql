-- Active: 1676186945099@@127.0.0.1@3306@podcastdb
DROP TABLE IF EXISTS podcast;

CREATE TABLE podcast (
    id SERIAL PRIMARY KEY ,
    created_at BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM current_timestamp)::bigint),
    cover_img_path TEXT,
    title TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    author TEXT,
    directory TEXT NOT NULL,
    series_id INTEGER,
    description TEXT,
    duration_in_second INT
);

-- DROP TABLE IF EXISTS series;
--
-- CREATE TABLE series (
--     id INTEGER PRIMARY KEY AUTO_INCREMENT,
--     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     title TEXT NOT NULL,
--     number_of_podcast INTEGER
-- );