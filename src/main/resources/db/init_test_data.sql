INSERT INTO podcast (id, title, slug,cover_img_path, author, directory, series_id, description, duration_in_second)
VALUES
    (1,'What is metal scrapping?1', 'what-is-metal-scrapping1', '../images/podcast/podcast.png','Harry', '../static/episode/first_episode.mp3', 1, 'Hey there, let me tell you a little about scrap metal. You see, scrap metal is a vital part of the metal recycling industry. It comes from a variety of sources such as old vehicles, building demolition, and discarded household appliances. But, that''s not where its story ends.', 3600),
    (2,'What is metal scrapping?2', 'what-is-metal-scrapping2', '../images/podcast/podcast.png','Harry', '../static/episode/first_episode.mp3', 1, 'Hey there, let me tell you a little about scrap metal. You see, scrap metal is a vital part of the metal recycling industry. It comes from a variety of sources such as old vehicles, building demolition, and discarded household appliances. But, that''s not where its story ends.', 1000),
    (3,'What is metal scrapping?3', 'what-is-metal-scrapping3', '../images/podcast/podcast.png','Elise', '../static/episode/first_episode.mp3', 1, 'Hey there, let me tell you a little about scrap metal. You see, scrap metal is a vital part of the metal recycling industry. It comes from a variety of sources such as old vehicles, building demolition, and discarded household appliances. But, that''s not where its story ends.', 600),
    (4,'What is metal scrapping?4', 'what-is-metal-scrapping4', '../images/podcast/podcast.png','Harry', '../static/episode/first_episode.mp3', 1, 'Hey there, let me tell you a little about scrap metal. You see, scrap metal is a vital part of the metal recycling industry. It comes from a variety of sources such as old vehicles, building demolition, and discarded household appliances. But, that''s not where its story ends.', 2600),
    (5,'What is metal scrapping?5', 'what-is-metal-scrapping5', '../images/podcast/podcast.png','Monty', '../static/episode/second_episode.mp3', 1, 'Hey there, let me tell you a little about scrap metal. You see, scrap metal is a vital part of the metal recycling industry. It comes from a variety of sources such as old vehicles, building demolition, and discarded household appliances. But, that''s not where its story ends.', 2400),
    (6, 'What is metal scrapping?6', 'what-is-metal-scrapping6', '../images/podcast/podcast.png','Elise', '../static/episode/first_episode.mp3', 1, 'Hey there, let me tell you a little about scrap metal. You see, scrap metal is a vital part of the metal recycling industry. It comes from a variety of sources such as old vehicles, building demolition, and discarded household appliances. But, that''s not where its story ends.', 3600),
    (7, 'What is metal scrapping?7', 'what-is-metal-scrapping7', '../images/podcast/podcast.png','Harry', '../static/episode/first_episode.mp3', 1, 'Hey there, let me tell you a little about scrap metal. You see, scrap metal is a vital part of the metal recycling industry. It comes from a variety of sources such as old vehicles, building demolition, and discarded household appliances. But, that''s not where its story ends.', 600),
    (8, 'What is metal scrapping?8', 'what-is-metal-scrapping8', '../images/podcast/podcast.png','Monty', '../static/episode/second_episode.mp3', 1, 'Hey there, let me tell you a little about scrap metal. You see, scrap metal is a vital part of the metal recycling industry. It comes from a variety of sources such as old vehicles, building demolition, and discarded household appliances. But, that''s not where its story ends.', 2400),
    (9, 'What is metal scrapping?9', 'what-is-metal-scrapping9', '../images/podcast/podcast.png','Elise', '../static/episode/first_episode.mp3', 1, 'Hey there, let me tell you a little about scrap metal. You see, scrap metal is a vital part of the metal recycling industry. It comes from a variety of sources such as old vehicles, building demolition, and discarded household appliances. But, that''s not where its story ends.', 3600),
    (10, 'What is metal scrapping?10', 'what-is-metal-scrapping10', '../images/podcast/podcast.png','Harry', '../static/episode/first_episode.mp3', 1, 'Hey there, let me tell you a little about scrap metal. You see, scrap metal is a vital part of the metal recycling industry. It comes from a variety of sources such as old vehicles, building demolition, and discarded household appliances. But, that''s not where its story ends.', 1000),
    (11, 'What is metal scrapping?11', 'what-is-metal-scrapping11', '../images/podcast/podcast.png','Monty', '../static/episode/second_episode.mp3', 1, 'Hey there, let me tell you a little about scrap metal. You see, scrap metal is a vital part of the metal recycling industry. It comes from a variety of sources such as old vehicles, building demolition, and discarded household appliances. But, that''s not where its story ends.', 1000),
    (12, 'What is metal scrapping?12', 'what-is-metal-scrapping12', '../images/podcast/podcast.png','Elise', '../static/episode/first_episode.mp3', 1, 'Hey there, let me tell you a little about scrap metal. You see, scrap metal is a vital part of the metal recycling industry. It comes from a variety of sources such as old vehicles, building demolition, and discarded household appliances. But, that''s not where its story ends.', 2400),
    (13, 'What is metal scrapping?13', 'what-is-metal-scrapping13', '../images/podcast/podcast.png','Harry', '../static/episode/first_episode.mp3', 1, 'Hey there, let me tell you a little about scrap metal. You see, scrap metal is a vital part of the metal recycling industry. It comes from a variety of sources such as old vehicles, building demolition, and discarded household appliances. But, that''s not where its story ends.', 600),
    (14, 'What is metal scrapping?14', 'what-is-metal-scrapping14', '../images/podcast/podcast.png','Monty', '../static/episode/second_episode.mp3', 1, 'Hey there, let me tell you a little about scrap metal. You see, scrap metal is a vital part of the metal recycling industry. It comes from a variety of sources such as old vehicles, building demolition, and discarded household appliances. But, that''s not where its story ends.', 3600),
    (15, 'What is metal scrapping?15', 'what-is-metal-scrapping15', '../images/podcast/podcast.png','Elise', '../static/episode/first_episode.mp3', 1, 'Hey there, let me tell you a little about scrap metal. You see, scrap metal is a vital part of the metal recycling industry. It comes from a variety of sources such as old vehicles, building demolition, and discarded household appliances. But, that''s not where its story ends.', 600);

INSERT INTO tag(tag_id, tag_name) VALUES (1, 'automation'),
                                         (2, 'marketing'),
                                         (3, 'network'),
                                         (4, 'industry'),
                                         (5, 'love'),
                                         (6, 'real estate'),
                                         (7, 'stock')
;

INSERT INTO podcast_tag(podcast_id, tag_id) VALUES (1, 1),
                                                   (1,2),
                                                   (2,3),
                                                   (4,3),
                                                   (4,1),
                                                   (5,3),
                                                   (5,6),
                                                   (5,4),
                                                   (6,1),
                                                   (6,4),
                                                   (7,5),
                                                   (7,7),
                                                   (7,1),
                                                   (5,1),
                                                   (3,1);

-- INSERT INTO series (title) VALUES ("first_series");
