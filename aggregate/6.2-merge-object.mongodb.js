/**
  6.2 - Add a field to a document, (mergeObjects version)
  ---

  ### Question 

  添加 cost 到 items 数组中的每个文档中，cost = unitPrice * qty

  使用  $map 和 $mergeObjects 简化合并流程

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


