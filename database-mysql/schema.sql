DROP DATABASE IF EXISTS SightWords;

CREATE DATABASE SightWords;

USE SightWords;

CREATE TABLE Courses (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(20) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

CREATE TABLE Words (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(20) NOT NULL UNIQUE,
  url varchar(100) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

CREATE TABLE Lists (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(20) NOT NULL UNIQUE,
  course_id int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (course_id) REFERENCES Courses (id)
);

CREATE TABLE Lists_Words (
  id int NOT NULL AUTO_INCREMENT,
  list_id int NOT NULL,
  word_id int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (list_id) REFERENCES Lists (id),
  FOREIGN KEY (word_id) REFERENCES Words (id)
);


/*  Execute this file from the command line by typing:
 *    mysql -u root < schema.sql
 *  to create the database and the tables.*/
