const assert = require("assert");
const UserModel = require("../Sources/Models/UsersModels");


describe("Test de modification d'utilisateur", () => {
    let user;
    let newFirstName = "Lily";
    beforeEach((done) => {                           //On créé un utilisateur avant chaque test de ce describe car le test de connexions les supprime avant chaque test. On s'assure ainsi qu'il y ait  toujours un utilisateur pour réaliser le test.

        user = new UserModel({
            name: "Gilliot",
            firstname: "Mathieu",
            mail: "jfjfjeijfiejfoijj@jfjfh.fr",
            age: 18
        })
        user.save().then(() => {
            done();
        })
    })

    function assertFirstName(promise, done) {
        promise.then(() => {
            UserModel.find({}).then((users) => {
                assert(users[0].firstname === newFirstName);
                done();
            })
        })
    }


    it("Modification d'un utilisateur par son instance", (done) => {
        user.set('firstname', newFirstName)
        assertFirstName(user.save(), done);
    })

    it("Modification d'un utilisateur par son modèle", (done) => {
        assertFirstName(UserModel.updateMany({ firstname: 'Mathieu' }, { firstname: newFirstName }), done)

    })

    it("Recherche d'un utilisateur et modification", (done) => {
        assertFirstName(UserModel.findOneAndUpdate({ name: "Gilliot" }, { firstname: newFirstName }), done)
    })

    it("Recherche d'un utilisateur par ID et modification", (done) => {
        assertFirstName(UserModel.findByIdAndUpdate(user._id, { firstname: newFirstName }), done)
    })

    it("Joyeux anniversaire, incrémentation de l'âge de l'utilisateur", (done) => {
        UserModel.updateOne({ name: "Gilliot"}, { $inc:{age: 1}}).then(() => {
            UserModel.findOne({ name: "Gilliot"}).then((userFound) => {
                assert(userFound.age === 19);
                done();
                console.log("    C'est bon, ça modifie!")
            })
        })

    })
});
