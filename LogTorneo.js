          let logeado = false;
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
            function clickLogin(){

                if(submitBtn.value == "Registrarse"){
                    let email = userEmail.value;
                    let password = Contraseña.value;
                    let username = txtName.value;
                    let user = {
                        email: email,
                        password: password,
                        username: username
                    }

                    postData("registro",{user} ,(data) => {
                        
                        if(!data){
                            cuentaExiste()
                        } else{
                            listo.hidden = true;
                        }
                    })
                    
                } else{
                    let email = userEmail.value;
                    let password = Contraseña.value;
                    let user = {
                        email: email,
                        password: password
                    }
                    postData("login", {user}, (data) =>{
                        if(data){
                            Logeado();
                        }else{
                            Incorrecto()
                        }
                    })
                
                }
            }
            function Logeado(){
                listo.hidden = false;
                listo.innerHTML = "¡Listo!";
                submitBtn.disabled = true;
                userEmail.disabled = true;
                Contraseña.disabled = true;
                registrarse.hidden = true;
                Contraseña.style.cursor = "not-allowed";
                userEmail.style.cursor = "not-allowed";
                submitBtn.style.cursor = "not-allowed";
                logeado = true;
                checkButtons()
            }
            function Incorrecto(){
                listo.hidden = false;
                listo.innerHTML = "E-mail o contraseña incorrectos";
            }
            function cuentaExiste(){
                listo.hidden = false;
                listo.innerHTML = "Tu cuenta ya existe";
            }
            function checkButtons() {
                if(logeado === true ){
                    window.location = "agregarJugador.html";
                        }
                }