import{addCourse} from './fonctions.mjs'


fetch('http://localhost:3000/courses/all')
.then(response=>{
    if(!response.ok){
        alert("Connexion à l'API impossible")
    }else{
       return response.json()
    }
}).then(data=>{
    data.forEach(element => {
     addCourse(element)
    })
})