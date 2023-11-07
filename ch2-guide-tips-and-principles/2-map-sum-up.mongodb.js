/**
  2 - for-each loop compute summary
  ---

  ### Question 

  using map compute summary
 
 */
db = db.getSiblingDB('book-guide-tips-and-principles');

db.dropDatabase();

db.test.insertMany([{
  "orderId": "AB12345",
  "products": ["Laptop", "Kettle", "Phone", "Microwave"]
}])

/**
 * start here 
 */


/**
 * Expected
 * 
  ```js
 [
    {
      orderId: 'AB12345',
      products: [ 'Laptop', 'Kettle', 'Phone', 'Microwave' ],
      productList: 'Laptop; Kettle; Phone; Microwave; '
    }
  ]
  ```
 
 */