import{addCourse} from './fonctions.mjs'
const sessionToken = sessionStorage.getItem('token')


function fetchType(type){
    fetch(`http://localhost:3000/courses/all/${type}`,{headers:{ 'Authorization':`Bearer ${sessionToken}`
    
}}).then(response=>{
    if(!response.ok){
        alert("Connexion à l'API impossible")
    }else{
        return response.json()
    }
}).then(data=>{
   if(data.length ==0){
       alert("Il n'y a pas de cours dans cette section pour le moment, visite les autres !")
   }else{
    data.forEach(element => {
        addCourse(element)
    });
   }
    
})
}


const courseType = window.location.hash.split("#")[1];

fetchType(courseType);


