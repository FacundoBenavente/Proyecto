var logeado1 = false;
var logeado2 = false;
let logeados = [];
let logedusr = [];

function Register1(){
    if(submitBtn1.value == "Login"){
    submitBtn1.value = "Registrarse";
    registrarse1.innerHTML = "¿Ya tienes cuenta? Inicia sesion"
    userName1.hidden = false;
    txtName.type = "text";
    } else{
        submitBtn1.value = "Login";
        registrarse1.innerHTML = "¿No tienes cuenta? Registrate"
        userName1.hidden = true;
        txtName.type = "hidden";
    }
}
function Register2(){
    if(submitBtn2.value == "Login"){
    submitBtn2.value = "Registrarse";
    registrarse2.innerHTML = "¿Ya tienes cuenta? Inicia sesion"
    userName2.hidden = false;
    txtName2.type = "text";
    } else{
        submitBtn2.value = "Login";
        registrarse2.innerHTML = "¿No tienes cuenta? Registrate"
        userName2.hidden = true;
        txtName2.type = "hidden";
    }
}

function clickLogin(){


    if(submitBtn1.value == "Registrarse"){
        let email1 = txtEmail.value;
        let password1 = txtPass.value;
        let username1 = txtName.value;
        let user = {
            email: email1,
            password: password1,
            username: username1
        }
        postData("registro",{user} ,(data) => {
            
            if(!data){
                cuentaExiste()
            } else{
                Register1()
                listo.hidden = true;
            }
        })
        
    } else{

        let email1 = txtEmail.value;
        let password1 = txtPass.value;
        let user = {
            email: email1,
            password: password1
        }
        postData("login", {user}, (data) =>{
            if(data){
                logeados[0] = user.email;
                Logeado();
               }else{
                   Incorrecto()
               }
        })
       
    }
}

function clickLogin2(){
    if(submitBtn2.value == "Registrarse"){
        let email2 = txtEmail2.value;
        let password2 = txtPass2.value;
        let username2 = txtName2.value;
        let user = {
            email: email2,
            password: password2,
            username: username2
        }
        postData("registro",{user} ,(data) => {
            if(!data){
                cuentaExiste2()
            } else{
                Register2()
                listo2.hidden = true;
            }
        })
    }else{

        let email2 = txtEmail2.value;
        let password2 = txtPass2.value;
        let user = {
            email: email2,
            password: password2
        }
        postData("login", {user}, (data) =>{
            if(data){
                logeados[1] =user.email;
                Logeado2();
               }else{
                   Incorrecto2()
               }
        })
       
    } 
}
function Logeado(){
    listo.hidden = false;
     listo.innerHTML = "¡Listo!";
     submitBtn1.disabled = true;
     txtEmail.disabled = true;
     txtPass.disabled = true;
     registrarse1.hidden = true;
     txtPass.style.cursor = "not-allowed";
     txtEmail.style.cursor = "not-allowed";
     submitBtn1.style.cursor = "not-allowed";
     logeado1 = true;
     checkButtons()
}
function Incorrecto(){
    listo.hidden = false;
     listo.innerHTML = "E-mail o contraseña incorrectos";
}
function Logeado2(){
    listo2.hidden = false;
     listo2.innerHTML = "¡Listo!";
     submitBtn2.disabled = true;
     txtEmail2.disabled = true;
     txtPass2.disabled = true;
     registrarse2.hidden = true;
     txtPass2.style.cursor = "not-allowed";
     txtEmail2.style.cursor = "not-allowed";
     submitBtn2.style.cursor = "not-allowed";
     logeado2 = true;
     checkButtons();
}
function Incorrecto2(){
    listo2.hidden = false;
     listo2.innerHTML = "E-mail o contraseña incorrectos";
}
function cuentaExiste(){
    listo.hidden = false;
    listo.innerHTML = "Tu cuenta ya existe";
}
function cuentaExiste2(){
    listo2.hidden = false;
    listo2.innerHTML = "Tu cuenta ya existe";
}

function checkButtons() {
    if(logeado1 === true && logeado2 === true){
        postData("loged", logeados, (usuariosName)=>{
            logedusr[0] = usuariosName[0];
            logedusr[1] = usuariosName[1];
            localStorage.setItem("logeados", JSON.stringify(logedusr));
        })
        window.location = "Stats.html";
            }
    }