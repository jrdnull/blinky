# --- !Ups

ALTER TABLE "pastes" ADD COLUMN "listed" BOOLEAN DEFAULT TRUE;

# --- !Downs

ALTER TABLE "pastes" DROP COLUMN "listed";
