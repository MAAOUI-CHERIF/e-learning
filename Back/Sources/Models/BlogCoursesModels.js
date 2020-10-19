const { interfaces } = require("mocha");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogCoursesSchema = new Schema({
    name: String,
    summary: String,
    comments:[{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]

})

const BlogCoursesModel = mongoose.model("BlogCours",BlogCoursesSchema)


module.exports = BlogCoursesModel;