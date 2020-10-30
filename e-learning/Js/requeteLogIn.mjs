
const loginButton = document.getElementById("login");
const loginForm = document.forms["login-form"].elements;
const back = document.getElementById('back');


loginButton.addEventListener('click',async(e)=>{
    e.preventDefault();
    const logIn={
        mail:loginForm[0].value,
        password:loginForm[1].value
    }
   const logInJson = JSON.stringify(logIn);

   let option = {
    method:'POST',
    headers: {
    'Content-type': 'application/json; charset=UTF-8'
    },
    body:logInJson}

    const res =await fetch('http://localhost:3000/user/login',option)
    if(res.status == 400){
        alert("Utilisateur non trouvé")
    }else{
        const data = await res.json() //accessToken
        const token = data.accessToken;
        sessionStorage.setItem('token',token)
        window.location.href = './index.html'
        alert("Bienvenue !")
    }
    // à revoir, gérer les autres erreurs

})

