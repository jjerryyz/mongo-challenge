/**
  7.1 - generate schema 
  ---

  ### Question 

  generate schema for the following documents

 */


db = db.getSiblingDB('book-guide-tips-and-principles');

db.dropDatabase();


db.test.insertMany([
  {
    "_id": ObjectId('6064381b7aa89666258201fd'),
    "email": 'elsie_smith@myemail.com',
    "dateOfBirth": ISODate('1991-05-30T08:35:52.000Z'),
    "accNnumber": 123456,
    "balance": NumberDecimal("9.99"),
    "address": {
      "firstLine": "1 High Street",
      "city": "Newtown",
      "postcode": "NW1 1AB",
    },
    "telNums": ["07664883721", "01027483028"],
    "optedOutOfMarketing": true,
  },
  {
    "_id": ObjectId('734947394bb73732923293ed'),
    "email": 'jon.jones@coolemail.com',
    "dateOfBirth": ISODate('1993-07-11T22:01:47.000Z'),
    "accNnumber": 567890,
    "balance": NumberDecimal("299.22"),
    "telNums": "07836226281",
    "contactPrefernece": "email",
  },
]);


/** start here */

db.test.aggregate([
])


/**
 * Expected
 
  ```js
  [{
      schema: [
        {fieldname: '_id', type: 'objectId'},
        {fieldname: 'email', type: 'string'},
        {fieldname: 'dateOfBirth', type: 'date'},
        {fieldname: 'accNnumber', type: 'int'},
        {fieldname: 'balance', type: 'decimal'},
        {fieldname: 'address', type: 'object'},
        {fieldname: 'telNums', type: 'array'},
        {fieldname: 'optedOutOfMarketing', type: 'bool'}
      ]
    },
    {
      schema: [
        {fieldname: '_id', type: 'objectId'},
        {fieldname: 'email', type: 'string'},
        {fieldname: 'dateOfBirth', type: 'date'},
        {fieldname: 'accNnumber', type: 'int'},
        {fieldname: 'balance', type: 'decimal'},
        {fieldname: 'telNums', type: 'string'},
        {fieldname: 'contactPrefernece', type: 'string'}
      ]
  }
]
```

 */