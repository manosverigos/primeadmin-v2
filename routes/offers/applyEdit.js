const mongodb = require('mongodb');
const {
  MongoClient
} = require("mongodb");

const uri =
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.pbkow.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`;

exports.applyEdit = async (req, res) => {
  const data = req.body;
  const id = data._id
  const o_id = new mongodb.ObjectID(id);

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  let info = {
    title: data.title,
    comment: data.comment
  }

  if(data.startDate) {
    info.startDate = data.startDate
  }
  if (data.endDate) {
    info.endDate = data.endDate
  } 

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
    if(offer.type == 'sales'){
      for(prod of data.products) {
        let oldProd = prods.filter(obj => obj.productID == prod.productID)[0]
        oldProd.desc = prod.desc
        oldProd.sales_num = prod.sales_num
        newProds.push(oldProd)
      }
    } else if (offer.type == 'time') {
        let oldProd = prods[0]
        oldProd.desc = data.products
        newProds.push(oldProd)
    }
  
    info.products = newProds
    const updateDoc = {
      $set: info
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
  //   _id: data._id
  // }, {
  //   $set: info
  // }, (err, numReplaced) => {})
  // res.redirect('/offers')
  // //res.redirect('/offers')
}