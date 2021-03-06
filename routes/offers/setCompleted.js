const mongodb = require('mongodb');
const {
  MongoClient
} = require("mongodb");

const uri =
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.pbkow.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`;

exports.setCompleted =  async (req, res) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const id = req.query.id
  const prodid = req.query.prodid
  const type = req.query.type
  const o_id = new mongodb.ObjectID(id);
  try {
    await client.connect();
    const database = client.db('eshop');
    const collection = database.collection('test_offers');

    const filter = {
      "_id": o_id
    }

    const offer = await collection.findOne(filter)
    const prods = offer.products

    let newProds = []
    for(prod of prods) {
      if(type == 'sale') {
        if (prod.productID == prodid){
          prod.status = 'complete'
        }
      } else if (type == 'time'){
        prod.status = 'complete'
      }
      newProds.push(prod)
    }
    
    const updateDoc = {
      $set: {
        products: newProds
      }
    }

    const result = await collection.updateOne(filter, updateDoc);
  } catch {
    console.log('oops')
  } finally {
    await client.close();
    res.redirect('/offers')
  }
  // db.loadDatabase()
  // db.update({
  //   _id: id
  // }, {
  //   $set: {
  //     completed: true,
  //     overdue: false
  //   }
  // }, (err, numReplaced) => {
  // })
}