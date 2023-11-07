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
use('challenge')

db.test.drop();

db.test.insertMany([{
  "orderId": "AB12345",
  "products": ["Laptop", "Kettle", "Phone", "Microwave"]
}])

/**
 * start here 
 */