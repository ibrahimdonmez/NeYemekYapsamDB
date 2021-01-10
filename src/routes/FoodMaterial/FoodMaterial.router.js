import express from 'express';
import config from '../../config';
import FoodMaterial from '../../models/FoodMaterial';

const route = () => {
    const router = new express.Router();

    router.route('/getFoodMaterial').post((req, res) => {
        FoodMaterial.find({}).then((foodMaterial) => {
            res.send({
                durum: true,
                data: foodMaterial
            })
        })
    })
    
    router.route('/addFoodMaterial').post((req, res) => {

        const { foodMaterial } = req.body;

        const newFoodMaterial = new FoodMaterial({
            foodMaterial: foodMaterial,
            dateCreated: new Date(),
            dateModified: new Date()
        });

        newFoodMaterial.save().then(
            (data) => {
                res.send({ durum: true, foodMaterial: data });
            },
            (err) => {
                res.send({ durum: false, error: err });
            }
        )
    })

    router.route('/deleteFoodMaterial').post((req, res) => {
        
        const {_id, foodMaterial} = req.body;
        FoodMaterial.deleteOne({ _id: _id }).then((foodMaterial) => {
            if (foodMaterial) {
                res.send({
                    durum: true,
                    message: 'Böyle bir yemek malzemesi kayıtlı değil!',
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
    routePrefix: `/${config.version}/FoodMaterial`
}