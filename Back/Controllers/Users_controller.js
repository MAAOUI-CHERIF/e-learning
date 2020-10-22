const data = require('../Data/Data')
const UserModel = require('../Sources/Models/UsersModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const env = require('dotenv').config();


module.exports = {
    getUser(req, res){
        const id = req.params.id
        UserModel.findOne({name:id}).then((user)=>{
            res.send(user)
            console.log(req.body)
        })
    },
    getAllUsers(req,res){
        UserModel.find().then((users)=>{
            res.send(users)
        })
    },
    createUser(req,res){
        const newUser = new UserModel({
            name: req.body.name,
            firstname:req.body.firstname,
            mail: req.body.mail,
            password : req.body.password
        })
        newUser.save();
    },
    deleteUser(req,res){
        const id = req.params.id;
        UserModel.findOne({name:id}).then((user)=>{
            user.remove();
        })
    },
    updateUser(req,res){
        const id = req.params.id;
        UserModel.findOne({name:id}).then((user)=>{
            user.set('name', req.body.name);
            user.set('firstname', req.body.firstname);
            user.set('mail', req.body.mail);
            user.save();
        })
    },
     checkUser(req,res){
        UserModel.findOne({mail: req.body.mail}).then(async(user)=>{

           if(user == null){
              return res.status('400').send("Pas d'utilisateur avec cet email")
           }else{
                await bcrypt.compare(req.body.password, user.password, (err,resp)=>{
                    if(err){
                        res.send('erreur:'+err)
                    }else if(resp){
                        const accessToken =  jwt.sign(user.toJSON(),`${process.env.SECRET_TOKEN_ACCESS}`)
                        res.json({accessToken: accessToken})

                    }else{
                        res.send('Mauvais mot de passe')
                    }
                })
           }
        })


    }

}