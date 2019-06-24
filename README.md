# RefrostlyInventoryEvaluation
Application that assesses a restocking algorithm by evaluating a generated list of suggested restocking events against the past year's actual order history.

REQUIREMENTS

I wrote my solution in javascript and executed it using the runtime environment Node.js. In order to execute this application using Node.js, the terminal command is: node testRestockAlgo.js

Link to download Node.js from the web: https://nodejs.org/en/download/ || Link to install Node.js using package manager: https://nodejs.org/en/download/package-manager/

# Application Description

This application is designed to evaluate the success of a restocking algorithm designed by "Refrostly", an online winter store. Provided were two json files: one is a list of the past year's order history and the other is a list of the past year's restocking history. The function, buildInventory, takes in two json files (order file and restock file). It calls a helper function (sortJsons) to sort each list of events by datetime. The buildInventory function then iterates through each list, building a running inventory of each product as it is being restocked or ordered. If the inventory never runs out of items being ordered, the output is "success" and the remaining inventory. If the inventory runs out out a product at any point, the output is "out of stock" and a collection of any items unavailable and their respective order dates. In the case of the inventory running out of stock, I assumed Refrostly wanted a comprehensive list of all orders that resulted in an item unavailable, rather than ending the function as soon as we ran out of one item. Note: In order to test an "out of stock" situation, I created and uploaded a second restock json (called Restocks2.json) with too few restocks. 

I provided function calls to assess both the actual generated restock list (output: success) and my own alternate restock list (output: out of stock). When testing the restock algorithm against the two provided jsons, the output message is success.



