import { onEvent, sendEvent, startServer } from "soquetic";
import fs, { readFile } from "fs"
let  usuariosJson;

onEvent("registro", ()=>{crearCuenta()})
fs.readFile("./back/Usuarios.json", 'utf8', (err, jsonString) =>{
    if(err){
        console.log('Error al lleer el archivo:', err);
        return;
    }
    try{
        usuariosJson = JSON.parse(jsonString);
        console.log(usuariosJson);

    } catch(err){
        console.log("Error al parsear JSON", err);
    }
})
function crearCuenta(){
    let checkeo = usuariosJson.getItem(email);
    if(checkeo == "null"){
    var usuario = {
    "email": email,
    "password": password,
    "username": username 
}
var jsonUser = JSON.stringify(usuario);
usuariosJson.setItem(email, jsonUser);
    return true;
    } else {
        return false;
    }
}
onEvent("login", ()=>{loginCuenta()})

function loginCuenta(){
 let userLogin = usuario.getItem(email);
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