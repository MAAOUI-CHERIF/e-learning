const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

beforeEach("Drop les données  avant Test", (done)=>{      //le beforeEach est exécuté avant chaque test(avant chaque "it")

    mongoose.connection.dropDatabase().then(()=>{

        done();
    })

})

    mongoose.connect('mongodb://localhost/ecommerce_test',{ useNewUrlParser: true, useUnifiedTopology: true })

    mongoose.connection.once('open',()=>{
        console.log("La connexion est établie")
    })
    .on('error',(error)=>{
        console.log("Et bah non", error)
    })