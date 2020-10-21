CREATE TABLE users(
	id int AUTO_INCREMENT NOT NULL,
	username varchar(255),
	password varchar(255),
	PRIMARY KEY(id)
);

INSERT INTO users(username, password)
VALUES ('admin', '12345');

CREATE TABLE mem(
	id varchar(255),
	des varchar(1040)
);

INSERT INTO mem(id, des)
VALUES('1111', 'this one');

INSERT INTO mem(id, des)
VALUES ('2222', 'that one');