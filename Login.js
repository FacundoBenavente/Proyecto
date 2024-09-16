function Register1(){
    if(title1.innerHTML == "Login"){
    submitBtn1.value = "Registrarse";
    title1.innerHTML = "Registrarse";
    registrarse1.innerHTML = "¿Ya tienes cuenta? Inicia sesion"
    userName1.hidden = false;
    txtName.type = "text";
    } else{
        submitBtn1.value = "Login";
        title1.innerHTML = "Login";
        registrarse1.innerHTML = "¿No tienes cuenta? Registrate"
        userName1.hidden = true;
        txtName.type = "hidden";
    }
}
function Register2(){
    if(title2.innerHTML == "Login"){
    submitBtn2.value = "Registrarse";
    title2.innerHTML = "Registrarse";
    registrarse2.innerHTML = "¿Ya tienes cuenta? Inicia sesion"
    userName2.hidden = false;
    txtName2.type = "text";
    } else{
        submitBtn2.value = "Login";
        title2.innerHTML = "Login";
        registrarse2.innerHTML = "¿No tienes cuenta? Registrate"
        userName2.hidden = true;
        txtName2.type = "hidden";
    }
}

function clickLogin(){
    if(submitBtn1.value == "Registrarse"){
        var email1 = txtEmail.value;
        var password1 = txtPass.value;
        var username1 = txtName.value;
        let useregister = {
            email: email1,
            password: password1,
            username: username1
        }
        let data = fetchData("registro", useregister)
        if(data === false){
            cuentaExiste()
        }
    } else{

        var email1 = txtEmail.value;
        var password1 = txtPass.value;
        let user = {
            email: email1,
            password: password1
        }
       let data = fetchData("login", user)
       if(data === true){
        Logeado()
       }else{
           Incorrecto()
       }
    }
    if(submitBtn2.value == "Registrarse"){
        var email2 = txtEmail2.value;
        var password2 = txtPass2.value;
        var username2 = txtName2.value;
    } 

}
function Logeado(){
    listo.hidden = false;
     listo.innerHTML = "¡Listo!";
     submitBtn1.disabled = true;
     txtEmail.disabled = true;
     txtPass.disabled = true;
     txtPass.style.cursor = "not-allowed";
     txtEmail.style.cursor = "not-allowed";
     submitBtn1.style.cursor = "not-allowed";
}
function Incorrecto(){
    listo.hidden = false;
     listo.innerHTML = "E-mail o contraseña incorrectos";
}
function cuentaExiste(){
    listo.hidden = false;
    listo.innerHTML = "Tu cuenta ya existe";
}