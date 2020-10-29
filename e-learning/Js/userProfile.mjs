const token = sessionStorage.getItem('token');
const logedIn= document.getElementById('userProfile')

if(token == null){
    logedIn.setAttribute('href',"./connexion.html")
}else{
    logedIn.setAttribute('href',"./profil.html")
}

