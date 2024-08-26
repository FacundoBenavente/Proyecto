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

function crearCuenta(){
var usuario = {
    "email": txtEmail.value,
    "password": txtPass.value,
    "username": txtName.value
}
var jsonUser = JSON.stringify(usuario);
localStorage.setItem(txtEmail.value, jsonUser);
}

function loginCuenta(){
 let userLogin = localStorage.getItem(txtEmail.value);
 let obj = JSON.parse(userLogin)
 if(txtPass.value == obj.password){
     listo.hidden = false;
     listo.innerHTML = "¡Listo!";
     submitBtn1.disabled = true;
     submitBtn1.style.cursor = 
 } else{
     listo.hidden = false;
     listo.innerHTML = "E-mail o contraseña incorrectos";
 } 
}
function crearCuenta2(){
    var usuario = {
        "email": txtEmail2.value,
        "password": txtPass2.value,
        "username": txtName2.value
        }

var jsonUser = JSON.stringify(usuario);
localStorage.setItem(txtEmail2.value, jsonUser);
    }
function clickLogin(){
    if(submitBtn1.value == "Registrarse"){
        crearCuenta();
    } else{
        loginCuenta();
    }
    if(submitBtn2.value == "Registrarse"){
        crearCuenta2();
    } 

}