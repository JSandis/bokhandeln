# connection
# hostname: 127.0.0.1
# username: root
# password: mysql
# database: sjuansbokhandel


-- FOR DELIVERY FORM
-- Shelfs will be shown in a drop-down list in form - must have shelves saved
# get shelves
SELECT shelf_id, code FROM shelves;
--

-- AFTER GETTING DATA FROM DELIVERY FORM
# get isbn
SELECT isbn FROM books WHERE isbn = {isbn};

# get author id
SELECT author_id FROM authors WHERE first_name = {first_name} AND last_name = {last_name};

-- If the author doesn't exist
# add author
INSERT INTO authors (first_name, last_name) Output Inserted.IdentityColumnName
VALUES ({first_name}, {last_name});
--

-- DIRECTLY AFTER INSERTING (and BEFORE inserting/updating in another table)
-- Author id for register book OR
-- Book id for register delivery
# get last insert id
SELECT LAST_INSERT_ID() AS id;
--

-- REGISTER DELIVERY OF A BOOK
# register book
INSERT INTO books (isbn, title, description, author_id, shelf_id)
VALUES ({isbn}, {title}, {description}, {author_id}, {shelf_id});

# register delivery
INSERT INTO deliveries (isbn, f_price, date, quantity)
VALUES ({isbn}, {f_price}, {date}, {quantity});
-- 

-- REGISTER PRICE 
-- (WHEN REGISTERING DELIVERY OF A BOOK 
--	OR ADDING A NEW PRICE TO A BOOK)
-- We don't have to set the date, it will automatically be the current date and time
# register price
INSERT INTO books_prices (price, isbn)
VALUES ({price}, {isbn});
--

-- REGISTER SALE OF A BOOK
# register sale
INSERT INTO sales (quantity, date, isbn)
VALUES ({quantity}, {date}, {isbn});
--

-- FOR CUSTOMER SEARCH FORM
# get book stock
SELECT isbn, SUM(quantity) in_stock FROM 
	(SELECT isbn, quantity FROM deliveries UNION SELECT isbn, -quantity FROM sales) b 
GROUP BY isbn;

-- 


