
/**
  5.2 - reduce 2 
  ---

  ### Question 

  using $reduce output the following result

  ※ filter out readings less than 0

 */

db = db.getSiblingDB('book-guide-tips-and-principles');

db.dropDatabase();

db.test.insertOne({
  "device": "A1",
  "readings": [27, 282, 38, -1, 187]
});


/** start here */

db.test.aggregate([
])


/**
 * Expected
 
  ```js
 [
    {
      device: 'A1',
      readings: [ 27, 282, 38, 187 ],
      deviceReadings: [ 'A1:27', 'A1:282', 'A1:38', 'A1:187' ]
    }
  ]
  ```
 */