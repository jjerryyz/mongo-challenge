
/** 
 * 1 - for-each loop  upper transform
 */
db.test.aggregate([
  {
    $set: {
      'products': {
        $map: {
          'input': '$products',
          'as': 'product',
          'in': { '$toUpper': '$$product' }
        }
      }
    }
  }
])




/** 
 * 2 - for-each loop sum up
 */
db.orders.insertOne(order);

var pipeline = [
  {
    "$set": {
      "productList": {
        "$reduce": {
          "input": "$products",
          "initialValue": "",
          "in": {
            "$concat": ["$$value", "$$this", "; "]
          }
        }
      }
    }
  }
];

db.orders.aggregate(pipeline);



/**
 * 3 - first index in array
 */
var pipeline = [
  {
    "$set": {
      "firstLargeEnoughRoomArrayIndex": {
        "$reduce": {
          "input": { "$range": [0, { "$size": "$room_sizes" }] },
          "initialValue": -1,
          "in": {
            "$cond": {
              "if": {
                "$and": [
                  // IF ALREADY FOUND DON'T CONSIDER SUBSEQUENT ELEMENTS
                  { "$lt": ["$$value", 0] },
                  // IF WIDTH x LENGTH > 60
                  {
                    "$gt": [
                      {
                        "$multiply": [
                          { "$getField": { "input": { "$arrayElemAt": ["$room_sizes", "$$this"] }, "field": "width" } },
                          { "$getField": { "input": { "$arrayElemAt": ["$room_sizes", "$$this"] }, "field": "length" } },
                        ]
                      },
                      60
                    ]
                  }
                ]
              },
              // IF ROOM SIZE IS BIG ENOUGH CAPTURE ITS ARRAY POSITION
              "then": "$$this",
              // IF ROOM SIZE NOT BIG ENOUGH RETAIN EXISTING VALUE (-1)
              "else": "$$value"
            }
          }
        }
      }
    }
  }
];

db.buildings.aggregate(pipeline);




/**
 * 4 - first element in array
 */
var pipeline = [
  {
    "$set": {
      "firstLargeEnoughRoom": {
        "$first": {
          "$filter": {
            "input": "$room_sizes",
            "as": "room",
            "cond": {
              "$gt": [
                { "$multiply": ["$$room.width", "$$room.length"] },
                60
              ]
            }
          }
        }
      }
    }
  }
];

db.buildings.aggregate(pipeline);

/**
 * 5 -  reduce
 */
var pipeline = [
  {
    "$set": {
      "deviceReadings": {
        "$reduce": {
          "input": "$readings",
          "initialValue": [],
          "in": {
            "$concatArrays": [
              "$$value",
              [{ "$concat": ["$device", ":", { "$toString": "$$this" }] }]
            ]
          }
        }
      }
    }
  }
];

db.deviceReadings.aggregate(pipeline);




/**
 * 6 - add field to array
 */
var pipeline = [
  {
    "$set": {
      "items": {
        "$map": {
          "input": "$items",
          "as": "item",
          "in": {
            "product": "$$item.product",
            "unitPrice": "$$item.unitPrice",
            "qty": "$$item.qty",
            "cost": { "$multiply": ["$$item.unitPrice", "$$item.qty"] }
          },
        }
      }
    }
  }
];

db.orders.aggregate(pipeline);


/**
 * 7 - map array
 */
var pipeline = [
  {
    "$project": {
      "_id": 0,
      "schema": {
        "$map": {
          "input": { "$objectToArray": "$$ROOT" },
          "as": "field",
          "in": {
            "fieldname": "$$field.k",
            "type": { "$type": "$$field.v" },
          }
        }
      }
    }
  }
];

db.customers.aggregate(pipeline);
