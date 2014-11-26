# connection
# hostname: 127.0.0.1
# username: root
# password: mysql
# database: sjuansbokhandel



#save deliveryInfo to db-delivery
INSERT INTO delivery (books_isbn, f_price, date, quantity)
VALUES ({books_isbn}, {f_price}, {date}, {quantity});

# Get the stock of all books (only isbn and quantity)
SELECT isbn, SUM(quantity) in_stock FROM 
	(SELECT isbn, quantity FROM deliveries UNION SELECT isbn, -quantity FROM sales) b 
GROUP BY isbn

