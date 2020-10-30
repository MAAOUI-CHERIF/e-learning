const data = require('../Data/Data')
const UserModel = require('../Sources/Models/UsersModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();


module.exports = {
    getUser(req, res){
        UserModel.findOne({mail:req.user.mail}).then((user)=>{
            res.send(user)
        })
    },
    getAllUsers(req,res){
        UserModel.find().then((users)=>{
            res.send(users)
        })
    },
    createUser(req,res){
        if(req.body.name !== '' && req.body.firstname !== '' && req.body.mail !=='' && req.body.password !== ''){
        const newUser = new UserModel({
            name: req.body.name,
            firstname:req.body.firstname,
            mail: req.body.mail,
            password : req.body.password
        })
        newUser.save((err,user)=>{
            if(err){
                res.sendStatus(400)
            }else{
                res.sendStatus(201)
            }
        });
    }else{

        res.sendStatus(406);
    }
    },
    deleteUser(req,res){
        UserModel.findOne({mail:req.user.mail}).then((user)=>{
            if(user == null){
                res.sendStatus(401)
            }else{
                user.remove((err,user)=>{
                    if(err){
                        res.sendStatus(500)
                    }else{
                        res.sendStatus(201)
                    }
                })
            }
        })
    },
    updateUserEmail(req,res){

        UserModel.findOne({mail:req.user.mail }).then((user)=>{
            if(user == null){
                res.sendStatus(401)
            }else if(req.body.mail !== req.user.mail){
                res.sendStatus(403)
            }else{
                user.set('mail', req.body.newMail);
            }
            user.save((err,user)=>{
                if(err){
                    console.log(err)
                    res.sendStatus(500)
                }else{
                    res.sendStatus(201)
                }
            });
        })
    },
    updateUserPassword(req,res){
        UserModel.findOne({mail:req.user.mail }).then(async(user)=>{
            
            if(user == null){
                res.sendStatus(401)
            }else{
                await bcrypt.compare(req.body.mail, user.password,(err,resp)=>{
                    if(err){
                        res.sendStatus(403)
                    }else{
                        user.set('password', req.body.password);
                        user.save((err,user)=>{
                            if(err){
                                res.sendStatus(500)
                            }else{
                                res.sendStatus(201)
                            }
                        })
                    }
                })
            
            }
        })},
     checkUser(req,res){
        UserModel.findOne({mail: req.body.mail}).then(async(user)=>{

           if(user == null){
               res.sendStatus(400).send("Pas d'utilisateur avec cet email")
           }else{
                await bcrypt.compare(req.body.password, user.password,(err,resp)=>{
                    if(err){
                        res.send('erreur:'+err)
                    }else if(resp){
                        const accessToken =  jwt.sign(user.toJSON(),"process.env.SECRET_TOKEN_ACCESS")
                        res.send({accessToken: accessToken})
                    }else{
                        res.send('Mauvais mot de passe')
                    }
                })
           }
        })
    },
    authenticatedToken(req,res,next){
        const headerAuth = req.header('Authorization');
        const token = headerAuth && headerAuth.split(' ')[1]
        if(token == null || token == "undefined"){
          return  res.sendStatus(401)
        }
        jwt.verify(token,'process.env.SECRET_TOKEN_ACCESS',(err,decoded)=>{
            if(err){
                console.log(err)
                return res.sendStatus(403)
            }else{
                req.user = decoded;
                next();
            }
        } )
    }
}