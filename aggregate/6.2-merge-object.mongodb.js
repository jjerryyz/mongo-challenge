/**
  6.2 - Add a field to a document, (mergeObjects version)
  ---

  ### Question 

  add cost to each item in items array, cost = unitPrice * qty

  using $map and $mergeObjects to simplify merge process

  ### Expected
 
  ```js
 {
  custid: 'jdoe@acme.com',
  items: [
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


db.test.insertOne({
  "custid": "jdoe@acme.com",
  "items": [
    {
      "product": "WizzyWidget",
      "unitPrice": 25.99,
      "qty": 8,
    },
    {
      "product": "HighEndGizmo",
      "unitPrice": 33.24,
      "qty": 3,
    }
  ]
});

/** start here */

db.test.aggregate([
])


