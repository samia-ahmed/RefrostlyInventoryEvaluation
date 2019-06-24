// import JSON files to be tested 
var orders = require('./orders.json');
var restocks = require('./restocks.json');
var restocks2 = require('./restocks2.json');

// MAIN FUNCTIONS
// 1 - sortJson: sort the order and restock jsons (arrays), output sorted jsons
// 2 - createEventList: combine sorted arrays into one array of events (each event is an object)
// 3 - buildInventory: iterate over events array and build inventory (object), output success or out of stock


// 1 - sort arrays
function sortJson(jsn1, jsn2) {
    jsn1.sort(function(a,b){
        return new Date(a.order_date) - new Date(b.order_date);
    })
    jsn2.sort(function(a,b){
        return new Date(a.restock_date) - new Date(b.restock_date);
    })
    console.log(jsn1);
    console.log(jsn2);
}

// 2 - combine sorted arrays into one
function createEventList(jsn1,jsn2) {
    //given the two sorted jsons, go date by date and compile a new array/json, sorted by event date
    var events = [];
    var orderIdx = 0;
    var restockIdx = 0;
    var runner1 = jsn1[orderIdx];
    var runner2 = jsn2[restockIdx];

    console.log('creating event list');
    while (runner1 && runner2) {
        if (runner1['order_date'] < runner2['restock_date']) {
            events.push(runner1);
            orderIdx++;
            var runner1 = jsn1[orderIdx];
        } else {
            events.push(runner2);
            restockIdx++;
            var runner2 = jsn2[restockIdx];  
        }
    }
    while(runner1){
        events.push(runner1);
        orderIdx++;
        var runner1 = jsn1[orderIdx];
    }
    while(runner2){
        events.push(runner2);
        restockIdx++;
        var runner2 = jsn2[restockIdx];
    }
    // call function to sort jsons
    sortJson(jsn1, jsn2);
}

// 3 - create inventory object
// loop though array of events
    
        //if item doesnt exist as a key in inventory (!inventory[item_stocked]){
            //add item as key and set value to item_quantity
        //else (item DOES exist), increment quantity: inventory[item_stocked] += item_quantity
    
        //reduce quantity of item by item_quantity: inventory[item_ordered] -= item_quantity
        //if inventory[item_ordered] < 0 aka we're in the negatives:
            //log/return item_ordered and order_date
// after for loop, return inventory object 
        


// if event is a restock
    //add item quantity to inventory object
// if event is an order
    //subtract item quantity from inventory object
    //if item quantity is negative, log/return item and order date

//after for loop, go through inventory
    //if all items are positive, log/return inventory
function buildInventory(eventArr){
    var promise = new Promise(function(resolve, reject){
    var outofStock = false;
    var inventory = {};

    for (let i = 0; i < eventArr.length; i++) {
        if (eventArr[i]['item_stocked']){   // this is a restock event
            let item = eventArr[i]['item_stocked'];
            if(inventory[item]){    // item exists in inventory
                inventory[item] += eventArr[i]['item_quantity'];    // increment quantity
            } else { 
                inventory[item] = eventArr[i]['item_quantity'];     // add item and increment quantity
            }
        }
        else if(eventArr[i]['item_ordered']){   // this is an order event
            let item = eventArr[i]['item_ordered'];
            inventory[item] -= eventArr[i]['item_quantity'];    // deccrement quantity
            if(inventory[item] < 0){    // item is out of stock 
                console.log('out of stock');
                var orderOutOfStock = [item, eventArr[i]['order_date']]
                outofStock = true;
                // return(inventory[item], eventArr[i]['order_date']);
            }
        }
    }
    // console.log(inventory);
    console.log('okurrrrr');
    // return true;
    if(outofStock == false){
        resolve(inventory)
        // resolve('yay')
    } else {
        // reject(Error('out of stock'))
        resolve(orderOutOfStock)
    }
})
promise.then(function(result) {
    console.log(result); // "yay it woked!"
    // return result;
  }, function(err) {
    console.log(err); // Error: "out of stock"
  });
}




//function calls
// sortJson(orders, restocks2);
// createEventList(orders, restocks2);

// console.log(sortJson(orders, restocks2));
// console.log(createEventList(orders, restocks2));
console.log(sortJson(orders, restocks));
console.log(createEventList(orders, restocks));

// REQUIREMENTS
// run using node.js - command in terminal is node testRestockAlgo.js
// console should display success or out of stock message
// implemented a simple javascript solution to test the restocking algorithm
