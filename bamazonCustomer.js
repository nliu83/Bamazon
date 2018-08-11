var mysql = require('mysql');

var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost', 
    port: 3306, 
    user: 'root', 
    password: 'root', 
    database: 'bamazon'
});

connection.connect(function(err) {
    if (err) throw err;

    displayProducts();

    itemsToBuy();

    
});

function displayProducts() {

    console.log('Hi. Database succuessfully connected');


    connection.query('SELECT item_id, product_name, price FROM bamazon.products', 
    
    function(err, res) {
        if (err) throw err;
        // console.log('item ID: ' + res[2].item_id + ' | Product name: ' + res[2].product_name + ' | Price: $' + res[2].price)

        for(var i = 0; i < res.length; i++) {
            console.log('item ID: ' + res[i].item_id + ' | Product name: ' + res[i].product_name + ' | Price: $' + res[i].price);
       
        };
        
    });
};

function itemsToBuy () {

    inquirer.prompt([
        {
            name: 'item_id', 
            type: 'input', 
            message: 'Please enter the id of item you would like to purchase?', 
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }, 
        {
            name: 'pQuantity',
            type: 'input', 
            message: 'How many items would you like to purchase?',
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ])
    .then(function(answer) {

        var chosenID =  parseInt(answer.item_id);
        var chosenQuantity = parseInt(answer.pQuantity);

        connection.query('SELECT * FROM bamazon.products', 

        {
            item_id: answer.item_id
        },

        function(err, res) {

            if (err) throw err;

            console.log('User wants to purchase Item-id: ' + chosenID);
            console.log('Chosen Quantity: ' + chosenQuantity);
        
            console.log('item ID: ' + res[chosenID-1].product_name);
            console.log('Stock Quantity: ' + res[chosenID-1].stock_quantity);
    
            if (chosenQuantity > res[chosenID-1].stock_quantity) {
                console.log('Insufficient Quantity!');
            }
            else {
                connection.query(
                    'UPDATE bamazon.products SET ? WHERE ?', 
                    [
                    {
                        stock_quantity: (res[chosenID-1].stock_quantity) - (chosenQuantity)

                    }, 
                    
                    {
                        item_id: chosenID
                    }
                    ], 
                    function(error) {
                        if(error) throw err;

                        connection.query(
                            'SELECT * FROM bamazon.products', 

                            function(err, res) {

                            console.log('Success! There are ' + res[chosenID-1].stock_quantity + ' more left');

                        });

                       
                    }
                    
                )

                
            }

        });
    });
};

