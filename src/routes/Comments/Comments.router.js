import express from 'express';
import config from '../../config';
import Comment from '../../models/Comment';

const route = () => {
    const router = new express.Router();
    
    router.route('/getComments').post((req, res) => {
        const {_id, foodName} = req.body;
        Comment.find({foodID: _id}).then((Comment) => {
            res.send({
                durum: true,
                data: Comment
            })
        })
    })

    router.route('/addComment').post((req, res) => {

         const { foodid, user, comment } = req.body;

        const newComment = new Comment({
            foodID: foodid,
            userName: user,
            Comment: comment,
            dateCreated: new Date(),
        });

        newComment.save().then(
            (data) => {
                res.send({ durum: true, Comment: data });
            },
            (err) => {
                res.send({ durum: false, error: err });
            }
        )
    })

    router.route('/deleteComment').post((req, res) => {
        
        const {_id} = req.body;
        Comment.deleteOne({ _id: _id }).then((comment) => {
            if (comment) {
                res.send({
                    durum: true,
                    message: 'Başarıyla Kaydedildi.',
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
    routePrefix: `/${config.version}/Comments`
}