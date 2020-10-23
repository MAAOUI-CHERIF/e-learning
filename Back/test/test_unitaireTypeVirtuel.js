const assert = require("assert");
const UserModel = require("../Sources/Models/UsersModels");


describe("Test de type virtuel",()=>{
    it("Test du type virtuel countCourses ",(done)=>{
        const firstUser = new UserModel({
            name: "oinoi",
            firstname: 'oijoijoij',
            mail:'jfjfjeijfiejfoijj@jfjfh.fr',
            age: 18,
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
        firstUser.save()
        .then(()=>{
            UserModel.findOne({name:"oinoi"})
            .then((userFound)=>{
                assert(userFound.countCourses === 2);
                done();
            })
        })
    })
})