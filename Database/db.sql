

-- TABLE STRUCTURE FOR 'players' TABLE

CREATE TABLE IF NOT EXISTS players (
	id INT AUTO_INCREMENT PRIMARY KEY,											-- Global player id
	name VARCHAR(25) NOT NULL,													-- Holds the name of the player
	avatar VARCHAR(100) NOT NULL,												-- Holds the keyword of the player avatar
	money FLOAT DEFAULT 1500,													-- Holds the player money amount
	status ENUM("awaiting", "playing", "bankrupt", "jailed", "blocked") NOT NULL	-- Holds the current status of the player
) ENGINE=INNODB;
ALTER TABLE players AUTO_INCREMENT = 1000;										-- Make the id start at 1000
-- Player ID 1000: will hold default player settings as well as act as a bank (for owning properties)
INSERT INTO players (id, name, avatar, money, status) VALUES (1000, "default", "car", 1500, "blocked");


-- TABLE STRUCTURE FOR 'tiles' TABLE

CREATE TABLE IF NOT EXISTS tiles (
	id INT AUTO_INCREMENT PRIMARY KEY,											-- Global tile id, also indicates position
	name VARCHAR(100) NOT NULL,													-- Holds the name of the property on the tile
	description VARCHAR(250),													-- Holds description of the tile, if any
	price INT NOT NULL,																-- Holds the cost of the property on the tile
	rent_percentage FLOAT DEFAULT 15,											-- Holds the percentage of original price a landing player has to pay
	bank_sale FLOAT DEFAULT 50,													-- Holds the percentage of original price a player can sell property to the bank
	type ENUM("go", "in_jail", "go_jail", "street", "utility", "chance", "community", "tax", "free") NOT NULL,	-- Holds tile type
	image VARCHAR(100),															-- Holds the keyword of the tile image, if any
	owner INT DEFAULT 1000,														-- Holds the id of the player who owns the tile's property
	FOREIGN KEY (owner) REFERENCES players(id)									-- Key reference to the "players" table
) ENGINE=INNODB;

INSERT INTO tiles (name, description, price, rent_percentage, bank_sale, type, image, owner) VALUES
("Départ", "Recevez €200 chaque fois que vous passez ici.", 0, 0, 0, "go", NULL, 1000),
("Amphithéâtre", NULL, 100, 10, 50, "street", NULL, 1000),
("Caisse de Communauté", NULL, 0, 0, 0, "community", "community_chest.png", 1000),
("Foyer", NULL, 150, 10, 50, "street", NULL, 1000),
("Payer son café", "NULL", 200, 0, 0, "tax", NULL, 1000),
("OpenBox", NULL, 500, 15, 50, "utility", "openbox.png", 1000),
("Salle A003", NULL, 150, 10, 50, "street", NULL, 1000),
("Chance", NULL, 0, 0, 0, "chance", "chance.png", 1000),
("Salle A004", NULL, 150, 10, 50, "street", NULL, 1000),
("Salle A005", NULL, 150, 10, 50, "street", NULL, 1000),
("En Prison", "Simple Visite", 0, 0, 0, "in_jail", NULL, 1000),
("Salle C002", NULL, 200, 10, 50, "street", NULL, 1000),
("Frais Cantine", NULL, 200, 0, 0, "tax", "cafeteria.png", 1000),
("Salle C003", NULL, 200, 10, 50, "street", NULL, 1000),
("Salle C004", NULL, 200, 10, 50, "street", NULL, 1000),
("F9 HETIC", NULL, 500, 15, 50, "utility", "f9_hetic.png", 1000),
("Bureau de Gardien", NULL, 250, 15, 50, "street", NULL, 1000),
("Caisse de Communauté", NULL, 0, 0, 0, "community", "community_chest.png", 1000),
("Bureau de Coordination", NULL, 250, 15, 50, "street", NULL, 1000),
("Bureau de Communication", NULL, 300, 15, 50, "street", NULL, 1000),
("Parc Gratuit", NULL, 0, 0, 0, "free", NULL, 1000),
("Salle C012", NULL, 300, 15, 50, "street", NULL, 1000),
("Chance", NULL, 0, 0, 0, "chance", "chance.png", 1000),
("Salle C013", NULL, 300, 15, 50, "street", NULL, 1000),
("Salle C014", NULL, 350, 15, 50, "street", NULL, 1000),
("Synerg'hetic", NULL, 500, 20, 50, "utility", "synerg_hetic.svg", 1000),
("Salle A111", NULL, 350, 15, 50, "street", NULL, 1000),
("Salle A112", NULL, 350, 15, 50, "street", NULL, 1000),
("Assiduité", "Justifier ses abscences", 250, 0, 0, "tax", "attendance.png", 1000),
("Salle A113", NULL, 400, 15, 50, "street", NULL, 1000),
("Allez en Prison", NULL, 0, 0, 0, "go_jail", NULL, 1000),
("Bureau d'Admission", NULL, 400, 20, 50, "street", NULL, 1000),
("Bureau Pédagogique", NULL, 400, 20, 50, "street", NULL, 1000),
("Caisse de Communauté", NULL, 0, 0, 0, "community", "community_chest.png", 1000),
("Bureau d'Administration", NULL, 450, 20, 50, "street", NULL, 1000),
("Nebula BDE", NULL, 500, 25, 50, "utility", "nebula_bde.pngg", 1000),
("Chance", NULL, 0, 0, 0, "chance", "chance.png", 1000),
("Salle A105", NULL, 450, 20, 50, "street", NULL, 1000),
("Comptabilité", "Payer les frais de scolarité", 200, 0, 0, "tax", "accounting.png", 1000),
("Salle B101", NULL, 500, 20, 50, "street", NULL, 1000);


-- TABLE STRUCTURE FOR 'cards' TABLE

CREATE TABLE IF NOT EXISTS cards (
	id INT AUTO_INCREMENT PRIMARY KEY,											-- Global card id
	type ENUM("chance", "community") NOT NULL,									-- Holds the type of the
	action VARCHAR(250) NOT NULL,												-- Holds the action text of the card
	description VARCHAR(250),													-- Holds description of the card, if any
	effect ENUM("money", "position", "tile") NOT NULL,							-- Holds the type of the effect of the card
	value INT DEFAULT 0,														-- Holds the value of the effect, positive or negative
	target ENUM("current_player", "other_players", "everyone") NOT NULL			-- Holds the card's affected target
) ENGINE=INNODB;

INSERT INTO cards (type, action, description, effect, value, target) VALUES
	("chance", "Rendez-vous à la salle A105", NULL, "tile", 38, "current_player"),
	("chance", "Avancer jusqu’à la case départ", NULL, "tile", 1, "current_player"),
	("chance", "Rendez-vous à la salle C014", "Si vous passez par la case départ, recevez €200", "tile", 1, "current_player");


