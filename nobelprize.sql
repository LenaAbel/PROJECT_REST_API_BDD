DROP TABLE IF EXISTS REMPORTE;
DROP TABLE IF EXISTS PRIZES;
DROP TABLE IF EXISTS CATEGORY;
DROP TABLE IF EXISTS LAUREATES;


CREATE TABLE IF NOT EXISTS LAUREATES
(
    id_laureate INT NOT NULL,
    firstname   VARCHAR(200),
    surname     VARCHAR(200),
    CONSTRAINT PK_Laureates PRIMARY KEY (id_laureate)
);

CREATE TABLE IF NOT EXISTS CATEGORY
(
    id_category  SERIAL,
    nom_category VARCHAR(50),
    CONSTRAINT PK_Category PRIMARY KEY (id_category)
);


CREATE TABLE IF NOT EXISTS PRIZES
(
    id_prize    SERIAL,
    annee       VARCHAR(50),
    id_category INT,
    CONSTRAINT PK_Prizes PRIMARY KEY (id_prize),
    CONSTRAINT FK_PrizeCategory FOREIGN KEY (id_category) REFERENCES CATEGORY (id_category) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS remporte
(
    id_laureate INT,
    id_prize    INT,
    motivation  VARCHAR(8000),
    CONSTRAINT PK_remporte PRIMARY KEY (id_laureate, id_prize),
    CONSTRAINT FK_remporteIdLaureate FOREIGN KEY (id_laureate) REFERENCES LAUREATES (id_laureate) ON DELETE CASCADE,
    CONSTRAINT FK_remporteIdPrize FOREIGN KEY (id_prize) REFERENCES PRIZES (id_prize) ON DELETE CASCADE
);