DROP TABLE IF EXISTS REMPORTE;
DROP TABLE IF EXISTS PRIZES;
DROP TABLE IF EXISTS CATEGORY;
DROP TABLE IF EXISTS LAUREATES;


CREATE TABLE IF NOT EXISTS LAUREATES
(
    id_laureate SERIAL,
    firstname   VARCHAR(200),
    surname     VARCHAR(200),
    PRIMARY KEY (id_laureate)
);

CREATE TABLE IF NOT EXISTS CATEGORY
(
    id_category  SERIAL,
    nom_category VARCHAR(50),
    PRIMARY KEY (id_category)
);


CREATE TABLE PRIZES
(
    id_prize    SERIAL,
    annee       VARCHAR(50) NOT NULL,
    id_category INT         NOT NULL,
    PRIMARY KEY (id_prize),
    FOREIGN KEY (id_category) REFERENCES CATEGORY (id_category)
);

CREATE TABLE remporte
(
    id_laureate INT,
    id_prize    INT,
    motivation  VARCHAR(100),
    PRIMARY KEY (id_laureate, id_prize),
    FOREIGN KEY (id_laureate) REFERENCES LAUREATES (id_laureate),
    FOREIGN KEY (id_prize) REFERENCES PRIZES (id_prize)
);
