/**
  2 - for-each loop compute summary
  ---

  ### Question 

  using map compute summary

  ### Expected
 
  ```js
 [
    {
      orderId: 'AB12345',
      products: [ 'Laptop', 'Kettle', 'Phone', 'Microwave' ],
      productList: 'Laptop; Kettle; Phone; Microwave; '
    }
  ]
  ```
}
 */
db = db.getSiblingDB('challenge');

db.dropDatabase();

db.test.insertMany([{
  "orderId": "AB12345",
  "products": ["Laptop", "Kettle", "Phone", "Microwave"]
}])

/**
 * start here 
 */