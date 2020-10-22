const { interfaces } = require("mocha");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoursesSchema = new Schema({
    name: {
        type: String,
        required: [true, "Le cours doit être nommé mon frère"]
    },
    difficulty: {
                   type: String,
                   enum:["Facile","Moyen","Difficile"],
                   required: [true, "Dur ou pas?"]
                },
    summary: String,
    description: String,
    content: String,
    type:{
            type:String,
            enum:["Petite_enfance","Metiers_animaliers","Deco","Administration","Design","Sante"],
            required: [true, "Tu veux quelle catégorie?"]
    }
})

const CoursesModel = mongoose.model("Cours",CoursesSchema)


module.exports = CoursesModel;