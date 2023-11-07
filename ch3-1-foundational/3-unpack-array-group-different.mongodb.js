

/**
  3 - unpack array and group different 
  ---

  ### Question 

  list the total value and quantity of expensive products sold (valued over 15 dollars). 
  
  The source data is a list of shop orders, where each order contains the set of products purchased as part of the order.

 */


db = db.getSiblingDB('book-foundational');

db.dropDatabase()

// Create index for an orders collection
// Insert 4 records into the orders collection each with 1+ product items
db.test.insertMany([
  {
    "order_id": 6363763262239,
    "products": [
      {
        "prod_id": "abc12345",
        "name": "Asus Laptop",
        "price": NumberDecimal("431.43"),
      },
      {
        "prod_id": "def45678",
        "name": "Karcher Hose Set",
        "price": NumberDecimal("22.13"),
      },
    ],
  },
  {
    "order_id": 1197372932325,
    "products": [
      {
        "prod_id": "abc12345",
        "name": "Asus Laptop",
        "price": NumberDecimal("429.99"),
      },
    ],
  },
  {
    "order_id": 9812343774839,
    "products": [
      {
        "prod_id": "pqr88223",
        "name": "Morphy Richardds Food Mixer",
        "price": NumberDecimal("431.43"),
      },
      {
        "prod_id": "def45678",
        "name": "Karcher Hose Set",
        "price": NumberDecimal("21.78"),
      },
    ],
  },
  {
    "order_id": 4433997244387,
    "products": [
      {
        "prod_id": "def45678",
        "name": "Karcher Hose Set",
        "price": NumberDecimal("23.43"),
      },
      {
        "prod_id": "jkl77336",
        "name": "Picky Pencil Sharpener",
        "price": NumberDecimal("0.67"),
      },
      {
        "prod_id": "xyz11228",
        "name": "Russell Hobbs Chrome Kettle",
        "price": NumberDecimal("15.76"),
      },
    ],
  },
]);


/** start here */



/**
 * Expected
 
  ```js
[
  {
    product_id: 'pqr88223',
    product: 'Morphy Richardds Food Mixer',
    total_value: NumberDecimal('431.43'),
    quantity: 1
  },
  {
    product_id: 'abc12345',
    product: 'Asus Laptop',
    total_value: NumberDecimal('861.42'),
    quantity: 2
  },
  {
    product_id: 'def45678',
    product: 'Karcher Hose Set',
    total_value: NumberDecimal('67.34'),
    quantity: 3
  },
  {
    product_id: 'xyz11228',
    product: 'Russell Hobbs Chrome Kettle',
    total_value: NumberDecimal('15.76'),
    quantity: 1
  }
]

  ```
 */