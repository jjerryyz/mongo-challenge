
/**
  5.1 - Reproducing $map Behavior Using $reduce 
  ---

  ### Question 

  simple reduce example

  ### Expected
 
  ```js
 [
    {
      device: 'A1',
      readings: [ 27, 282, 38, -1, 187 ],
      deviceReadings: [ 'A1:27', 'A1:282', 'A1:38', 'A1:-1', 'A1:187' ]
    }
  ]
  ```
}
 */

db = db.getSiblingDB('challenge');

db.dropDatabase();

db.test.insertOne({
  "device": "A1",
  "readings": [27, 282, 38, -1, 187]
});


/** start here */

db.test.aggregate([])