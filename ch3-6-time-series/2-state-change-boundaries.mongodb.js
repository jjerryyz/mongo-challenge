

/**
  2 - state change boundaries 
  ---

  ### Question 

  You are monitoring various industrial devices (e.g. heaters, fans) contained in the business locations of your clients. 
  You want to understand the typical patterns of when these devices are on and off to help you optimise for sustainability by reducing energy costs and carbon footprint. 
  The source database contains periodic readings for every device, capturing whether each is currently on or off. 
  You need a less verbose view that condenses this data, highlighting each device's timespan in a particular on or off state.

 */

db = db.getSiblingDB("book-state-change-boundaries");
db.dropDatabase();

// Use a time-series collection for optimal processing
// NOTE: This command can be commented out and the full example will still work
db.createCollection("device_status", {
  "timeseries": {
    "timeField": "timestamp",
    "metaField": "deviceID",
    "granularity": "minutes"
  }
});

// Create compound index for 'partitionBy' & 'sortBy' in first $setWindowFields use
db.device_status.createIndex({ "deviceID": 1, "timestamp": 1 });

// Insert 9 records into the deployments collection
db.device_status.insertMany([
  {
    "deviceID": "HEATER-111",
    "timestamp": ISODate("2021-07-03T11:09:00Z"),
    "state": "on",
  },
  {
    "deviceID": "FAN-999",
    "timestamp": ISODate("2021-07-03T11:09:00Z"),
    "state": "on",
  },
  {
    "deviceID": "HEATER-111",
    "timestamp": ISODate("2021-07-03T11:19:00Z"),
    "state": "on",
  },
  {
    "deviceID": "HEATER-111",
    "timestamp": ISODate("2021-07-03T11:29:00Z"),
    "state": "on",
  },
  {
    "deviceID": "FAN-999",
    "timestamp": ISODate("2021-07-03T11:39:00Z"),
    "state": "off",
  },
  {
    "deviceID": "HEATER-111",
    "timestamp": ISODate("2021-07-03T11:39:00Z"),
    "state": "off",
  },
  {
    "deviceID": "HEATER-111",
    "timestamp": ISODate("2021-07-03T11:49:00Z"),
    "state": "off",
  },
  {
    "deviceID": "HEATER-111",
    "timestamp": ISODate("2021-07-03T11:59:00Z"),
    "state": "on",
  },
  {
    "deviceID": "DEHUMIDIFIER-555",
    "timestamp": ISODate("2021-07-03T11:29:00Z"),
    "state": "on",
  },
]);


/** start here */



/**
 * Expected
 
  ```js
[
  {
    deviceID: 'DEHUMIDIFIER-555',
    state: 'on',
    startTimestamp: ISODate("2021-07-03T11:29:00.000Z"),
    endTimestamp: null
  },
  {
    deviceID: 'FAN-999',
    state: 'on',
    startTimestamp: ISODate("2021-07-03T11:09:00.000Z"),
    endTimestamp: ISODate("2021-07-03T11:09:00.000Z")
  },
  {
    deviceID: 'FAN-999',
    state: 'off',
    startTimestamp: ISODate("2021-07-03T11:39:00.000Z"),
    endTimestamp: null
  },
  {
    deviceID: 'HEATER-111',
    state: 'on',
    startTimestamp: ISODate("2021-07-03T11:09:00.000Z"),
    endTimestamp: ISODate("2021-07-03T11:29:00.000Z")
  },
  {
    deviceID: 'HEATER-111',
    state: 'off',
    startTimestamp: ISODate("2021-07-03T11:39:00.000Z"),
    endTimestamp: ISODate("2021-07-03T11:49:00.000Z")
  },
  {
    deviceID: 'HEATER-111',
    state: 'on',
    startTimestamp: ISODate("2021-07-03T11:59:00.000Z"),
    endTimestamp: null
  }
]
  ```
 
 */