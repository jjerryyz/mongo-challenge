/**
  1 - map 
  ---

  ### Question 

  对每一项进行 Upper 操作

  ### Expected
 
  ```js
 [
    {
      product: 'WizzyWidget',
      unitPrice: 25.99,
      qty: 8,
      cost: 187.128
    },
    {
      product: 'HighEndGizmo',
      unitPrice: 33.24,
      qty: 3,
      cost: 99.72
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


/** start here */