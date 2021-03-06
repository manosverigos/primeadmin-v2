const mongodb = require('mongodb');
const {
  MongoClient
} = require("mongodb");
const {
  editOffer
} = require('../../html_templates/edit.js');

const uri =
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.pbkow.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`;

exports.getEditPage = async (req, res) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const id = req.query.id
  const o_id = new mongodb.ObjectID(id);
  try {
    await client.connect();
    const database = client.db('eshop');
    const collection = database.collection('test_offers');
    const result = await collection.findOne({'_id': o_id})
    const html = editOffer(result)
    res.setHeader('Content-type', 'text/html')
    res.send(html)
  } catch {
    console.log('oops')
    res.end()
  } finally {
    await client.close();
  }
}