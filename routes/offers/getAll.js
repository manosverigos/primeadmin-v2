const mongodb = require('mongodb');
const {
  MongoClient
} = require("mongodb");

const uri =
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.pbkow.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`;
  
exports.getAllOffers = async (req, res) => {
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

    let search = req.query.search
    let result = [];
    if(search) {
      result = await collection.find({$text: {$search: search}}).toArray()
      
      if(mongodb.ObjectID.isValid(search)){
        const o_id = new mongodb.ObjectID(search);
        let search_by_id = await collection.findOne({"_id": o_id})
        result.push(search_by_id)
      }

    }else{
      result = await collection.find({}).toArray()
    }

    result.reverse()
    let _result = [];
    let filter = req.query.filter
    let queryArray;

    if(filter == 'not-completed'){
      queryArray = ['not-overdue', 'overdue']
    } else if (filter == 'completed'){
      queryArray = ['complete']
    } else if (filter == 'all'){
      queryArray = ['not-overdue', 'overdue','complete']
    }

    _result = generateNewResult(result, queryArray)
    
    const pageCount = Math.ceil(_result.length / 10);
    let page = parseInt(req.query.p);
    if (!page ) { page = 1;}
    if (page > pageCount) {
      page = pageCount
    }
    let finalResult = _result.slice(page * 10 - 10, page * 10)
    res.json({
      "page": page,
      "pageCount": pageCount,
      "result": finalResult
    });
  } catch(error) {
    console.log('oops')
    console.log(error)
    res.end()
  } finally {
    await client.close();
  }
}

