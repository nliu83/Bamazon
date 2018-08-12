var mysql = require('mysql');

var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host:'localhost', 

    port: 3306, 

    user: 'root', 

    password: 'root', 

    database: 'bamazon'

});

connection.connect(function(err) {
    if (err) throw err;
    displayMenu();
});

function displayMenu() {
    inquirer
        .prompt({
            name: 'action', 
            type: 'list', 
            message: 'What would you like to do?',
            choices: [
                'View Products for Sale', 
                'View Low Inventory', 
                'Add to Inventory', 
                'Add New Product'             
            ]
        })
        .then(function(answer){
            switch(answer.action) {
                case 'View Products for Sale':
                    viewProducts();
                    break;

                case 'View Low Inventory':
                    viewLowInventory();
                    break;

                case 'Add to Inventory':
                    addInventory();
                    break;

                case 'Add New Product':
                    addProduct();
                    break;
            }
        })
}
//list every available item: the item IDs, names, prices, and quantities
function viewProducts() {

    connection.query('SELECT * FROM bamazon.products', 
    
    function(err, res) {
        if (err) throw err;

        for(var i = 0; i < res.length; i++) {
            console.log('item ID: ' + res[i].item_id + ' | Product name: ' + res[i].product_name + ' | Department Name: ' + res[i].department_name + ' | Price: $' + res[i].price + ' | Stock Quantity: ' + res[i].stock_quantity);
       
        };
        
    });
    displayMenu();

}

//list all items with an inventory count lower than five
function viewLowInventory() {


    connection.query('SELECT * FROM bamazon.products WHERE stock_quantity < 15', 
    
    function(err, res) {
        if (err) throw err;

        console.log('Below are the items that have stock quantity less than 15')

        for(var i = 0; i < res.length; i++) {
            console.log('item ID: ' + res[i].item_id + ' | Product name: ' + res[i].product_name + ' | Department Name: ' + res[i].department_name + ' | Price: $' + res[i].price + ' | Stock Quantity: ' + res[i].stock_quantity);
       
        };
    });

    displayMenu();

}

//display a prompt that will let the manager "add more" of any item currently in the store
function addInventory() {

    inquirer.prompt(
        [
            {
                name: 'addItem', 
                type: 'input', 
                message: 'What item would you like to add?', 

            }, 
            {
                name: 'addQuantity', 
                type: 'input', 


            }
        ]
    )
    displayMenu();
}

//allow the manager to add a completely new product to the store
function addProduct() {



    displayMenu();

}