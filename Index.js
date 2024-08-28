
function crearCuenta(){
    let checkeo = localStorage.getItem(txtEmail.value);
    if(checkeo == "null"){
    var usuario = {
    "email": txtEmail.value,
    "password": txtPass.value,
    "username": txtName.value
}
var jsonUser = JSON.stringify(usuario);
localStorage.setItem(txtEmail.value, jsonUser);
    } else {
        cuentaExiste()
    }
}

function loginCuenta(){
 let userLogin = localStorage.getItem(txtEmail.value);
 let obj = JSON.parse(userLogin)
 if(txtPass.value == obj.password){
    Logeado();
 } else{
    Incorrecto();
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