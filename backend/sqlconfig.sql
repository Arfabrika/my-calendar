use calendar;

create database if not exists tasks(
	id primary key,
	name varchar(100),
	deadline timestamp
);