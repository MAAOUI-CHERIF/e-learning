const { interfaces } = require("mocha");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const blogCourses = require("./BlogCoursesModels").schema;
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
        required: [true, "T'es SMF?(sans mail fixe)"],
        unique:true
    },
    blogCourses: [{
        type: Schema.Types.ObjectId,
        ref: 'BlogCours'
    }],
    password: {
        type:String,
        required: true
    }

});

UserSchema.pre('save',async function (next){
    try{
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(this.password, salt)
      this.password = hash;
      next();
    }
    catch(error){
        next(error);
    }
})

UserSchema.virtual('countCourses').get(function(){
    return this.blogCourses.length;
})

UserSchema.virtual('nickname').set(function(valeur){
    this.name = valeur;
})

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;