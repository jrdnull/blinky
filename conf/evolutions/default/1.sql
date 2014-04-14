# --- !Ups

CREATE TABLE pastes (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `text` TEXT NOT NULL,
  `title` TEXT,
  `created` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

# --- !Downs

DROP TABLE pastes;
