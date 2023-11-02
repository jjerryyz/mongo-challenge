
/**
  5.1 - Reproducing $map Behavior Using $reduce 
  ---

  ### Question 

  使用 reduce 重现 map 的行为

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

use('challenge')

db.test.drop();

db.test.insertOne({
  "device": "A1",
  "readings": [27, 282, 38, -1, 187]
});


/** start here */

db.test.aggregate([])