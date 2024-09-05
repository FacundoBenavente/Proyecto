function Register(){
    if(title.innerHTML == "Login"){
    submitBtn.value = "Registrarse";
    title.innerHTML = "Registrarse";
    registrarse.innerHTML = "¿Ya tienes cuenta? Inicia sesion"
    userName.hidden = false;
    txtName.type = "text";
    } else{
        submitBtn.value = "Login";
        title.innerHTML = "Login";
        registrarse.innerHTML = "¿No tienes cuenta? Registrate"
        userName.hidden = true;
        txtName.type = "hidden";
    }
}