/**
  6.3 - Add a field to a document, (mergeObjects version)
  ---

  ### Question 

  添加 cost 到 items 数组中的每个文档中，cost = unitPrice * qty

  注意：cost 属性名称不是固定的

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


