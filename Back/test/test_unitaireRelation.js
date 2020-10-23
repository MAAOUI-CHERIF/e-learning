const assert = require("assert");
const { userInfo } = require("os");
const UserModel = require("../Sources/Models/UsersModels")

describe("Test de relation", () => {

    it("Test de relation Utilisateur/cours", (done => {
        const firstUser = new UserModel({
            name: "Toifo",
            firstname: "ioijoji",
            mail: "ojfojo@iojo.com",
            age: 25,
            courses: [{
                name: "MongoDB pour les nuls",
                difficulty: "Facile",
                description: "joiodIJODIJOIJOJOIJ"
            },
            {
                name:"Le django argentin",
                difficulty:"Moyen",
                description:"oijoijijoijijoij"
            }
            ]
        })
        firstUser.save().then(()=>{
            UserModel.findOne({name:"Toifo"})
            .then((userFound)=>{
                assert(userFound.courses.length === 2);
                done();
            })

        })
    }))
    it("Test d'ajout de cours à un utilisateur", (done => {
        const firstUser = new UserModel({
            name: "Toifo",
            firstname: "ioijoji",
            mail: "ojfojo@iojo.com",
            age: 25
        })
        firstUser.courses.push({name:"Le Django argentin",difficulty:"Moyen",description:"huifnohuiiuh"})
        firstUser.save().then(()=>{
            UserModel.findOne({name:"Toifo"})
            .then((userFound)=>{
                assert(userFound.courses.length === 1);
                done();
            })

        })
    }))
    it("Test de supression d'un cours d'un utilisateur", (done => {
        const firstUser = new UserModel({
            name: "Toifo",
            firstname: "ioijoji",
            mail: "ojfojo@iojo.com",
            age: 25,
            courses: [{
                name: "MongoDB pour les nuls",
                difficulty: "Facile",
                description: "joiodIJODIJOIJOJOIJ"
            },
            {
                name:"Le django argentin",
                difficulty:"Moyen",
                description:"oijoijijoijijoij"
            }
            ]
        })
        firstUser.courses[0].remove()
        firstUser.save().then(()=>{
            UserModel.findOne({name:"Toifo"})
            .then((userFound)=>{
                assert(userFound.courses.length === 1);
                userFound.nickname = "Green";
                done();
            })

        })
    }))
})