// import JSON files to be tested 
var orders = require('./orders.json');
var restocks = require('./restocks.json');
var restocks2 = require('./restocks2.json');

// FUNCTIONS
// 1 - sortJson: sort the order and restock jsons (arrays), output sorted jsons
// 2 - buildInventory: iterate over sorted jsons and build inventory as we go(object), output success and remaining inventory or out of stock and any order item/date we ran out on

// RUNTIME
// O(n + m)

// 1 - sort order and restock jsons by date
function sortJson(jsn1, jsn2) {
    jsn1.sort(function(a,b){
        return new Date(a.order_date) - new Date(b.order_date);
    })
    jsn2.sort(function(a,b){
        return new Date(a.restock_date) - new Date(b.restock_date);
    })
}

// 2 - build and assess inventory
// Given the two sorted jsons, assess each order/restock object by date (earliest event to most recent event) and compile a running inventory
function buildInventory(jsn1,jsn2) {
    sortJson(jsn1,jsn2);
    var inventory = {};
    var itemsOutOfStock = {};
    var orderIdx = 0;
    var restockIdx = 0;
    var runner1 = jsn1[orderIdx];
    var runner2 = jsn2[restockIdx];
    var outofStock = false;

    while (runner1 && runner2) {
        if (runner1['order_date'] < runner2['restock_date']) {
            // subtracting an order from inventory (decrease item quanitity)
            let item = runner1['item_ordered'];
            inventory[item] -= runner1['item_quantity'];
            if(inventory[item] < 0){
                outofStock = true;
                itemsOutOfStock[item] = runner1['order_date'];
            }
            orderIdx++;
            var runner1 = jsn1[orderIdx];
        } else {
            // adding a restock to inventory (increase item quanitity)
            let item = runner2['item_stocked'];
            if(inventory[item]){
                inventory[item] += runner2['item_quantity'];
            } else {
                inventory[item] = runner2['item_quantity'];
            }
            restockIdx++;
            var runner2 = jsn2[restockIdx];  
        }
    }
    // assess any remaining order events
    while(runner1){
        let item = runner1['item_ordered'];
        inventory[item] -= runner1['item_quantity'];
        orderIdx++;
        var runner1 = jsn1[orderIdx];
    }
    // assess any remaining restock events
    while(runner2){
        let item = runner2['item_stocked'];
        inventory[item] += runner2['item_quantity'];
        restockIdx++;
        var runner2 = jsn2[restockIdx];
    }

    // check inventory status and return accordingly
    if (outofStock == false) {
        console.log('Success!', inventory);
        return {'SUCCESS': inventory};  
    } else {
        console.log('Out of Stock', itemsOutOfStock);
        return {'OUT OF STOCK': itemsOutOfStock};
    }
}

// FUNCTION CALLS

buildInventory(orders, restocks);
buildInventory(orders, restocks2);

// console.log(buildInventory(orders, restocks));
// console.log(buildInventory(orders, restocks2));

