

/**
  2 - pivots array item by key 
  ---

  ### Question 

  You have a set of geographically dispersed weather station zones where each zone has multiple sensor devices collecting readings such as temperature, humidity and pressure. Each weather station assembles readings from its devices and once per hour transmits this set of measurements to a central database to store. The set of persisted readings are randomly ordered measurements for different devices in the zone. You need to take the mix of readings and group these by device, so the weather data is easier to consume by downstream dashboards and applications.

 */

db = db.getSiblingDB("book-pivot-array-by-key");
db.dropDatabase();

// Inserts records into the weather_measurements collection
db.weather_measurements.insertMany([
  {
    "weatherStationsZone": "FieldZone-ABCD",
    "dayHour": ISODate("2021-07-05T15:00:00.000Z"),
    "readings": [
      { "device": "ABCD-Device-123", "tempCelsius": 18 },
      { "device": "ABCD-Device-789", "pressureMBar": 1004 },
      { "device": "ABCD-Device-123", "humidityPercent": 31 },
      { "device": "ABCD-Device-123", "tempCelsius": 19 },
      { "device": "ABCD-Device-123", "pressureMBar": 1005 },
      { "device": "ABCD-Device-789", "humidityPercent": 31 },
      { "device": "ABCD-Device-123", "humidityPercent": 30 },
      { "device": "ABCD-Device-789", "tempCelsius": 20 },
      { "device": "ABCD-Device-789", "pressureMBar": 1003 },
    ],
  },
  {
    "weatherStationsZone": "FieldZone-ABCD",
    "dayHour": ISODate("2021-07-05T16:00:00.000Z"),
    "readings": [
      { "device": "ABCD-Device-789", "humidityPercent": 33 },
      { "device": "ABCD-Device-123", "humidityPercent": 32 },
      { "device": "ABCD-Device-123", "tempCelsius": 22 },
      { "device": "ABCD-Device-123", "pressureMBar": 1007 },
      { "device": "ABCD-Device-789", "pressureMBar": 1008 },
      { "device": "ABCD-Device-789", "tempCelsius": 22 },
      { "device": "ABCD-Device-789", "humidityPercent": 34 },
    ],
  },
]);


/** start here */



/**
 * Expected
 
  ```js
[
  {
    weatherStationsZone: 'FieldZone-ABCD',
    dayHour: ISODate("2021-07-05T15:00:00.000Z"),
    readings_device_summary: [
      {
        device: 'ABCD-Device-123',
        tempCelsius: 19,
        humidityPercent: 30,
        pressureMBar: 1005
      },
      {
        device: 'ABCD-Device-789',
        pressureMBar: 1003,
        humidityPercent: 31,
        tempCelsius: 20
      }
    ]
  },
  {
    weatherStationsZone: 'FieldZone-ABCD',
    dayHour: ISODate("2021-07-05T16:00:00.000Z"),
    readings_device_summary: [
      {
        device: 'ABCD-Device-123',
        humidityPercent: 32,
        tempCelsius: 22,
        pressureMBar: 1007
      },
      {
        device: 'ABCD-Device-789',
        humidityPercent: 34,
        pressureMBar: 1008,
        tempCelsius: 22
      }
    ]
  }
]


  ```
 
 */