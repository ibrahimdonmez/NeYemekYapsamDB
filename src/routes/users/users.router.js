import express from 'express';
import config from '../../config';
import User from '../../models/User';

const route = () => {
    const router = new express.Router();
    router.route('/getUserList').post((req, res) => {
        User.find({}).then((user) => {
            res.send({
                durum: true,
                data: user
            })
        })
    })

    router.route('/changeFavoriteFood').post((req, res) => {

         
        const {_id, favoriteFood} = req.body;

        var myquery = { _id: _id };
        var newvalues = { $set: {favoriteFood: favoriteFood } };
        User.updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
        });
    })

    router.route('/deleteUser').post((req, res) => {
        
        const {_id, email} = req.body;
        User.deleteOne({ _id: _id }).then((user) => {
            console.log(req.body);
            console.log(_id);
            if (user) {
                res.send({
                    durum: true,
                    message: 'Böyle bir Email kayıtlı değil!',
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
    routePrefix: `/${config.version}/users`
}