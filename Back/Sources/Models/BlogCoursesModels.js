const { interfaces } = require("mocha");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogCoursesSchema = new Schema({
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
            enum:["Petite enfance","Metiers animaliers","Deco","Administration","Design","Sante"],
            required: [true, "Tu veux quelle catégorie?"]
    },
    comments:[{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]

})

const BlogCoursesModel = mongoose.model("BlogCours",BlogCoursesSchema)


module.exports = BlogCoursesModel;