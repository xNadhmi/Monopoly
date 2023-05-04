

CREATE DATABASE IF NOT EXISTS 'monopoly' CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;



-- TABLE STRUCTURE FOR 'players' TABLE

CREATE TABLE IF NOT EXISTS players (
	id INT AUTO_INCREMENT PRIMARY KEY,											-- Global player id
	name VARCHAR(25) NOT NULL,													-- Holds the name of the player
	avatar ENUM("car"),															-- Holds the keyword of the player avatar
	money FLOAT DEFAULT 1500,													-- Holds the player money amount
	status ENUM("awaiting", "playing", "bankrupt", "jailed", "blocked") NOT NULL	-- Holds the current status of the player
) ENGINE=INNODB;
ALTER TABLE players AUTO_INCREMENT = 1000;										-- Make the id start at 1000
-- Player ID 1000: will hold default player settings as well as act as a bank (for owning properties)
INSERT INTO players (id, name, avatar, money, status) VALUES (1000, "default", "car", 1500, "blocked");


-- TABLE STRUCTURE FOR 'tiles' TABLE

CREATE TABLE IF NOT EXISTS tiles (
	id INT AUTO_INCREMENT PRIMARY KEY,											-- Global tile id, also indicates position
	name VARCHAR(50) NOT NULL,													-- Holds the name of the property on the tile
	description VARCHAR(250),													-- Holds description of the tile, if any
	price INT NOT NULL,																-- Holds the cost of the property on the tile
	rent_percentage FLOAT DEFAULT 15,											-- Holds the percentage of original price a landing player has to pay
	bank_sale FLOAT DEFAULT 50,													-- Holds the percentage of original price a player can sell property to the bank
	type ENUM("go", "jail", "go_jail", "street", "utility", "chance", "community", "tax") NOT NULL,	-- Holds tile type
	owner INT DEFAULT 1000,														-- Holds the id of the player who owns the tile's property
	FOREIGN KEY (owner) REFERENCES players(id)									-- Key reference to the "players" table
) ENGINE=INNODB;


-- TABLE STRUCTURE FOR 'cards' TABLE

CREATE TABLE IF NOT EXISTS cards (
	id INT AUTO_INCREMENT PRIMARY KEY,											-- Global card id
	type ENUM("chance", "community") NOT NULL,									-- Holds the type of the
	-- name VARCHAR(50) NOT NULL,													-- Holds the name of the card
	description VARCHAR(250),													-- Holds description of the card, if any
	action VARCHAR(250) NOT NULL,												-- Holds the action text of the card
	effect ENUM("money", "position") NOT NULL,									-- Holds the type of the effect of the card
	value INT DEFAULT 0,														-- Holds the value of the effect, positive or negative
	target ENUM("current_player", "other_players", "everyone")					-- Holds the card's affected target
) ENGINE=INNODB;

INSERT INTO cards (type, description, action, effect, value, target) VALUES
	("chance", NULL, "Rendez-vous à la Salle A106", "position")