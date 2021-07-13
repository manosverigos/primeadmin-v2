const fetch = require("node-fetch");
var nodemailer = require("nodemailer");
const excel = require("excel4node");
const path = require("path");

exports.computeExcelAbroad = async (req, res) => {
  try {
    const email = req.body.email;
    const profit = req.body.profit;
    const productsArray = req.body.products;
    const currencyRates = await getCurrencyRates();
    let newProductsArray = [];

    for (product of productsArray) {
      let newProductJSON = { ...product };
      newProductJSON.finalPurchasePrice =
        product.wholesalePrice * (1 - product.purchaseDiscount / 100);
      newProductJSON.profit =
        newProductJSON.finalPurchasePrice * (1 + profit / 100);
      newProductJSON.pricePlusBag =
        newProductJSON.profit * (1 + newProductJSON.vat / 100) + 0.25;
      newProductJSON.ebay = newProductJSON.pricePlusBag * 0.1;
      newProductJSON.payPal =
        (newProductJSON.ebay + newProductJSON.pricePlusBag) * 0.04 + 0.45;
      newProductJSON.sellingPriceEUR =
        (newProductJSON.pricePlusBag +
        newProductJSON.ebay +
        newProductJSON.payPal).toFixed(2);
      newProductJSON.sellingPriceGBP =
        (newProductJSON.sellingPriceEUR * 1.2 * currencyRates.EURGBP).toFixed(2);
      newProductJSON.sellingPriceUSD =
        (newProductJSON.sellingPriceEUR * currencyRates.EURUSD).toFixed(2);
      newProductJSON.sellingPriceJPY =
        (newProductJSON.sellingPriceEUR * currencyRates.EURJPY).toFixed(2);
        newProductJSON.sellingPricePLN =
        (newProductJSON.sellingPriceEUR * currencyRates.EURPLN).toFixed(2);
        newProductJSON.sellingPriceSEK =
        (newProductJSON.sellingPriceEUR * currencyRates.EURSEK).toFixed(2);
      newProductsArray.push(newProductJSON);
    }
    await createExcelFileAbroad(newProductsArray);
    await sendEmailAbroad(email,res);

  } catch (err) {
    console.log(err);
    res.json({ message: "oops" });
  }
};

getCurrencyRates = async () => {
  let currencyRates = {};
  const url = `http://api.currencylayer.com/live?access_key=${process.env.CURRENCY_API_KEY}&currencies=GBP,EUR,JPY,PLN,SEK&format=1`;

  const response = await fetch(url);
  const data = await response.json();
  const rates = data.quotes;
  currencyRates.EURUSD = 1 / rates.USDEUR;
  currencyRates.EURGBP = rates.USDGBP / rates.USDEUR;
  currencyRates.EURJPY = rates.USDJPY / rates.USDEUR;
  currencyRates.EURPLN = rates.USDPLN / rates.USDEUR;
  currencyRates.EURSEK = rates.USDSEK / rates.USDEUR;
  return currencyRates;
};

createExcelFileAbroad = async (productArray) => {
  let workbook = new excel.Workbook();
  let worksheet = workbook.addWorksheet("Τιμές Προϊόντων Εξωτερικού");
  let style = workbook.createStyle({
    font: {
      color: "#000000",
      size: 12,
    },
    numberFormat: "$#,##0.00; ($#,##0.00); -",
  });

  for (j = 0; j < Object.keys(productArray[0]).length; j++) {
    worksheet
      .cell(1, j + 1)
      .string(Object.keys(productArray[0])[j].toString())
      .style(style);
  }
  for (i = 0; i < productArray.length; i++) {
    for (j = 0; j < Object.keys(productArray[i]).length; j++) {
      worksheet
        .cell(i + 2, j + 1)
        .string(productArray[i][Object.keys(productArray[i])[j]].toString())
        .style(style);
    }
  }
  
  await workbook.write("abroadProducts.xlsx");
};

sendEmailAbroad = async (email,res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${process.env.EMAIL_USERNAME}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  });
  let mail_list = [email];
  const pathToFile = path.resolve("./abroadProducts.xlsx");
  const mailOptions = {
    from: "info@primepharmacy.gr",
    to: mail_list,
    subject: `Τιμές Προϊόντων Εξωτερικού`,
    attachments: [
      {
        path: pathToFile,
      },
    ],
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.json({ message: "oops" });
    } else {
      console.log("Email sent: " + info.response);
      res.json({ message: "success" });
    }
  });
};
