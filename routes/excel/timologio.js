var nodemailer = require("nodemailer");
const excel = require("excel4node");
const path = require("path");

exports.computeExcelTimologio = async (req, res) => {
  try {
    const email = req.body.email;
    const profit = req.body.profit;
    const productsArray = req.body.products;
    let yeb = req.body.yeb;
    if(yeb === '') {
      yeb = 0
    }

    let newProductsArray = [];

    for (product of productsArray) {
      let newProductJSON = {  };
      const vat = calculateVat(product.vat)
      newProductJSON.codeSoft1 = product.codeSoft1
      newProductJSON.description = product.description
      newProductJSON.finalSellingPrice = (product.finalPurchasePrice * (1-yeb/100) * (profit /100 +1) * (vat/100 + 1)).toFixed(2)
      newProductJSON.webDiscount = ((1-newProductJSON.finalSellingPrice / product.salePrice) *100).toFixed(2)
      newProductsArray.push(newProductJSON);
    }

    await createExcelFileTimologio(newProductsArray);
    await sendEmailTimologio(email,res);

  } catch (err) {
    console.log(err);
    res.json({ message: "oops" });
  }
};

calculateVat = (vatString) => {
  const vatPercentageString = vatString.split(' ')[1]
  const vatNumber = vatPercentageString.split('%')[0]
  return parseInt(vatNumber)
}

createExcelFileTimologio = async (productArray) => {
  let workbook = new excel.Workbook();
  let worksheet = workbook.addWorksheet("Υπολογισμένο Τιμολόγιο");
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
  
  await workbook.write("timologio.xlsx");
};

sendEmailTimologio = async (email,res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${process.env.EMAIL_USERNAME}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  });
  let mail_list = [email];
  const pathToFile = path.resolve("./timologio.xlsx");
  const mailOptions = {
    from: "info@primepharmacy.gr",
    to: mail_list,
    subject: `Τιμολόγιο`,
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
