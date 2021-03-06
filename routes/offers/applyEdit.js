const mongodb = require('mongodb');
const {
  MongoClient
} = require("mongodb");

const uri =
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.pbkow.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`;

exports.applyEdit = async (req, res) => {
  const data = req.body;
  console.log(data)
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
    for(prod of prods) {
      if(data.products.filter( obj => obj.productID == prod.productID)[0]){
        let newProdData = data.products.filter( obj => obj.productID == prod.productID)[0]
        prod.desc = newProdData.desc
        prod.sales_num = newProdData.sales_num
        newProds.push(prod)
      }
    }
    console.log(prods.length)
    console.log(newProds.length)
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
  //   _id: data._id
  // }, {
  //   $set: info
  // }, (err, numReplaced) => {})
  // res.redirect('/offers')
  // //res.redirect('/offers')
}