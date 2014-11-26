# connection
# hostname: 127.0.0.1
# username: root
# password: mysql
# database: sjuansbokhandel



#save deliveryInfo to db-delivery
INSERT INTO delivery (books_isbn, f_price, date, quantity)
VALUES ({books_isbn}, {f_price}, {date}, {quantity});


