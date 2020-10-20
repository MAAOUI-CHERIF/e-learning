const mongoose = require('mongoose');
const UserModel = require('../Sources/Models/UsersModels')

 mongoose.connect('mongodb+srv://Mathieu:Su04za08ku90@e-learning.c1izm.mongodb.net/e-learning?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true })


mongoose.connection.once('open',()=>{
    console.log('Toi, tu rentres')
})
.on('error',(error)=>{
    console.log('Oups...'+error)
})










