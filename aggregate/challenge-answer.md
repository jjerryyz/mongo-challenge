
### 1 - for-each loop  upper transform

```js
const pipeline = [
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
]

```


 ### 2 - for-each loop sum up

```js
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
```



/**
 * 
 */
 ### 3 - first index in array

 ```js
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
 
 ```

 ### 4 - first element in array

 ```js
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
 
 ```

 ### 5.1 -  reduce


 ```js
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
 ```

`$concatArrays` 拼接数组；

`$$value`: `$reduce` 中表示累积的数据;

`$$this`: `$reduce` 中表示当前的数据;

### 5.2  - reduce 2

```js
const pipeline = [
  {
    $set: {
      deviceReadings: {
        $reduce: {
          input: '$readings',
          initialValue: [],
          in: {
            $concatArrays: [
              '$$value',
              {
                $cond: {
                  if: { $gte: ['$$this', 0] },
                  then: [{
                    $concat: ['$device', ':', { $toString: '$$this' }]
                  }],
                  else: []
                }
              }
            ]
          }
        }
      }
    }
  }
]
```

 ### 6.1 - add field to array


 ```js
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
 ```

### 6.2 - add field to array (mergeObject version)

 使用 `$mergeObjects` 简化合并过程

 ```js
 var pipeline = [
  {"$set": {
    "items": {
      "$map": {
        "input": "$items",
        "as": "item",
        "in": {
          "$mergeObjects": [
            "$$item",            
            {"cost": {"$multiply": ["$$item.unitPrice", "$$item.qty"]}},
          ]
        }
      }
    }
  }}
];
 ```


 ### 6.3 - 

 ```js
const pipeline = {
    $set: {
      items: {
        $map: {
          input: '$items',
          as: 'item',
          in: {
            $arrayToObject: {
              $concatArrays: [
                { $objectToArray: '$$item' },
                [{
                  k: { $concat: ['costFor', '$$item.product'] },
                  v: { $multiply: ['$$item.unitPrice', '$$item.qty'] }
                }]
              ]
            }
          }
        }
      }
    }
  } 
 ```

 ### 7 - generate schema


 ```js
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
 
 ```

### 7.2 generate schema

```js
var pipeline = [
  {"$project": {
    "_id": 0,
    "schema": {
      "$map": {
        "input": {"$objectToArray": "$$ROOT"},
        "as": "field",
        "in": {
          "fieldname": "$$field.k",
          "type": {"$type": "$$field.v"},          
        }
      }
    }
  }},
  
  {"$unwind": "$schema"},

  {"$group": {
    "_id": "$schema.fieldname",
    "types": {"$addToSet": "$schema.type"},
  }},
  
  {"$set": {
    "fieldname": "$_id",
    "_id": "$$REMOVE",
  }},
];

```
