require("dotenv").config();
const mongoose = require('mongoose');
const xlsx = require('xlsx');
const Goods = require('./model');

module.exports.goodsSearch = async (req, res) => {
    const searchInput = req.query.search || '';

    try {
      if(searchInput != ''){
        const products = await Goods.find({
          $or: [
            { name: { $regex: new RegExp(`^${searchInput}`, 'i')} },
            { translatedName: { $regex: new RegExp(`^${searchInput}`, 'i')} }
          ]
        });
        res.json(products);
      }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




// async function insertDataInBatches(excelData) {
//   const totalDocuments = excelData.length;

//   console.log(totalDocuments);

//   for (let i = 0; i < 205; i++) {
//       const goods = await Goods.create({
//           name: excelData[i][0],
//           translatedName: excelData[i][1],
//           type: excelData[i][2],
//           amount: 1,
//           calories: excelData[i][3],
//           protein: excelData[i][4],
//           fat: excelData[i][5],
//           carbohydrates: excelData[i][6],
//           weight: excelData[i][7],
//       });
//   }
// }

// const workbook = xlsx.readFile('/Users/markoholiak/Documents/proj/healthy/server/src/domains/goods/db.xlsx');
// if (!workbook) console.log("no file!!!!!!!!!!!!!!!!!!");

// const sheetName = workbook.SheetNames[0];
// const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

// mongoose.connect("mongodb+srv://list_user:user123@cluster0.f88bnq0.mongodb.net/healthy-to-day?retryWrites=true&w=majority", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => {
//         console.log('Connected to MongoDB');
//         return insertDataInBatches(excelData);
//     })
//     .catch((error) => {
//         console.error('Error connecting to MongoDB:', error);
//     })
//     .finally(() => {
//         mongoose.disconnect();
//         console.log('Disconnected from MongoDB');
//     });