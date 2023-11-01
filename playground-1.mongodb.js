use('test')

db.sample.insertMany([{
  orderId: 'AB12345', products: ["Laptop", "Kettle", "Phone", "Microwave"],
  orderId: 'AB12345', products: ["Laptop", "Kettle", "Phone", "Microwave"],
  orderId: 'AB12345', products: ["Laptop", "Kettle", "Phone", "Microwave"],
}])

db.sample.aggregate([
  // {$group: {}}
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
