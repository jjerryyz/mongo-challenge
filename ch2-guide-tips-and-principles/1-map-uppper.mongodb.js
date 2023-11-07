/**
  1 - map 
  ---

  ### Question 

  simple map 

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

db = db.getSiblingDB('challenge');

db.dropDatabase();

db.test.insertMany([{
  "orderId": "AB12345",
  "products": ["Laptop", "Kettle", "Phone", "Microwave"]
}])


/** start here */