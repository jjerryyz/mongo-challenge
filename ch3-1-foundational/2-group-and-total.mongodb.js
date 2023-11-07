

/**
  2 - group & total 
  ---

  ### Question 

  match order in 2020, group by customer_id, total up value and count orders 

 */


db = db.getSiblingDB('book-foundational');

db.dropDatabase()

// Create index for an orders collection
db.test.createIndex({ "orderdate": -1 });

// Insert records into the orders collection
db.test.insertMany([
  {
    "customer_id": "elise_smith@myemail.com",
    "orderdate": ISODate("2020-05-30T08:35:52Z"),
    "value": NumberDecimal("231.43"),
  },
  {
    "customer_id": "elise_smith@myemail.com",
    "orderdate": ISODate("2020-01-13T09:32:07Z"),
    "value": NumberDecimal("99.99"),
  },
  {
    "customer_id": "oranieri@warmmail.com",
    "orderdate": ISODate("2020-01-01T08:25:37Z"),
    "value": NumberDecimal("63.13"),
  },
  {
    "customer_id": "tj@wheresmyemail.com",
    "orderdate": ISODate("2019-05-28T19:13:32Z"),
    "value": NumberDecimal("2.01"),
  },
  {
    "customer_id": "tj@wheresmyemail.com",
    "orderdate": ISODate("2020-11-23T22:56:53Z"),
    "value": NumberDecimal("187.99"),
  },
  {
    "customer_id": "tj@wheresmyemail.com",
    "orderdate": ISODate("2020-08-18T23:04:48Z"),
    "value": NumberDecimal("4.59"),
  },
  {
    "customer_id": "elise_smith@myemail.com",
    "orderdate": ISODate("2020-12-26T08:55:46Z"),
    "value": NumberDecimal("48.50"),
  },
  {
    "customer_id": "tj@wheresmyemail.com",
    "orderdate": ISODate("2021-02-29T07:49:32Z"),
    "value": NumberDecimal("1024.89"),
  },
  {
    "customer_id": "elise_smith@myemail.com",
    "orderdate": ISODate("2020-10-03T13:49:44Z"),
    "value": NumberDecimal("102.24"),
  },
]);


/** start here */



/**
 * Expected
 
  ```js
[
  {
    customer_id: 'oranieri@warmmail.com',
    first_purchase_date: ISODate('2020-01-01T08:25:37.000Z'),
    total_value: NumberDecimal('63.13'),
    total_orders: 1,
    orders: [
      {orderdate: ISODate('2020-01-01T08:25:37.000Z'), value: NumberDecimal('63.13')}
    ]
  },
  {
    customer_id: 'elise_smith@myemail.com',
    first_purchase_date: ISODate('2020-01-13T09:32:07.000Z'),
    total_value: NumberDecimal('482.16'),
    total_orders: 4,
    orders: [
      {orderdate: ISODate('2020-01-13T09:32:07.000Z'), value: NumberDecimal('99.99')},
      {orderdate: ISODate('2020-05-30T08:35:52.000Z'), value: NumberDecimal('231.43')},
      {orderdate: ISODate('2020-10-03T13:49:44.000Z'), value: NumberDecimal('102.24')},
      {orderdate: ISODate('2020-12-26T08:55:46.000Z'), value: NumberDecimal('48.50')}
    ]
  },
  {
    customer_id: 'tj@wheresmyemail.com',
    first_purchase_date: ISODate('2020-08-18T23:04:48.000Z'),
    total_value: NumberDecimal('192.58'),
    total_orders: 2,
    orders: [
      {orderdate: ISODate('2020-08-18T23:04:48.000Z'), value: NumberDecimal('4.59')},
      {orderdate: ISODate('2020-11-23T22:56:53.000Z'), value: NumberDecimal('187.99')}
    ]
  }
]
  ```
 */