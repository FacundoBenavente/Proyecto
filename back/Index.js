import { onEvent, sendEvent, startServer } from "soquetic";
import fs from "fs"

onEvent("registro", (usuario)=>{ return crearCuenta(usuario)})

onEvent("login", (data)=>{
    const jsonData = fs.readFileSync("Usuarios.json" );        
        const jsonUsers = JSON.parse(jsonData);        
        for(let i = 0; i < jsonUsers.usuarios.length; i++){
            const usr = JSON.parse(jsonUsers.usuarios[i]);
            if (usr.email == data.user.email){
                if(usr.password == data.user.password){
                    return true;
                } else {                    
                    return false;                    
                }                
            }
        }
        return false;   
})

function crearCuenta(usuario){
   
    const jsonData = fs.readFileSync("Usuarios.json" )
    const jsonUsers = JSON.parse(jsonData);        
    const jsonUser = JSON.stringify(usuario.user);

    for(let i = 0; i < jsonUsers.usuarios.length; i++){
        const usr = JSON.parse(jsonUsers.usuarios[i]);
        if (usr.email == usuario.user.email){
            return false
        }
    }
    jsonUsers.usuarios.push(jsonUser);
    const data = JSON.stringify(jsonUsers);

    fs.writeFileSync("Usuarios.json", data);
    return true;   
}
    onEvent("loged",(logeados) =>{return buscaUsuario(logeados)})


    function buscaUsuario(logeados){
        let usuariosName = [];
        const jsonData = fs.readFileSync("Usuarios.json" )
        const jsonUsers = JSON.parse(jsonData);        

    for(let i = 0; i < jsonUsers.usuarios.length; i++){
        const usr = JSON.parse(jsonUsers.usuarios[i]);
        if (logeados[0] == usr.email){
            usuariosName[0] = usr.username;
        } else if(logeados[1] == usr.email)
        usuariosName[1] = usr.username;
    }
    return usuariosName;   
}

    startServer();