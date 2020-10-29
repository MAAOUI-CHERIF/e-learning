// Requêtes fetch


const submit = document.getElementById('submitSignIn')
const signInForm = document.getElementById('signInForm')
const form = document.forms['signInForm'].elements
const regexMail = /^[a-zA-Z0-9._-][^<§!:/;,\|()"#`~&=+%µ*$£%>]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
const regexPass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

submit.addEventListener('click',async(e)=>{
    e.preventDefault();

    if(!regexMail.test(form[3].value)){
        alert("Format d'adresse mail incorrect")
    }else if(!regexPass.test(form[4].value)){
        alert("Le mot de passe doit comporter au moins un majuscule, un chiffre et un caractère spécial")
    }else{
        const monUser = {
            name:form[1].value,
            firstname:form[2].value,
            mail:form[3].value,
            password:form[4].value
        }
     let userJson = JSON.stringify(monUser)

     let option = {
         method:'POST',
         headers: {
         'Content-type': 'application/json; charset=UTF-8'
         },
         body:userJson}

     fetch('http://localhost:3000/user/all',option).then(res=>{
         if(res.status !== 201){
             alert("Veuillez remplir tous les champs et vérifier que l'adresse mail n'est pas déjà utilisée")
         }else{
             window.location.href = './index.html'
         }
     })
    }
})





