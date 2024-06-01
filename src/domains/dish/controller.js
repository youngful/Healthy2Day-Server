require("dotenv").config();
const Dish = require('./model');
const Goods = require("../goods/model");

// module.exports.createDish = async (req, res) => {
//     const [{ name, type, goods, description }]= req.body;

//     try {
//         const dishGoods = await Promise.all(
//             goods.map(async (product) => {
//                 const { name: goodsName, amount } = product;
//                 const dbGoods = await Goods.findOne({
//                     $or: [
//                         { name: goodsName },
//                         { translatedName: goodsName }
//                     ]
//                 });

//                 if (dbGoods) {
//                     let dataCoef = 0;
//                     if (dbGoods.type === "g" || dbGoods.type === "ml") {
//                         dataCoef = amount / 100;
//                     } else if (dbGoods.type === "p") {
//                         dataCoef = amount;
//                     } else {
//                         dataCoef = 0;
//                     }
                    
//                     return {
//                         name: dbGoods.name,
//                         translatedName: dbGoods.translatedName,
//                         type: dbGoods.type,
//                         amount: amount,
//                         calories: dataCoef * dbGoods.calories,
//                         protein: dataCoef * dbGoods.protein,
//                         fat: dataCoef * dbGoods.fat,
//                         carbohydrates: dataCoef * dbGoods.carbohydrates,
//                     };
//                 } else {
//                     console.error(`Product not found: ${goodsName}`);
//                     return null;
//                 }
//             })
//         );

//         const validDishGoods = dishGoods.filter((product) => product !== null);

//         const dish = await Dish.create({
//             name,
//             type,
//             goods: validDishGoods,
//             description,
//         });

//         res.json(dish);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };


module.exports.createDish = async (req, res) => {
    const dishes = req.body;

    try {
        const createdDishes = await Promise.all(
            dishes.map(async (dishData) => {
                const {img, name, type, goods, description } = dishData;

                const dishGoods = await Promise.all(
                    goods.map(async (product) => {
                        let { name: goodsName, amount} = product;
                        const dbGoods = await Goods.findOne({
                            $or: [
                                { name: goodsName },
                                { translatedName: goodsName }
                            ]
                        });

                        if (dbGoods) {
                            let dataCoef = 0;
                            if (dbGoods.type === "g" || dbGoods.type === "ml") {
                                dataCoef = amount / 100;
                            } else if (dbGoods.type === "p") {
                                dataCoef = amount;
                                amount *= dbGoods.weight;
                            } else {
                                dataCoef = 0;
                            }

                            return {
                                name: dbGoods.name,
                                translatedName: dbGoods.translatedName,
                                type: dbGoods.type,
                                weight: amount,
                                calories: dataCoef * dbGoods.calories,
                                protein: dataCoef * dbGoods.protein,
                                fat: dataCoef * dbGoods.fat,
                                carbohydrates: dataCoef * dbGoods.carbohydrates,
                            };
                        } else {
                            console.error(`Product not found: ${goodsName}`);
                            return null;
                        }
                    })
                );

                const validDishGoods = dishGoods.filter((product) => product !== null);

                return Dish.create({
                    img,
                    name,
                    type,
                    goods: validDishGoods,
                    description,
                });
            })
        );

        res.json(createdDishes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.get_dishes = async (req, res) => {
    const type = req.query.type

    try {
        const dishes = await Dish.find({ type: type }).exec();

        res.json(dishes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}