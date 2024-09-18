import { onEvent, sendEvent, startServer } from "soquetic";


onEvent("registro", ()=>{crearCuenta()})

function crearCuenta(){
    let checkeo = localStorage.getItem(email);
    if(checkeo == "null"){
    var usuario = {
    "email": email,
    "password": password,
    "username": username 
}
var jsonUser = JSON.stringify(usuario);
localStorage.setItem(email, jsonUser);
    return true;
    } else {
        return false;
    }
}
onEvent("login", ()=>{loginCuenta()})

function loginCuenta(){
 let userLogin = localStorage.getItem(email);
 let obj = JSON.parse(userLogin)
 if(user.password == obj.password){
    return true;
 } else{
    return false;
 } 
}
/*function crearCuenta2(){
    var usuario = {
        "email": txtEmail2.value,
        "password": txtPass2.value,
        "username": txtName2.value
        }

var jsonUser = JSON.stringify(usuario);
localStorage.setItem(txtEmail2.value, jsonUser);
    }*/

    startServer()