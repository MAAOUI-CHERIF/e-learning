const assert = require("assert");
const UserModel = require("../Sources/Models/UsersModels");


describe("Test de lecture d'utilisateur",()=>{
    let user;
    beforeEach((done)=>{                           //On créé un utilisateur avant chaque test de ce describe car le test de connexions les supprime avant chaque test. On s'assure ainsi qu'il y ait  toujours un utilisateur pour réaliser le test.

        user = new UserModel({
            name: "Gilliot",
            firstname: "Mathieu",
            mail: "jfjfjeijfiejfoijj@jfjfh.fr",
            age: 18
        })
        user.save().then(()=>{
            done();
        })
    })
    it("Recherche d'un utilisateur",(done)=>{
        UserModel.find({name:"Gilliot"}).then((users)=>{
            assert(users[0]._id.equals(user._id));             // ATTENTION Les Id définis par mongo ne sont pas juste des Id, ce sont des ObjectId. On ne peut paas juste les comparer avec "===". Soit on utilise la fonction Equals soit on stringify les deux _Id.
            done();
        })
        });

    it("Recherche du premier utilisateur",(done)=>{
        UserModel.findOne({_id : user._id}).then((userFound)=>{
            assert(userFound.name === user.name);
            done();
            console.log("    C'est bon, ça recherche!")
        })
    })

    });
