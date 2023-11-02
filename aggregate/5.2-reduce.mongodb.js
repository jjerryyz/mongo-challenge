
/**
  5.2 - reduce 2 
  ---

  ### Question 

  使用 $reduce 输出下面结果

  ※ 需要过滤 reading 小于 0 的项

  ### Expected
 
  ```js
 [
    {
      device: 'A1',
      readings: [ 27, 282, 38, 187 ],
      deviceReadings: [ 'A1:27', 'A1:282', 'A1:38', 'A1:187' ]
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

db.test.aggregate([
])