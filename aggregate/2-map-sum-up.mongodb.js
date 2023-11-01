/**
  2 - for-each loop compute summary
  ---

  ### Question 

  对每一项进行 总合计算

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