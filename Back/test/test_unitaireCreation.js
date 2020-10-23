const assert = require("assert");
const UserModel = require("../Sources/Models/UsersModels");


describe("Test de création d'utilisateur",()=>{
    it("Sauvegarde d'un utilisateur",(done)=>{
        const firstUser = new UserModel({
            name: "oinoi",
            firstname: 'oijoijoij',
            mail:'jfjfjeijfiejfoijj@jfjfh.fr',
            age: 18
        })
        firstUser.save().then(()=>{
           assert(!firstUser.isNew);
           done();
           console.log("    C'est bon, ça enregistre!")
        });
    })
})