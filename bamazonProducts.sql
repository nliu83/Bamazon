DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT, 
    product_name VARCHAR(40) NOT NULL, 
    department_name VARCHAR (20) NOT NULL, 
    price DECIMAL (10,2), 
    stock_quantity INT (5),
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)

VALUES 
('Lenovo laptop', 'electronics', 1000.10, 199), 
('Best Boba', 'food', 25.25, 25), 
('Green Grapes', 'food', 10.10, 10), 
('Blue Blueberries','food', 20.20, 20), 
('Black Backpack', 'accessories', 70.70, 70), 
('Washable Waterbotte', 'accessories', 30.30, 30), 
('Huge Headphones', 'accessories', 60.60, 60), 
('Glamorous Glasses','accessories', 90.90, 90), 
('Sneaky Sneakers', 'clothing', 99.99, 99), 
('Jumping Jeans', 'clothing', 50.50, 50);



