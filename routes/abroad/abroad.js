exports.computeExcel = async (req, res) => {
  try {
    const email = req.body.email;
    const profit = req.body.profit;
    const productsArray = req.body.products;
    
    res.end();
  } catch {
    res.json("oops");
  }
};
