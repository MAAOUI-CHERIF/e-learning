const { interfaces } = require("mocha");
const mongoose = require("mongoose");
const Courses = require("./CoursesModels").schema;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Meeec, t'as bien un nom, non?"]
    },
    firstname: {
        type: String,
        required: [true, "Bah alors, t'es pas baptisé?"]
    },
    mail:{
        type: String,
        match:[/^[a-zA-Z0-9._-][^<§!:/;,\|()"#`~&=+%µ*$£%>]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/,"C'est pas un mail ça man!"],
        required: [true, "T'es SMF?(sans mail fixe)"]
    },
    age:{
        type:Number,
        required: [true, "Jcomprends que ça soit taboo mais j'ai besoin de savoir ton age..."],
        default:18,
        validate:{
                    validator : (age) => age >=18,  // Pourquoi avec les accolades ça ne marche pas ?
                    message : "T'es pas majeur !"
                 }
    },
    courses : [Courses],
    blogCourses: [{
        type: Schema.Types.ObjectId,
        ref: 'BlogCours'
    }]

});

UserSchema.virtual('countCourses').get(function(){
    return this.courses.length;
})

UserSchema.virtual('nickname').set(function(valeur){
    this.name = valeur;
})

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;