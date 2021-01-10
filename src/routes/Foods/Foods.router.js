import express from 'express';
import config from '../../config';
import Food from '../../models/Food';

const route = () => {
    const router = new express.Router();

    router.route('/getFoodList').post((req, res) => {

        Food.find({}).then((food) => {
            res.send({
                durum: true,
                data: food
            })
        })
    })

    router.route('/getFood').post((req, res) => {
        const { foodMaterials, userFavoriteFood } = req.body;
        console.log(userFavoriteFood);
        var match = 0;
        var MatchFoods = [];
        Food.find({}).sort(  { category: 1 }  ).then((food) => {
            for (var i = 0; i < food.length; i++) {
                for (var j = 0; j < foodMaterials.length; j++) {
                    // console.log(food[i].materials[j] + " - " + foodMaterials[j]);
                    for (var z = 0; z < foodMaterials.length; z++) {
                        if (food[i].materials[j] === foodMaterials[z]) {
                            match++;
                            // console.log(food[j].materials[j] + " - " + foodMaterials[j]);
                        }
                    }
                }
                if(match == food[i]. materials.length ){
                    MatchFoods.push(food[i]);
                    //console.log ( food[i].foodName + " Yemeği Yapılabilir");
                }
                match = 0;
                // if (food[i].materials === obj) {
                //     return true;
                // }
            }

            res.send({
                durum: true,
                data: MatchFoods
            })
        })

    })

    router.route('/getFoodDetail').post((req, res) => {
        const { _id, foodName } = req.body;

        Food.findOne({ _id: _id }).then((foodDetail) => {
            res.send({
                durum: true,
                data: foodDetail
            })
        })
    })

    router.route('/addFood').post((req, res) => {

        const { foodName, category, calories, time, image, portion, recipe, materials } = req.body;

        const newFood = new Food({
            foodName: foodName,
            category: category,
            calories: calories,
            time: time,
            image: image,
            portion: portion,
            recipe: recipe,
            materials: materials,
            dateCreated: new Date(),
            dateModified: new Date()
        });

        newFood.save().then(
            (data) => {
                res.send({ durum: true, food: data });
            },
            (err) => {
                res.send({ durum: false, error: err });
            }
        )
    })

    router.route('/deleteFood').post((req, res) => {

        const {_id, foodName} = req.body;
        Food.deleteOne({ _id: _id }).then((food) => {
            if (food) {
                res.send({
                    durum: true,
                    message: 'Böyle bir yemek kayıtlı değil!',
                })
            }
            else {
                res.send({
                    durum: false,
                    message: 'Bir hata oldu.'
                })
            }

        })
    })

    return router;
}



export default {
    route,
    routePrefix: `/${config.version}/Foods`
}