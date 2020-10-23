const assert = require("assert");
const UserModel = require("../Sources/Models/UsersModels");


describe("Test de validation d'utilisateur",()=>{

    it("Validation d'un utilisateur",(done)=>{
        const anonymousUser = new UserModel({ name:undefined, firstname: "Pony",mail:"ofoijojio",age:18 })
        anonymousUser.validate((validateInfo)=>{
            assert(validateInfo.errors.name.message === "Meeec, t'as bien un nom, non?")
            done();
        })
    })

    it("Validation d'un email utilisateur",(done)=>{
        const anonymousUser = new UserModel({ name:"Run run", firstname: "OhPony",mail:"ofoijojiojfh.fr",age:18 })
        anonymousUser.validate((validateInfo)=>{
            assert(validateInfo.errors.mail.message === "C'est pas un mail ça man!")
            done();
        })
    })

    it("Validation de l'age minimum d'un utilisateur",(done)=>{
        const anonymousUser = new UserModel({ name:"Run run", firstname: "OhPony",mail:"ofoijo@jiojfh.fr",age:17 })
        anonymousUser.validate((validateInfo)=>{
            assert(validateInfo.errors.age.message === "T'es pas majeur !")
            done();
        })
    })
})