
export{addCourse}



function addCourse(element){
    const mainSection= document.getElementById('main-section')
    const container = document.createElement('div');
    container.classList.add('containerPerso');
    container.innerHTML=
    `<h1>${element.name}</h1>
     <h3>Difficulté:${element.difficulty}</h3>
     <h2>Description: ${element.description}</h2>
     <p>${element.summary}</p>
     <button class="btn btn-info ajout">Ajouter ce cours</button>
     <button class="btn btn-primary seeCourse">Voir le contenu</button> 
     <div class="courseContent">${element.content}<div>
    `
    mainSection.appendChild(container)

    const buttons = container.querySelector('.ajout')
    buttons.addEventListener('click',(e)=>{
        const  sessionToken = sessionStorage.getItem('token')
        fetch(`http://localhost:3000/courses/UserCourses/${element._id}`, {method:'POST',headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${sessionToken}`
            }}).then(res=>{
                
                if(res.status == 406){
                    alert("Wesh, je sais que c'est dl'a bonne frère mais t'en as déjà eu")
                }else if(res.status == 201){
                    alert("Cours ajouté")
                }else{
                    alert("Oups...")
                }
            })
    })
    const buttonsSee = container.querySelector('.seeCourse')
    buttonsSee.addEventListener('click',(e)=>{
        buttonsSee.classList.toggle("active");
            var panel = buttonsSee.nextElementSibling;
            if (panel.style.maxHeight) {
              panel.style.maxHeight = null;
            }
            else {
              panel.style.maxHeight = panel.scrollHeight + "px";
            }
    })
}