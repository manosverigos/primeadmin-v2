const {
  MongoClient
} = require("mongodb");

const uri =
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.pbkow.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`;
  
exports.addOffer = async (req, res) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const data = req.body;


  if(data.type == 'time'){
    let products = data.products
    data.products = [{
      desc: products
    }]
  }

  for( product of data.products) {
    product.status = 'not-overdue'
    product.warning = 'false'
  }
 
  if(!data.startDate) {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    data.startDate = today
  }

  try {
    await client.connect();
    const database = client.db('eshop');
    const collection = database.collection('test_offers');

    const result = await collection.insertOne(data)
  } catch {
    console.log('oops')
  } finally {
    await client.close();
    res.redirect('/offers')
  }
}