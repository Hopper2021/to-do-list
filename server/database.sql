CREATE TABLE "items" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(300),
	"complete" BOOLEAN DEFAULT FALSE
);

INSERT INTO "items" ("name", "complete")
VALUES ('Vaccuum the living room', false),
('Walk the dog', true),
('Bring daughter to play date', false);