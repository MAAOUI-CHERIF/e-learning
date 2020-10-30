const mongoose = require('mongoose');
const UserModel = require('../Sources/Models/UsersModels');
const CoursesModel = require('../Sources/Models/BlogCoursesModels');
const CommentModel = require('../Sources/Models/CommentModels');
const bcrypt = require('bcrypt');
const env = require('dotenv')
const expand = require('dotenv-expand')
let myEnv = env.config()
expand(myEnv)
mongoose.Promise = global.Promise;



mongoose.connect(`mongodb+srv://Mathieu:Su04za08ku90@e-learning.c1izm.mongodb.net/e-learning?retryWrites=true&w=majority`,{useNewUrlParser: true,useUnifiedTopology: true })


mongoose.connection.once('open',()=>{
    console.log('Toi, tu rentres')

})
.on('error',(error)=>{
    console.log('Oups...'+error)
})










