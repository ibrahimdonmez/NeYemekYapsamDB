import express from 'express';
import config from '../../config';
import feedBack from '../../models/feedBack';

const route = () => {
    const router = new express.Router();

    router.route('/getFeedBacks').post((req, res) => {

        feedBack.find({}).then((feedBack) => {
            res.send({
                durum: true,
                data: feedBack
            })
        })
    })
    
    router.route('/addfeedBack').post((req, res) => {

        const { name, mail, message } = req.body;

        const newfeedBack = new feedBack({
            name: name,
            mail: mail,
            message: message,
            dateCreated: new Date(),
            dateModified: new Date()
        });

        newfeedBack.save().then(
            (data) => {
                res.send({ durum: true, feedBack: data });
            },
            (err) => {
                res.send({ durum: false, error: err });
            }
        )
    })

    router.route('/deleteFeedBack').post((req, res) => {
        
        const {_id, message} = req.body;
        feedBack.deleteOne({ _id: _id }).then((feedBack) => {
            if (feedBack) {
                res.send({
                    durum: true,
                    message: 'Böyle bir Geribildirim kayıtlı değil!',
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
    routePrefix: `/${config.version}/feedBack`
}