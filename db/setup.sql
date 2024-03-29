DROP DATABASE IF EXISTS myDatabase;

CREATE DATABASE myDatabase;

USE myDatabase;

DROP TABLE IF EXISTS states;

DROP TABLE IF EXISTS residents;

CREATE TABLE states (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  symbol VARCHAR(255)
);

CREATE TABLE residents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  gender VARCHAR(1),
  age INT,
  weight FLOAT,
  income FLOAT,
  stateId INT,
  FOREIGN KEY (stateId) REFERENCES states(id)
);
