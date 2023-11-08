## guide tips and principles

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
    $set: {
      firstLargeEnoughRoomArrayIndex: {
        $reduce: {
          input: { $range: [0, { $size: "$room_sizes" }] },
          initialValue: -1,
          in: {
            $cond: {
              if: {
                $and: [
                  // IF ALREADY FOUND DON'T CONSIDER SUBSEQUENT ELEMENTS
                  { $lt: ["$$value", 0] },
                  // IF WIDTH x LENGTH > 60
                  {
                    $gt: [
                      {
                        $multiply: [
                          { $getField: { input: { $arrayElemAt: ['$room_sizes', "$$this"] }, field: "width" } },
                          { $getField: { input: { $arrayElemAt: ['$room_sizes', "$$this"] }, field: "length" } },
                        ]
                      },
                      60
                    ]
                  }
                ]
              },
              // IF ROOM SIZE IS BIG ENOUGH CAPTURE ITS ARRAY POSITION
              then: "$$this",
              // IF ROOM SIZE NOT BIG ENOUGH RETAIN EXISTING VALUE (-1)
              else: "$$value"
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




## 1. foundational

### 1.1. filter top subset

```js
var pipeline = [
  // Match engineers only
  {"$match": {
    "vocation": "ENGINEER",
  }},
    
  // Sort by youngest person first
  {"$sort": {
    "dateofbirth": -1,
  }},      
    
  // Only include the first 3 youngest people
  {"$limit": 3},  

  // Exclude unrequired fields from each person record
  {"$unset": [
    "_id",
    "vocation",
    "address",
  ]},    
];
```



### 1.2. group and total 

```js
var pipeline = [
  // Match only orders made in 2020
  {"$match": {
    "orderdate": {
      "$gte": ISODate("2020-01-01T00:00:00Z"),
      "$lt": ISODate("2021-01-01T00:00:00Z"),
    },
  }},
  
  // Sort by order date ascending (required to pick out 'first_purchase_date' below)
  {"$sort": {
    "orderdate": 1,
  }},      

  // Group by customer
  {"$group": {
    "_id": "$customer_id",
    "first_purchase_date": {"$first": "$orderdate"},
    "total_value": {"$sum": "$value"},
    "total_orders": {"$sum": 1},
    "orders": {"$push": {"orderdate": "$orderdate", "value": "$value"}},
  }},
  
  // Sort by each customer's first purchase date
  {"$sort": {
    "first_purchase_date": 1,
  }},    
  
  // Set customer's ID to be value of the field that was grouped on
  {"$set": {
    "customer_id": "$_id",
  }},
  
  // Omit unwanted fields
  {"$unset": [
    "_id",
  ]},   
];


```



### 1.3. unpack array and group different

```js
var pipeline = [
  // Unpack each product from each order's product as a new separate record
  {"$unwind": {
    "path": "$products",
  }},

  // Match only products valued greater than 15.00
  {"$match": {
    "products.price": {
      "$gt": NumberDecimal("15.00"),
    },
  }},
  
  // Group by product type, capturing each product's total value + quantity
  {"$group": {
    "_id": "$products.prod_id",
    "product": {"$first": "$products.name"},
    "total_value": {"$sum": "$products.price"},
    "quantity": {"$sum": 1},
  }},

  // Set product id to be the value of the field that was grouped on
  {"$set": {
    "product_id": "$_id",
  }},
  
  // Omit unwanted fields
  {"$unset": [
    "_id",
  ]},   
];

```


### 1.4. distinct list of values

```js
var pipeline = [
  // Unpack each language field which may be an array or a single value
  {"$unwind": {
    "path": "$language",
  }},
  
  // Group by language
  {"$group": {
    "_id": "$language",
  }},
  
  // Sort languages alphabetically
  {"$sort": {
    "_id": 1,
  }}, 
  
  // Change _id field's name to 'language'
  {"$set": {
    "language": "$_id",
    "_id": "$$REMOVE",     
  }},
];

```



## 2. join data

### 2.1. one to one

```js
var pipeline = [
  // Match only orders made in 2020
  {"$match": {
    "orderdate": {
      "$gte": ISODate("2020-01-01T00:00:00Z"),
      "$lt": ISODate("2021-01-01T00:00:00Z"),
    }
  }},

  // Join "product_id" in orders collection to "id" in products" collection
  {"$lookup": {
    "from": "products",
    "localField": "product_id",
    "foreignField": "id",
    "as": "product_mapping",
  }},

  // For this data model, will always be 1 record in right-side
  // of join, so take 1st joined array element
  {"$set": {
    "product_mapping": {"$first": "$product_mapping"},
  }},
  
  // Extract the joined embeded fields into top level fields
  {"$set": {
    "product_name": "$product_mapping.name",
    "product_category": "$product_mapping.category",
  }},
  
  // Omit unwanted fields
  {"$unset": [
    "_id",
    "product_id",
    "product_mapping",
  ]},     
];

```


### 2.2. multiple join one and one to many

```js
var pipeline = [
  // Join by 2 fields in products collection to 2 fields in orders collection
  {"$lookup": {
    "from": "orders",
    "let": {
      "prdname": "$name",
      "prdvartn": "$variation",
    },
    // Embedded pipeline to control how the join is matched
    "pipeline": [
      // Join by two fields in each side
      {"$match":
        {"$expr":
          {"$and": [
            {"$eq": ["$product_name",  "$$prdname"]},
            {"$eq": ["$product_variation",  "$$prdvartn"]},            
          ]},
        },
      },

      // Match only orders made in 2020
      {"$match": {
        "orderdate": {
          "$gte": ISODate("2020-01-01T00:00:00Z"),
          "$lt": ISODate("2021-01-01T00:00:00Z"),
        }
      }},
      
      // Exclude some unwanted fields from the right side of the join
      {"$unset": [
        "_id",
        "product_name",
        "product_variation",
      ]},
    ],
    as: "orders",
  }},

  // Only show products that have at least one order
  {"$match": {
    "orders": {"$ne": []},
  }},

  // Omit unwanted fields
  {"$unset": [
    "_id",
  ]}, 
];

```


## 3. data conversion

### 3.1. strong type conversion

```js
var pipeline = [
  // Convert strings to required types
  {"$set": {
    "order_date": {"$toDate": "$order_date"},    
    "value": {"$toDecimal": "$value"},
    "further_info.item_qty": {"$toInt": "$further_info.item_qty"},
    "further_info.reported": {"$switch": {
      "branches": [
        {"case": {"$eq": [{"$toLower": "$further_info.reported"}, "true"]}, "then": true},
        {"case": {"$eq": [{"$toLower": "$further_info.reported"}, "false"]}, "then": false},
      ],
      "default": {"$ifNull": ["$further_info.reported", "$$REMOVE"]},
    }},     
  }},     
  
  // Output to an unsharded or sharded collection
  {"$merge": {
    "into": "orders_typed",
  }},    
];

```




### 3.2. convert incomplete date strings 

```js
var pipeline = [
  // Change field from a string to a date, filling in the gaps
  {"$set": {
    "paymentDate": {    
      "$let": {
        "vars": {
          "txt": "$paymentDate",  // Assign "paymentDate" field to variable "txt",
          "month": {"$substrCP": ["$paymentDate", 3, 3]},  // Extract month text
        },
        "in": { 
          "$dateFromString": {"format": "%d-%m-%Y %H.%M.%S.%L", "dateString":
            {"$concat": [
              {"$substrCP": ["$$txt", 0, 3]},  // Use 1st 3 chars in string
              {"$switch": {"branches": [  // Replace month 3 chars with month number
                {"case": {"$eq": ["$$month", "JAN"]}, "then": "01"},
                {"case": {"$eq": ["$$month", "FEB"]}, "then": "02"},
                {"case": {"$eq": ["$$month", "MAR"]}, "then": "03"},
                {"case": {"$eq": ["$$month", "APR"]}, "then": "04"},
                {"case": {"$eq": ["$$month", "MAY"]}, "then": "05"},
                {"case": {"$eq": ["$$month", "JUN"]}, "then": "06"},
                {"case": {"$eq": ["$$month", "JUL"]}, "then": "07"},
                {"case": {"$eq": ["$$month", "AUG"]}, "then": "08"},
                {"case": {"$eq": ["$$month", "SEP"]}, "then": "09"},
                {"case": {"$eq": ["$$month", "OCT"]}, "then": "10"},
                {"case": {"$eq": ["$$month", "NOV"]}, "then": "11"},
                {"case": {"$eq": ["$$month", "DEC"]}, "then": "12"},
               ], "default": "ERROR"}},
              "-20",  // Add hyphen + hardcoded century 2 digits
              {"$substrCP": ["$$txt", 7, 15]}  // Use time up to 3 millis (ignore last 6 nanosecs)
            ]
          }}                  
        }
      }        
    },             
  }},

  // Omit unwanted fields
  {"$unset": [
    "_id",
  ]},         
];
```

## 4. trend analysis

### 4.1 faceted classification

```js
var pipeline = [
  // Group products by 2 facets: 1) by price ranges, 2) by rating ranges
  {"$facet": {

    // Group by price ranges
    "by_price": [
      // Group into 3 ranges: inexpensive small price range to expensive large price range
      {"$bucketAuto": {
        "groupBy": "$price",
        "buckets": 3,
        "granularity": "1-2-5",
        "output": {
          "count": {"$sum": 1},gg
          "products": {"$push": "$name"},
        },
      }},
      
      // Tag range info as "price_range"
      {"$set": {
        "price_range": "$_id",
      }},         
      
      // Omit unwanted fields
      {"$unset": [
        "_id",
      ]},         
    ],

    // Group by rating ranges
    "by_rating": [
      // Group products evenly across 5 rating ranges from low to high
      {"$bucketAuto": {
        "groupBy": "$rating",
        "buckets": 5,
        "output": {
          "count": {"$sum": 1},
          "products": {"$push": "$name"},
        },
      }},
      
      // Tag range info as "rating_range"
      {"$set": {
        "rating_range": "$_id",
      }},         
      
      // Omit unwanted fields
      {"$unset": [
        "_id",
      ]},         
    ],
  }},  
];

```

### 4.2. largest graph network

```js
var pipeline = [
  // For each social network user, graph traverse their 'followed_by' list of people
  {"$graphLookup": {
    "from": "users",
    "startWith": "$followed_by",
    "connectFromField": "followed_by",
    "connectToField": "name",
    "depthField": "depth",
    "as": "extended_network",
  }},

  // Add new accumulating fields
  {"$set": {
    // Count the extended connection reach
    "network_reach": {
      "$size": "$extended_network"
    },

    // Gather the list of the extended connections' names
    "extended_connections": {
      "$map": {
        "input": "$extended_network",
        "as": "connection",
        "in": "$$connection.name", // Just get name field from each array element
      }
    },    
  }},
    
  // Omit unwanted fields
  {"$unset": [
    "_id",
    "followed_by",
    "extended_network",
  ]},   
  
  // Sort by person with greatest network reach first, in descending order
  {"$sort": {
    "network_reach": -1,
  }},   
];

```

### 4.3. increment analytics

```js
function getDayAggPipeline(startDay, endDay) {
  return [
    // Match orders for one day only
    {"$match": {
      "orderdate": {
        "$gte": ISODate(startDay),
        "$lt": ISODate(endDay),
      }
    }},
    
    // Group all orders together into one summary record for the day
    {"$group": {
      "_id": null,
      "date_parts": {"$first": {"$dateToParts": {"date": "$orderdate"}}},
      "total_value": {"$sum": "$value"},
      "total_orders": {"$sum": 1},
    }},
      
    // Get date parts from 1 order (need year+month+day, for UTC)
    {"$set": {
      "day": {
        "$dateFromParts": {
          "year": "$date_parts.year", 
          "month": "$date_parts.month",
          "day":"$date_parts.day"
       }
     },
    }},
        
    // Omit unwanted field
    {"$unset": [
      "_id",
      "date_parts",
    ]},
    
    // Add day summary to summary collection (overwrite if already exists)
    {"$merge": {
      "into": "daily_orders_summary",
      "on": "day",
      "whenMatched": "replace",
      "whenNotMatched": "insert"
    }},   
  ];
}

```

## 5. securing data


### 5.1 redacted view

```js
var pipeline = [
  // Filter out any persons aged under 18 ($expr required to reference '$$NOW')
  {"$match":
    {"$expr":{
      "$lt": ["$dateofbirth", {"$subtract": ["$$NOW", 18*365.25*24*60*60*1000]}]
    }},
  },

  // Exclude fields to be filtered out by the view
  {"$unset": [
    "_id",
    "social_security_num",
  ]},    
];

```