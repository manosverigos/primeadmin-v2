const {
  MongoClient
} = require("mongodb");

const uri =
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.pbkow.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`;
  
exports.getTimeOffers = async (req, res) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  generateNewResult = (result, queryArray) => {
    let finalArray = []
    for (offer of result) {
      let offerList = []
      for(q of queryArray){
        offerList = offerList.concat(offer.products.filter(obj => obj.status == q))
      }
      if (offerList.length != 0){
        let offerToSend={};
        offerToSend._id = offer._id
        offerToSend.title = offer.title
        offerToSend.type = offer.type
        offerToSend.startDate = offer.startDate
        if(offer.endDate){
          offerToSend.endDate = offer.endDate
        }
        offerToSend.comment = offer.comment
        offerToSend.products = offerList
        finalArray.push(offerToSend)
      }
    }
    return finalArray
  }

  try {
    await client.connect();
    const database = client.db('eshop');
    const collection = database.collection('test_offers');

    let result = await collection.find({}).toArray()

    result = result.filter(obj => obj.type == 'time')

    result.reverse()
    let _result = [];
    let filter = req.query.filter
    let queryArray;

    if(filter == 'not-completed'){
      queryArray = ['not-overdue', 'overdue']
    } else if (filter == 'completed'){
      queryArray = ['complete']
    } else if (filter == 'all'){
      queryArray = ['not-overdue', 'overdue','completed']
    }

    _result = generateNewResult(result, queryArray)

    _result = _result.filter(obj => obj.type == 'time')
    
    res.json({
      "result": _result
    });
  } catch(error) {
    console.log('oops')
    console.log(error)
    res.end()
  } finally {
    await client.close();
  }
}
  // db.loadDatabase()
  // db.find({}, (err, data) => {
  //   if (err) {
  //     res.send('Error')
  //     return
  //   }  
  // })
