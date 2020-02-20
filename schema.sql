DROP DATABASE IF EXISTS SightWords;

CREATE DATABASE SightWords;

USE SightWords;

CREATE TABLE words (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(20) NOT NULL UNIQUE,
  url varchar(50) NOT NULL UNIQUE,
  set_number integer NOT NULL
  PRIMARY KEY (ID)
);


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
