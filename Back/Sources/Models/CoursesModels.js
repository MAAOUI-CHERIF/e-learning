const { interfaces } = require("mocha");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoursesSchema = new Schema({
    name: String,
    difficulty: {
                   type: String,
                   enum:["Facile","Moyen","Difficile"]
                },
    description: String,
})

const CoursesModel = mongoose.model("Cours",CoursesSchema)


module.exports = CoursesModel;