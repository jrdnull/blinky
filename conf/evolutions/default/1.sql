# --- !Ups

CREATE TABLE "pastes" (
  "id" SERIAL PRIMARY KEY,
  "text" TEXT NOT NULL,
  "title" TEXT,
  "created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

# --- !Downs

DROP TABLE "pastes";
