/**
  6.3 - Add a field to a document, (mergeObjects version)
  ---

  ### Question 

  add cost to each item in items array, cost = unitPrice * qty

  ※ cost field name is different for each item 

  ### Expected
 
  ```js
 {
  custid: 'jdoe@acme.com',
  items: [
    {
      product: 'WizzyWidget',
      unitPrice: 25.99,
      qty: 8,
      costForWizzWidget: 187.128
    },
    {
      product: 'HighEndGizmo',
      unitPrice: 33.24,
      qty: 3,
      costForHighEndGizmo: 99.72
    }
  ]
  ```
}
 */


db = db.getSiblingDB('challenge');

db.dropDatabase();


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


