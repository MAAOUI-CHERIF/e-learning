const data = require('../Data/Data')
const UserModel = require('../Sources/Models/UsersModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();


module.exports = {
    getUser(req, res){
        const id = req.params.id
        UserModel.findOne({_id :id}).then((user)=>{
            res.send(user)
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
        newUser.save((err,user)=>{
            if(err){
                res.send(`Utilisateur non créé. Tous les champs doivent être complétés et  ${err.keyValue.mail} ne doit pas correspondre à compte existant`)
            }else{
                res.send(`Utilisateur ${req.body.name} créé`)
            }
        });
    },
    deleteUser(req,res){
        const id = req.params.id;
        UserModel.findOne({_id:id}).then((user)=>{
            res.send(`Utilisateur ${user.name} supprimé`)
            user.remove();
        })
    },
    updateUser(req,res){
        const id = req.params.id;
        UserModel.findOne({_id :id}).then((user)=>{
            user.set('name', req.body.name);
            user.set('firstname', req.body.firstname);
            user.set('mail', req.body.mail);
            user.set('password',req.body.password)
            user.save();
            res.end('Utilisateur mis à jour')
        })
    },
     checkUser(req,res){
        UserModel.findOne({mail: req.body.mail}).then(async(user)=>{

           if(user == null){
              return res.sendStatus(400).send("Pas d'utilisateur avec cet email")
           }else{
                await bcrypt.compare(req.body.password, user.password,(err,resp)=>{
                    if(err){
                        res.send('erreur:'+err)
                    }else if(resp){
                        const accessToken =  jwt.sign(user.toJSON(),process.env.SECRET_TOKEN_ACCESS)
                        res.json({accessToken: accessToken})
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
        jwt.verify(token,process.env.SECRET_TOKEN_ACCESS,(err,decoded)=>{
            if(err){
                return res.sendStatus(403)
            }else{
                req.user = decoded;
                next();
            }
        } )
    }
}