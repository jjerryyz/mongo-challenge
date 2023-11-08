

/**
  4 - array fields join
  ---

  ### Question 

  You are developing a new dating website using a database to hold the profiles of all registered users. For each user profile, you will persist a set of the user's specified hobbies, each with a description of how the user says they conduct their pursuit. Each user's profile also captures what they prefer to do depending on their mood (e.g., "happy", "sad", "chilling", etc.). When you show the user profiles on the website to a person searching for a date, you want to describe how each candidate user conducts their hobbies for each mood to help the person spot their ideal match.

Sample Data P

 */

db = db.getSiblingDB("book-array-element-grouping");
db.dropDatabase();

// Insert 3 records into the user_rewards collection
db.user_rewards.insertMany([
  {
    "userId": 123456789,
    "rewards": [
      { "coin": "gold", "amount": 25, "date": ISODate("2022-11-01T09:25:23Z") },
      { "coin": "bronze", "amount": 100, "date": ISODate("2022-11-02T11:32:56Z") },
      { "coin": "silver", "amount": 50, "date": ISODate("2022-11-09T12:11:58Z") },
      { "coin": "gold", "amount": 10, "date": ISODate("2022-11-15T12:46:40Z") },
      { "coin": "bronze", "amount": 75, "date": ISODate("2022-11-22T12:57:01Z") },
      { "coin": "gold", "amount": 50, "date": ISODate("2022-11-28T19:32:33Z") },
    ],
  },
  {
    "userId": 987654321,
    "rewards": [
      { "coin": "bronze", "amount": 200, "date": ISODate("2022-11-21T14:35:56Z") },
      { "coin": "silver", "amount": 50, "date": ISODate("2022-11-21T15:02:48Z") },
      { "coin": "silver", "amount": 50, "date": ISODate("2022-11-27T23:04:32Z") },
      { "coin": "silver", "amount": 50, "date": ISODate("2022-11-27T23:29:47Z") },
      { "coin": "bronze", "amount": 500, "date": ISODate("2022-11-27T23:56:14Z") },
    ],
  },
  {
    "userId": 888888888,
    "rewards": [
      { "coin": "gold", "amount": 500, "date": ISODate("2022-11-13T13:42:18Z") },
      { "coin": "platinum", "amount": 5, "date": ISODate("2022-11-19T15:02:53Z") },
    ],
  },
]);


/** start here */



/**
 * Expected
 
  ```js
[
  {
    firstName: 'Alice',
    lastName: 'Jones',
    dateOfBirth: ISODate("1985-07-21T00:00:00.000Z"),
    moodActivities: {
      sad: [ 'Playing the guitar' ],
      happy: [ 'Long-distance running' ],
      chilling: [ 'Playing the guitar', 'Trying out new recipes' ]
    }
  },
  {
    firstName: 'Sam',
    lastName: 'Brown',
    dateOfBirth: ISODate("1993-12-01T00:00:00.000Z"),
    moodActivities: {
      happy: [ 'Mountain biking', 'Growing herbs and vegetables' ],
      sad: [ 'Knitting scarves and hats' ]
    }
  }
]





  ```
 
 */