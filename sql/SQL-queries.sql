# connection
# hostname: 127.0.0.1
# username: root
# password: mysql
# database: sjuansbokhandel


-- FOR DELIVERY FORM

-- Shelfs will be shown in a drop-down list in form - must have shelfs saved
# get shelfs
SELECT * FROM shelfs;

-- END OF FOR DELIVERY FORM


-- REGISTER DELIVERY OF A BOOK

# register book
INSERT INTO books (isbn, title, author)
VALUES ({isbn}, {title}, {author});

# register delivery
INSERT INTO deliveries (isbn, f_price, date, quantity)
VALUES ({isbn}, {f_price}, {date}, {quantity});

# register books shelf
INSERT INTO book_shelfs (isbn, shelfs_id)
VALUES ({isbn}, {shelfs_id});

-- END OF REGISTER DELIVERY OF A BOOK


-- REGISTER PRICE 
-- (WHEN REGISTERING DELIVERY OF A BOOK OR ADD A NEW PRICE TO A BOOK)
# register price
INSERT INTO books_prices (price, date, isbn)
VALUES ({price}, {date}, {isbn});


-- REGISTER SALE OF A BOOK
# register sale
INSERT INTO sales (quantity, date, isbn)
VALUES ({quantity}, {date}, {isbn});

# get book stock
SELECT isbn, SUM(quantity) in_stock FROM 
	(SELECT isbn, quantity FROM deliveries UNION SELECT isbn, -quantity FROM sales) b 
GROUP BY isbn;

