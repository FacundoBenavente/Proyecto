function Register1(){
    if(title1.innerHTML == "Login"){
    submitBtn1.value = "Registrarse";
    title1.innerHTML = "Registrarse";
    }
}

function crearCuenta(){
var usuario = {
    "email": txtEmail.value,
    "password": txtPass.value
}
var jsonUser = JSON.stringify(usuario);
localStorage.setItem(txtEmail.value, jsonUser);
}
function clickLogin(){
    if(submitBtn1.value == "Registrarse"){
        crearCuenta();
    }

}