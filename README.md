# RefrostlyInventoryEvaluation
Application that assesses a restocking algorithm by evaluating the past year's restocking events it generated against the past year's actual order history.

REQUIREMENTS

I wrote my solution in javascript and ran it using the runtime environment Node.js. In order to this application using Node.js, the terminal command is: node testRestockAlgo.js

# methods to download/install node.js
Link to download Node.js from the web: https://nodejs.org/en/download/ || Link to install Node.js using package manager: https://nodejs.org/en/download/package-manager/

APPLICATION DESCRIPTION

This application is designed to evaluate the success of a restocking algorithm designed by "Refrostly", an online winter store. Provided are two jsons, one is a list of the past year's order history and the other is a list of the past year's restocking history. Here I sort the two lists of events by datetime and then run through each list, building a running inventory of each product as it is being restocked and ordered. If the inventory never runs out of items being ordered, the output is "success" and the remaining inventory. If the inventory runs out out a product at any point, the output is "out of stock" and a collection of any items unavailable and their respective order dates. In the case of the inventory running out of stock, I assumed Refrostly wanted a comprehensive list of all orders that resulted in an item unavailable, rather than ending the function as soon as we ran out of one item. Note: In order to test an "out of stock" situation, I created and uploaded a second restock json (called Restocks2.json) with too few restocks. 

I provided function calls to assess both the actual generated restock list (output: success) and my own alternate restock list(output: out of stock). 

The function buildInventory takes in two json files (order file and restock file) and first calls a helper function to sort each list. Then it iterates thrugh each list by date and adds to / evaluates the inventory at every step. 



