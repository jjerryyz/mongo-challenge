
/**
  3 - find first element's index in array 
  ---

  ### Question 

  find the first room that is large enough 60 

 */


db = db.getSiblingDB('book-guide-tips-and-principles');

db.dropDatabase();

db.test.insertOne({
  "building": "WestAnnex-1",
  "room_sizes": [
    { "width": 9, "length": 5 },
    { "width": 8, "length": 7 },
    { "width": 7, "length": 9 },
    { "width": 9, "length": 8 },
  ]
});


/** start here */


/**
 * Expected
 
  ```js
 [
    {
      building: 'WestAnnex-1',
      room_sizes: [
        { width: 9, length: 5 },
        { width: 8, length: 7 },
        { width: 7, length: 9 },
        { width: 9, length: 8 }
      ],
      firstLargeEnoughRoomArrayIndex: 2
    }
  ]
  ```
 */