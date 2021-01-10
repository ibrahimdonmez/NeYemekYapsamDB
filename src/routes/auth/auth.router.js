import express from 'express';
import config from '../../config';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../../models/User';

const route = () => {
    const router = new express.Router();
    router.route('/login').post((req,res) => {

        const {email, password} = req.body;

        User.findOne({ email: email}).then((user) => {
            console.log(req.body);
            if(!user) {
                res.send({
                    durum: false,
                    message: 'Böyle bir Email kayıtlı değil!'
                })
            }else {  
                if(user.password === crypto.createHmac('sha256',config.passSecret).update(password).digest('hex')) {
                    const token = jwt.sign({userID : user._id, userRole : user.role, userName: user.name, userFavoriteFood: user.favoriteFood}, config.jwtSecret);
    
                    User.update({email: email}, {
                        $set : {
                            lastLogin: new Date()
                        }
                    }).then(() => {});

                    res.send({
                        durum: true,    
                        token : token,
                        name: user.name,
                        role : user.role
                    })
                }
                else{
                    res.send({
                        durum:false,
                        message: 'Hatalı şifre girdiniz.'
                    })
                }
            }
        })
    })

    router.route('/sign-up').post((req,res) => {
        const{ name, email, password} = req.body;

        const passwordHashed = crypto.createHmac('sha256',config.passSecret).update(password).digest('hex');

        const newUser = new User({
            name: name,
            email : email,
            password : passwordHashed,
            role: 1,
            favoriteFood:"",
            dateCreated : new Date(),
            dateModified : new Date()
        });

        newUser.save().then(
            (data) => {
                res.send({durum: true, user: data});
            },
            (err) => {
                res.send({durum: false, error: err});
            }
        )
    })


    return router;
}



export default {
    route,
    routePrefix : `/${config.version}/auth`
}