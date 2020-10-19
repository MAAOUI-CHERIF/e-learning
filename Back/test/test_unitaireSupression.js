const assert = require("assert");
const UserModel = require("../Sources/Models/UsersModels");


describe("Test de supression d'utilisateur",()=>{
    let user;
    beforeEach((done)=>{                           //On créé un utilisateur avant chaque test de ce describe car le test de connexions les supprime avant chaque test. On s'assure ainsi qu'il y ait  toujours un utilisateur pour réaliser le test.

        user = new UserModel({
            name: "Gilliot",
            firstname: "Mathieu",
            mail: "jfjfjeijfiejfoijj@jfjfh.fr",
            age:18
        })
        user.save().then(()=>{
            done();
        })
    })

    function assertSupression (promise, done){
        promise.then(()=>{
            UserModel.findOne({firstname:"Mathieu"}).then((userFound)=>{
                assert(userFound === null)
                done();
            })
        })
    }

    it("Supression d'un utilisateur par son instance",(done)=>{
        assertSupression(user.remove(),done)
    })

    it("Supression d'un utilisateur par son Modèle",(done)=>{
       assertSupression(UserModel.deleteMany({name:"Gilliot"}),done)
    })

    it("Supression du premier utilisateur par son nom",(done)=>{
        assertSupression(UserModel.findOneAndDelete({name:"Gilliot"}),done)
    })

    it("Supression d'un utilisateur par son ID",(done)=>{
        assertSupression(UserModel.findByIdAndDelete(user._id),done)
        console.log("    C'est bon, ça supprime!")
    })

    });
