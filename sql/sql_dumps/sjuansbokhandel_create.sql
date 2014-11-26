
-- SCHEMA: sjuansbokhandel
CREATE SCHEMA sjuansbokhandel ;


-- ---------------------------------------------------------------------------------------------------------
-- TABLES

-- Table: book_shelfs
CREATE TABLE book_shelfs (
    isbn bigint(13)    NOT NULL ,
    shelfs_id int    NOT NULL ,
    CONSTRAINT book_shelfs_pk PRIMARY KEY (isbn)
);

-- Table: books
CREATE TABLE books (
    isbn bigint(13)    NOT NULL ,
    title varchar(255)    NOT NULL ,
    author varchar(255)    NOT NULL ,
    CONSTRAINT books_pk PRIMARY KEY (isbn)
);

-- Table: books_prices
CREATE TABLE books_prices (
    id int    NOT NULL  AUTO_INCREMENT,
    price decimal(10,2)    NOT NULL ,
    date timestamp    NOT NULL ,
    isbn bigint(13)    NOT NULL ,
    CONSTRAINT books_prices_pk PRIMARY KEY (id)
);

-- Table: deliveries
CREATE TABLE deliveries (
    id int    NOT NULL  AUTO_INCREMENT,
    f_price decimal(10,2)    NOT NULL ,
    quantity int    NOT NULL ,
    date timestamp    NOT NULL ,
    isbn bigint(13)    NOT NULL ,
    CONSTRAINT deliveries_pk PRIMARY KEY (id)
);

-- Table: sales
CREATE TABLE sales (
    id int    NOT NULL  AUTO_INCREMENT,
    quantity int    NOT NULL ,
    date date    NOT NULL ,
    isbn bigint(13)    NOT NULL ,
    CONSTRAINT sales_pk PRIMARY KEY (id)
);

-- Table: shelfs
CREATE TABLE shelfs (
    id int    NOT NULL  AUTO_INCREMENT,
    code char(1)    NOT NULL ,
    number int    NOT NULL ,
    CONSTRAINT shelfs_pk PRIMARY KEY (id)
);


-- ---------------------------------------------------------------------------------------------------------
-- FOREIGN KEYS

-- Reference:  book_shelfs_books (table: book_shelfs)
ALTER TABLE book_shelfs ADD CONSTRAINT book_shelfs_books FOREIGN KEY book_shelfs_books (isbn)
    REFERENCES books (isbn);

-- Reference:  book_shelfs_shelfs (table: book_shelfs)
ALTER TABLE book_shelfs ADD CONSTRAINT book_shelfs_shelfs FOREIGN KEY book_shelfs_shelfs (shelfs_id)
    REFERENCES shelfs (id);

-- Reference:  books_prices_books (table: books_prices)
ALTER TABLE books_prices ADD CONSTRAINT books_prices_books FOREIGN KEY books_prices_books (isbn)
    REFERENCES books (isbn);

-- Reference:  deliveries_books (table: deliveries)
ALTER TABLE deliveries ADD CONSTRAINT deliveries_books FOREIGN KEY deliveries_books (isbn)
    REFERENCES books (isbn);

-- Reference:  sales_books (table: sales)
ALTER TABLE sales ADD CONSTRAINT sales_books FOREIGN KEY sales_books (isbn)
    REFERENCES books (isbn);

