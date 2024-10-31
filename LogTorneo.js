       let logeados = [];
       let logeadosTorneo = [];
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
                            Register();
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
                            logeados[0] = user.email;
                            Logeado();
                        }else{
                            Incorrecto()
                        }
                    })
                
                }
            }
            function Logeado(){
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
                if(logeado){
                    postData("loged", logeados, (usuariosName)=>{
                        logeadosTorneo = JSON.parse(localStorage.getItem("logeadosTorneo"));
                        if(logeadosTorneo == null){
                            logeadosTorneo = [];
                            logeadosTorneo[0] = usuariosName[0];
                            localStorage.setItem("logeadosTorneo", JSON.stringify(logeadosTorneo));
                        }else{
                            let logdSave = usuariosName[0];                        

                            for(let i = 0; i < logeadosTorneo.length; i++){
                                if(logeadosTorneo[i] == logdSave){
                                    listo.hidden = false;
                                    listo.innerHTML = "Tu cuenta ya se encuentra logueada";
                                    logeado = false;
                                    return;                                    
                                }
                            }                            
                                 
                            logeadosTorneo.push(logdSave);     
                            localStorage.setItem("logeadosTorneo", JSON.stringify(logeadosTorneo));                        
                        
                        }
                        window.location = "agregarJugador.html";
                    })
                    
                      
                }
            }