

const newMailButton = document.getElementById('newMailButton');
const newPassButton = document.getElementById('newPassButton');
const deleteButton = document.getElementById('deleteAccount')
const regexMail = /^[a-zA-Z0-9._-][^<§!:/;,\|()"#`~&=+%µ*$£%>]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
const regexPass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

newMailButton.addEventListener('click',(e)=>{
    e.preventDefault();
    const form = document.forms['newMailForm'].elements;
    if(form[0].value !== '' && form[1].value !==''){
        if(form[0].value == form[1].value){
            alert('Tu veux changer de mail pour le même ? :p')
        }else if(!regexMail.test(form[1].value)){
            alert("C'est pas un mail ça mec!")
        }else{
            const newMail ={
                mail : form[0].value,
                newMail : form[1].value
            }
            
            const sessionToken = sessionStorage.getItem('token')
            fetch('http://localhost:3000/user/modif',{method:'POST',headers:{
                'Content-type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${sessionToken}`
            },body:JSON.stringify(newMail)}).then(res=>{
                if(res.status == 201){
                    alert('Le mail a bien été changé')
                }else if(res.status == 401){
                    alert('Connexion nécéssaire')
                }else if(res.status == 403){
                    alert('Hum... mail inconnu au bataillon')
                }else{
                    alert('Connexion au serveur ou à la bdd en PLS')
                }
            })
        }
    }else{
        alert("Peut-on changer ce que l'on ne connait pas ? Vous avez 4 h (sinon remplissez les deux champs)")
    }
    
})

newPassButton.addEventListener('click',(e)=>{
    e.preventDefault();
    const passForm = document.forms['newPassForm'].elements;
    if(passForm[0].value == ''){
        alert("Meeeeec j'ai besoin de ton mot de passe pour te laisser rentrer")
    }else if(passForm[1].value !== passForm[2].value){
        alert("Les deux mots de passe doivent matcher magueul")
    }else if(!regexPass.test(passForm[1].value)){
        alert("Le nouveau mot de passe doit contenir une majuscule,un chiffre et un caractère spécial")
    }else{
        const newPass = {
            password: passForm[0].value,
            newPassword : passForm[1].value
        }
        const sessionToken = sessionStorage.getItem('token')
        fetch('http://localhost:3000/user/modifPass',{method:'POST',headers:{
            'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${sessionToken}`
        },body:JSON.stringify(newPass)}).then(res=>{
            if(res.status == 201){
                alert('Le mot de passe a bien été changé')
            }else if(res.status == 401){
                alert('Connexion nécéssaire')
            }else if(res.status == 403){
                alert("Hum...C'est vraiment ton mot de passe? Ou alors t'as pas accès?")
            }else{
                alert('Connexion au serveur ou à la bdd en PLS')
            }
        })
    }
})

deleteButton.addEventListener('click',(e)=>{
    e.preventDefault()
    
    
    if(confirm("Voulez vous supprimer votre compte?")){
        const sessionToken = sessionStorage.getItem('token')
        fetch('http://localhost:3000/modif',{method:"DELETE",headers:{
            'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${sessionToken}`}}).then(res=>{
            if(res.status == 401){
                alert("Connecte toi avant de vouloir supprimer ton compte coco!")
            }else if(res.status == 500){
                alert("Connexion server/bdd en PLS")
            }else{
                alert("Utilisateur supprimé")
                sessionStorage.removeItem('token')
            }   
        })
        
    }else{
       alert("Compte non-supprimé")
    }

})